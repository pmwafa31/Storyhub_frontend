import React, { useState, useEffect, useRef  } from 'react'
import './MyStory.css'
import { useNavigate } from 'react-router-dom';
import Header from '../subComponents/headerComponents/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {  useSelector } from 'react-redux';
import * as PostApi from '../../api/PostRequests'
import { Link } from 'react-router-dom'


function Mystory() {

  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const user = useSelector(state => state.authReducer.userData)
  const getMyPosts = async ()=>{
    try{
      const result = await PostApi.getAllPosts();
      setPosts(result.data.posts.filter(item => item.userId == user.id))
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getMyPosts()
  },[])
 
  const deleteMyPost = async (postId) =>{
   try {
    const response = await PostApi.deletePost(postId)
    alert(response.data.message)
    getMyPosts()
  } catch (error) {
    alert("Something went wrong. Try again")
   }
  }

  return (
    <div>
        <Header/>
        <div style={{marginTop:'60px'}}>
          {posts.length!=0?
          (
            <Container>
            <Row sm={1} md={2} lg={3}>
              {posts.map(item=>(
                <Col className='mt-5 d-flex justify-content-center'>
                  <Card className='mypost_card' style={{ width: '20rem', height:'24rem'}}>
                  <Link to={'/view_details/'+item._id} >
                    <Card.Img variant="top" src={item.photo} alt='no image' style={{height:'150px', borderRadius:'10px', padding:'8px'}}/>
                    </Link>
                    <Card.Body>
                    <span className='text-danger' style={{fontSize:'14px'}}><i>{item.createdOn}</i></span>
                    <Card.Title style={{fontWeight:'bold'}}>{item.title.slice(0,25)}</Card.Title>                  
                      <Card.Text >
                      <p style={{fontSize:'15px'}}><i>{item.description.slice(0,70)}...</i></p>
                      </Card.Text>
                    </Card.Body>        
                    <Card.Footer>
                    <div className='link_div'>
                      <button className='post_btn' onClick={()=>navigate('/update_post/'+item._id)}><i class="fa-solid fa-pen"></i></button>         
                      <button className='post_btn' style={{float:'right'}} onClick={()=>deleteMyPost(item._id)}><i class="fa-solid fa-trash"></i></button>         
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}    
            </Row>
          </Container>
          ): (
            <div className='mt-5 text-center p-5'>
              <h5 style={{color:'brown'}}>No posts to display</h5>
              <button className='post_btn' onClick={()=>navigate('/add_story')} >Create Post</button>
            </div>         
  
          )}
        </div>
    </div>
  )
}

export default Mystory