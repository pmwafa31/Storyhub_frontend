import React, {useEffect} from 'react'
import Header from '../subComponents/headerComponents/Header';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Comments from './Comments';
import { getPost } from '../../actions/PostAction';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import * as ChatApi from '../../api/ChatRequests';

function ViewPostDetail() {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add Friend
    </Tooltip>
  );
  const params = useParams()

  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getPost(params.id))
  },[])

  const user = useSelector(state => state.authReducer.userData)

  const result = useSelector(state => state.postReducer.postData)
  const post = result? result.post : ''

  const isfriend = user.friends.some(item=>item.id == post.userId)
  const isrequest = user.requests.some(item=>item.id == post.userId)
  console.log(isfriend,isrequest);

  const sendRequest = async ()=>{
    try{
      const data = {
        fromId:user.id,
        toId:post.userId,
        fromName: user.name,
        fromPhoto: user.photo
      }
      const result = await ChatApi.addFriend(data)
      alert(result.data.message)
    }
    catch(error){
      alert(error.response.data.message)
    }
  }

  return (
    <div>
      <Header/>
      <div style={{marginTop:'60px'}}>
        {post?
        (
          <Container>
          <Row>
              <Col className='mt-5 text-center'>
              <Card>
                <Card.Header>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div>
                      <img src={post.userphoto} style={{ width: '40px', height: '40px', borderRadius:'50%' }} />&nbsp;&nbsp;
                      <span>{post.username}</span>&nbsp;
                      {user.id !== post.userId && isfriend==false && isrequest==false && 
                          <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}>
                        <button onClick={()=>sendRequest()} style={{border:'none'}}><i class="fa-solid fa-user-plus"></i></button>
                        </OverlayTrigger>
                      }
                      
                    </div>
                    <span>Posted On {post.createdOn}</span>
                  </div>                 
                  </Card.Header>
                <Card.Img variant="top" src={post.photo} alt='no image' style={{width:'100%', height:'350px', padding:'8px', borderRadius:'20px'}}/>
                <Card.Body>
                  <Card.Title className='text-center' style={{fontSize:'20px'}}>{post.title}</Card.Title>
                  <Card.Text >
                    <p style={{fontSize:'18px', marginTop:'20px', textAlign:'justify'}}><i>{post.description}</i></p>
                  </Card.Text>
                </Card.Body>
              </Card>
              <div className='mt-3'>
              <Comments postId={params.id}/>
              </div>
              </Col>
          </Row>
        </Container>
        ):
        (
          <h4 className='mt-5 text-center'>No data available</h4>
        )}
      </div >
     
    </div>
  )
}

export default ViewPostDetail