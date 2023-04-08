import React, {useState, useEffect, useRef} from 'react'
import './Chat.css'
import Header from '../subComponents/headerComponents/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FriendList from './FriendList';
import Messagebox from './Messagebox';
import { useSelector } from 'react-redux'
import * as ChatApi from '../../api/ChatRequests'
import ChatList from './ChatList';
import Form from 'react-bootstrap/Form';
import { io } from "socket.io-client";


function Chat() {

  const user = useSelector(state => state.authReducer.userData)


  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")
  const socket = useRef()
  const scrollRef = useRef()
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(()=>{
    const getChats = async ()=>{
      try{
        const result = await ChatApi.getAllChats(user.id);
        setChats(result.data.chats)
      }
      catch(error){
        console.log(error);
      }
    }
    getChats()
  },[user.id])

  useEffect(() => {
    const getMessage = async () => {
      try {
        const result = await ChatApi.getMessages(currentChat?._id)
        setMessages(result.data.messages);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  useEffect(() => {
    socket.current = io("ws://localhost:8005");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
 
  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.friends.filter((item) => users.find((people) => people.userId === item.id))
      )
    })
  }, [user])


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const message ={
      chatId :currentChat._id,
      senderId: user.id,
      text: newMessage
    }

    const receiverId = currentChat.members.find((member) => member !== user.id)

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    })

    try{
      const result = await ChatApi.addMessage(message);
      setMessages([...messages, result.data.data])
      setNewMessage("")
    }
    catch(error){
      console.log(error);
    }
   
  }


  return (
    <div>
       <Header/>
       <div style={{marginTop:'100px'}}>
       <Container>
      <Row>
        <Col xs={3} sm={4} >
        <Card style={{height:'490px', border:'none', backgroundColor:'rgb(233, 187, 101)'}}>
          <Card.Body>
            <Card.Title>Chat List</Card.Title>
            <Card.Text>
              {chats.length !== 0 ? chats.map(item =>(
              <div onClick={() => setCurrentChat(item)}>
              <ChatList chat={item} currentUser={user}/>
              </div>              ))
              :(<span style={{fontSize:'18px'}}>No chats to display</span>)}             
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>

        <Col xs={9} sm={8}  className='p-0'>
        <Card style={{height:'490px'}}>
          <Card.Body style={{height:'100%'}}>
          {currentChat ? (
                <div>
                  {/* <Card.Title>    
                  <div className='chat_user'>
                  <img className='user_img'  src='{item.userphoto}' />&nbsp;&nbsp;
                  <span className='user_name' >Wafa p m</span>&nbsp;&nbsp;
                  </div>
                  </Card.Title> */}
    
                    <Card.Text className='message_cardbody' >
                    <div className="chatBoxTop">
                      {messages.map(item=>(
                        <div ref={scrollRef}>
                          <Messagebox message={item} own={item.senderId == user.id}/>
                        </div>
                      ))}
                      
                      </div>
      
                      <div className="chatBoxBottom">
                      <Form onSubmit={handleSubmit} className='d-flex'>
                          <textarea
                            className="chatMessageInput"
                            placeholder="write something..."
                            onChange = {(e) => setNewMessage(e.target.value)}
                            value = {newMessage}
                            required
                          ></textarea>
                          <button type='submit' className="chatSubmitButton">
                            Send
                          </button>
                        </Form>
                      </div>
                    </Card.Text> 
                </div>
                ):(
                  <span style={{fontSize:'30px', color:'rgb(185, 172, 172)'}}><i>Tap a friend from chat list to start a chat</i> </span>
                )}
            
          </Card.Body>
        </Card>
        </Col>

        {/* <Col md={3}>
        <Card style={{}}>
          <Card.Body>
            <Card.Title>Friends</Card.Title>
            <Card.Text>
              {user.friends.map(item=>(
                <FriendList friend = {item}/>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col> */}
      </Row>
    </Container>
       </div>
        
    </div>
  )
}

export default Chat