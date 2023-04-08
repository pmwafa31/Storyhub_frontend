import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './MainNavbar.css'
function MainNavbar() {

  const navigate = useNavigate()

  const logOut =(e)=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <>
    <Navbar expand="lg" className='navbar'>
      <Container fluid>
        <Navbar.Brand href="#" style={{fontSize:'22px', fontFamily:'Inter', fontWeight:'bold', color:'white'}}>petals<span className='title'>Hub</span></Navbar.Brand>          
          <div className="me-auto">
            <input type="search" placeholder="Search Posts.." className="" />
            <div>
            <Link>hlooooo</Link>
            <Link>hlooooo</Link>
            </div>
          </div>  
          <Navbar.Toggle style={{ backgroundColor:'white'}} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ms-auto'>
            <Nav.Link className='navlink' href="/home">Home</Nav.Link>
            <Nav.Link className='navlink' href="/view_my_stories">My Stories</Nav.Link>
            <Nav.Link className='navlink' href="/add_story">Add Story</Nav.Link>
          </Nav>
        </Navbar.Collapse> 
        <button className='navlink' onClick={()=>logOut()}>Logout</button>   
      </Container>
    </Navbar>
    </>
  )
}

export default MainNavbar