import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Contact() {
  return (
    <div style={{backgroundColor:'rgb(241, 190, 94)'}} >
        <h4 className='text-center' style={{color:'white', marginBottom:'30px', paddingTop:'50px'}}>CONTACT ME</h4>

       <div style={{display:'flex', justifyContent:'center', marginBottom:'50px'}}>
            <Form style={{width:'450px'}}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Control type="text" placeholder="Your Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Control type="email" placeholder="Your Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="message">
            <Form.Control as="textarea" rows={3} placeholder="Write your Message" />
            </Form.Group>
            <Button variant="light" type="submit" style={{float:'right', color:'rgb(241, 190, 94)', marginBottom:'10px'}}>
                Send
            </Button>
            </Form>
       </div>
    </div>
  )
}

export default Contact