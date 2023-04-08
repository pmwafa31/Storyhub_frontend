import React, {useState, useEffect} from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { Link, useNavigate } from 'react-router-dom';
import * as PostApi from '../../../api/PostRequests'
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { requestAccept } from '../../../actions/AuthActions';
import * as ChatApi from '../../../api/ChatRequests'



function Header() {

  const navigate = useNavigate()

  //request modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //friends modal
  const [showModal, setShowmodal] = useState(false);

  const handleCloseModal = () => setShowmodal(false);
  const handleShowModal = () => setShowmodal(true);

  const user = useSelector(state => state.authReducer.userData)
 
  const [posts, setPosts] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const getPosts = async ()=>{
    try{
      const result = await PostApi.getAllPosts();
      setPosts(result.data.posts)
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getPosts()
  },[])

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = posts.filter((item) => {
      return item.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }


  const logOut =()=>{
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    localStorage.removeItem("store")
    setTimeout(()=>{
      navigate('/')
    },2000)
  }
  const dispatch = useDispatch()

  const acceptRequest =(id)=>{
    const data ={
      fromId:id,
      toId: user.id,
      toName: user.name,
      toPhoto: user.photo
    }
    dispatch(requestAccept(data))
  }

  const chat = async (id)=>{
    const data ={
      senderId: user.id,
      receiverId: id
    }
    try{
      const result = await ChatApi.createChat(data)
      navigate('/chat')
      window.location.reload(false)
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div>
        <div >
        <Navbar expand="lg" className='fixed-top navbar'>
          <Container fluid>
            <Navbar.Brand href="/home" className='title' >storyHub</Navbar.Brand>          
            <div className="me-auto search">
            <Form.Control type="search" placeholder="Search Posts.." className="search_input" value={wordEntered} onChange={handleFilter}/>
            {filteredData.length !=0 &&
            (
              <div className='search_list'>
                {filteredData.map(item=>(
                  <><Link className='links' to={'/view_details/'+item._id}>{item.title.slice(0,40)}</Link><br/></>
                ))}
              </div>
            )
            }
          </div>   
              <Navbar.Toggle style={{ backgroundColor:'white'}} aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='ms-auto me-4'>
                <Dropdown as={NavItem} >
                  <Dropdown.Toggle as={NavLink} style={{color:'white'}}>
                  <img src={user.photo} className='image' style={{width:'50px', height:'50px', borderRadius:'50%'}}/>&nbsp;&nbsp;
                    <span className='name' >{user.name}</span>
                    </Dropdown.Toggle>
                  <Dropdown.Menu className='drop'>
                    <Dropdown.Item><Link className='drop_link' to="/home">Home</Link></Dropdown.Item>
                    <Dropdown.Item><Link className='drop_link' to="/view_my_stories">My Stories</Link></Dropdown.Item>
                    <Dropdown.Item><Link className='drop_link' to="/add_story">Create Story</Link></Dropdown.Item>
                    <Dropdown.Item><Link className='drop_link' onClick={handleShow}>Friend requests</Link>&nbsp;
                    {user.requests.length!=0 && <Badge pill bg="secondary">{user.requests.length}</Badge>}
                    </Dropdown.Item>
                    <Dropdown.Item><Link className='drop_link' to="/chat" onClick={handleShowModal} >Friends</Link>&nbsp;
                    {user.friends.length!=0 && <Badge pill bg="secondary">{user.friends.length}</Badge>}
                    </Dropdown.Item>
                    {/* <Dropdown.Item><Link className='drop_link' to="/chat">Chat</Link></Dropdown.Item> */}
                    <Dropdown.Divider/>
                    <Dropdown.Item><button onClick={()=>{logOut()}} className='drop_btn'><i class="fa-solid fa-power-off"></i>&nbsp;Logout</button></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>    
          </Container>
        </Navbar>
        </div>  

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Friend Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {user.requests.length!=0? user.requests.map(item=>(
            <div className='m-2'>
            <img src={item.userphoto} style={{ width: '50px', height: '50px', borderRadius:'50%' }} />&nbsp;&nbsp;
            <span>{item.username}</span>&nbsp;&nbsp;
            <button onClick={()=>acceptRequest(item.id)} style={{border:'none', backgroundColor:'blue', borderRadius:'10px', padding:'3px', color:'white'}}>Accept</button>
          </div>
          ))
         :("No friend requests")}
        </Modal.Body>
      </Modal>

      //modal for friends
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
      <Modal.Header closeButton>
          <Modal.Title>Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {user.friends.length!=0? user.friends.map(item=>(
            <div className='m-2 p-2 frd_modal' onClick={()=>chat(item.id)} >
            <img src={item.userphoto} style={{ width: '50px', height: '50px', borderRadius:'50%' }} />&nbsp;&nbsp;
            <span>{item.username}</span>&nbsp;&nbsp;
            {/* <button  style={{border:'none', backgroundColor:'blue', borderRadius:'10px', padding:'3px', color:'white'}}>Chat</button> */}
          </div>
          ))
         :("No friend")}
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default Header