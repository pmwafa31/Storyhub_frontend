import React, { useState, useEffect } from 'react'
import Topbar from './Topbar'
import './Homepage.css'
import Footer from '../subComponents/Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import * as PostApi from '../../api/PostRequests'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Contact from './Contact';

function Homepage() {
  const [posts, setPosts] = useState([])
  
  const getPosts = async ()=>{
    try{
      const result = await PostApi.getAllPosts();
      setPosts(result.data.posts.slice(0,6))
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
       <section id='home'>
         <div className='header_main'>
         <div className='topbar'>
         <Navbar className='top_nav' expand="lg">
          <Container>
            <Navbar.Brand href="/" style={{color:'white', fontSize:'25px', fontFamily:'cursive'}}>ladiesHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className='head_link' href="#home"> HOME</Nav.Link>
                <Nav.Link className='head_link' href="#posts"> POSTS</Nav.Link>
                <Nav.Link className='head_link' href="#contact"> CONTACT</Nav.Link>
                <Nav.Link className='head_link' href="/login"> SIGN IN </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
              {/* <Topbar/> */}
          </div>
          <img src='https://eatdrinkandwritecopy.com/wp-content/uploads/2022/02/SSS-Good-As-Gold-12.png'/>
          <div className='head_title'>"You are more powerful than you know;<br/> you are beautiful just as you are"</div>
         </div>

       </section>
       
       
       <section id='posts' className='mt-5'>
        <h4 className='text-center' style={{color:'rgb(241, 190, 94)'}}>RECENT POSTS</h4>
       {posts.length!=0 ? 
        (
          <Container>
          <Row sm={1} md={2} lg={3}>
            {posts.map(item=>(
              <Col className='mt-5 d-flex justify-content-center'>
              <Card className='main_card' style={{width:'18rem', height:'12rem', borderRadius:'10px'}}>
                <Card.Img  src={item.photo} alt='no image' className='post_image' style={{height:'100%', width:'100%', borderRadius:'10px'}}/>
                <Card.ImgOverlay>
                  <div className='image_overlay' style={{fontSize:'18px', fontWeight:'bold', color:'rgb(247, 85, 21)'}}>
                    <Card.Title >{item.title}</Card.Title>
                    <div className='text-center'>
                      <span>By</span><br/>
                      <img src={item.userphoto} style={{width:'40px', height:'40px', borderRadius:'50%'}}/><br/>
                      <span>{item.username}</span>
                    </div>
                    </div>
                  </Card.ImgOverlay>
              </Card>       
              </Col>
            ))}    
          </Row>
          <div className='text-center'>
            <button onClick={()=>alert("Please login!!!")} className='mt-5' style={{border:'none', backgroundColor:'rgb(241, 190, 94)', padding:'10px', borderRadius:'10px', color:'white' }}>See More</button>
          </div>          
          </Container>
        ) : ""
        }

       </section>

       <section id='contact' className='mt-5'>
        <div>
          <Contact/>
        </div>

       </section>

       <section>
        <Footer/>
       </section>
    </div>
  )
}

export default Homepage