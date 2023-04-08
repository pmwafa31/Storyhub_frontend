import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/AuthActions'

function Loginform() {
  const [formData, setFormdata] = useState({phone:"", pwd:""})

  const dispatch = useDispatch()
  const location = useNavigate()

  const handleChange = (e)=>{
    setFormdata({...formData,[e.target.name]:e.target.value})  
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(login(formData, location))
    setFormdata({phone:"", pwd:""})
  }
 
  return (
    <div>  
    <Form className='p-3' onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formEmail">
      <Form.Control style={{background:'transparent', borderColor:'#cf6b3d', borderWidth:'2px'}} name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formPwd">
      <Form.Control style={{background:'transparent', borderColor:'#cf6b3d', borderWidth:'2px'}} name="pwd" type="password" placeholder="Password" value={formData.pwd} onChange={handleChange} required/>
    </Form.Group>
    <Button variant='light' style={{backgroundColor:'#cf6b3d', width:'100px', color:'white'}} type="submit">
      Login
    </Button>
  </Form>
  </div>
  )
}

export default Loginform