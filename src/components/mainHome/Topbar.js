import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Topbar.css'

function Topbar() {
  return (
    <div>
    <Navbar className='top_nav' expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{color:'white', fontSize:'25px', fontFamily:'cursive'}}>ladiesHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className='head_link' href="/"> HOME</Nav.Link>
            <Nav.Link className='head_link' href="#contact"> CONTACT</Nav.Link>
            <Nav.Link className='head_link' href="/login"> SIGN IN / SIGN UP</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Topbar