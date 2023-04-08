import React, { useState } from 'react'
import './Login.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Card from 'react-bootstrap/Card';
import Loginform from './Loginform';
import Registerform from './Registerform';
import Modal from 'react-bootstrap/Modal';
import Topbar from '../mainHome/Topbar';
import Footer from '../subComponents/Footer';

function Login() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Topbar/>
      <Container>
        <Row>
          <Col md={6}>
              <div  className='headCol'>
                  <h3>ladiesHub</h3>
                  <p>Helps you post your stories and connect with the people in your life.</p>
              </div >
          </Col>
          <Col md={6}>
              <div  className='loginCol'>
              <Card  className='text-center loginCard'>
              <Card.Img src="https://media.istockphoto.com/id/932616432/photo/social-media-marketing-concept.jpg?s=612x612&w=0&k=20&c=9CR7t0iKzPnNzB6g4NlC6UCvl5MjlRcLX4swm0HTqGs=" alt="Card image" className='img' />
              <Card.ImgOverlay>
                <Card.Body>
                    <Card.Title className='mt-3 mb-3' style={{color: '#9e502c', fontSize:'25px'}}>LOGIN</Card.Title>
                    < Loginform/>
                    <div className=''>
                      <p style={{fontSize:'16px'}}>Not a User? <a style={{color:'#752c0a'}} href="#!" onClick={handleShow}>Create an account</a></p>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title style={{color: '#cf6b3d'}}>SIGN UP</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                         <Registerform/>
                        </Modal.Body>
                        {/* <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary">Understood</Button>
                        </Modal.Footer> */}
                      </Modal>
                    </div>
                </Card.Body>
              </Card.ImgOverlay>
              </Card>
              </div >
          </Col>
        </Row>
       
      </Container>

      {/* <Footer/> */}
    </div>
  )
}

export default Login