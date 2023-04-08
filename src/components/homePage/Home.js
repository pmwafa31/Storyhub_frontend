import React, { useState, useEffect } from 'react'
import Header from '../subComponents/headerComponents/Header'
import './Home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import * as PostApi from '../../api/PostRequests'
import { Link } from 'react-router-dom'


function Home() {
  const [posts, setPosts] = useState([])
  
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

  return (
   <div>
      <Header/>
      <div style={{marginTop:'60px'}}>
        {/* <div>
          <img src='https://img.freepik.com/premium-photo/online-shopping-concept_315337-3942.jpg' style={{width:'100%', height:'250px'}}/>
        </div> */}
        {posts.length!=0 ? 
        (
          <Container>
          <Row sm={1} md={2} lg={3}>
            {posts.map(item=>(
              <Col className='mt-5 d-flex justify-content-center'>
              <Card className='post_card' style={{ width: '20rem', height:'22rem'}}>
                <Card.Img variant="top" src={item.photo} alt='no image' style={{height:'150px', borderRadius:'10px', padding:'8px'}}/>
                <Card.Body>
                  <div style={{height:'80px'}}>
                    <span className='text-danger' style={{fontSize:'14px'}}><i>{item.createdOn}</i></span>
                    <Card.Title  style={{fontSize:'18px', fontWeight:'bold'}}>{item.title}</Card.Title>
                  </div>
                  <Card.Text >
                    <p style={{fontSize:'15px', color:'black'}}><i>{item.description.slice(0,67)}...</i></p>
                  </Card.Text>
                  <Link className='link' to={'/view_details/'+item._id}>Read More</Link>
                </Card.Body>
              </Card>       
              </Col>
            ))}    
          </Row>
        </Container>
        ) : 
        (
          <h5 style={{textAlign:'center', color:'brown', padding:'50px'}}>No posts to display</h5>
        )}
      </div >
      
   </div>
  )
}

export default Home