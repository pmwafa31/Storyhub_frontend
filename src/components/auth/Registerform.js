import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registerform() {
    const initialValues = {
        fname: "",
        lname: "",
        email:"",
        phone: "",
        dob: "",
        pwd: "",
        confirmpwd: "",
        photo: ""  
    }
    const [formData, setFormdata] = useState(initialValues)
    const [formErrors, setFormerrors] = useState({})
    const [isValid, setIsvalid] = useState(true)
    const [errMsg, setErrmsg] = useState(false)
    const [apiMsg, setApimsg] = useState("")
    const [image, setImage] = useState('https://img.freepik.com/free-icon/user_318-563642.jpg')
    const [file, setFile] = useState('')
    const current = new Date().toISOString().split("T")[0]

    let location = useNavigate()

    const register = async()=>{
      try{
        file?formData.photo = file: formData.photo =image
        const result = await axios.post('http://localhost:8000/register', formData)     
        alert(result.data.message)
        window.location.reload(false)
      }
     catch(error){
            setApimsg(error.response.data.message)
            setFormdata(initialValues)
        }
    }

    const handleChange = (e)=>{
        setErrmsg(false)
        setApimsg("")
        setFormdata({...formData,[e.target.name]:e.target.value})
       
    }

    const handleImageChange = (e)=>{
      //convert image to base64
  
      //check file size exceeds max.size
      if (e.target.files[0].size > 2000000) {
        alert("Image is too large");
        return;
      }
      else{
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
  
        reader.onload = () => {
          // console.log(reader.result); //base64encoded string
          setFile(reader.result)
  
        }
        reader.onerror = error => {
          alert("Error: ", error);
        }
        setImage(URL.createObjectURL(e.target.files[0]))
      } 
    }
    
    useEffect(()=>{
        setTimeout(()=>{
            setFormdata(initialValues)
        },4000)
        
    },[isValid])

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(validate(formData)){
          register()
        }
        else{
            setIsvalid(false)
            setErrmsg(true)
        }
    }

    const validate = (values)=>{
        const errors={}
    
        if(!/^[a-zA-Z]*$/.test(values.fname)){
            errors.fname = "Name must be letters"
        }   
        if((!/^[0-9\b]+$/.test(values.phone)) || (values.phone.length != 10)){
            errors.phone = "Invalid phone number"
        }
       if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.pwd)){
            errors.pwd = "Password contain atleast eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }
        else if(values.pwd !=values.confirmpwd){
            errors.confirmpwd = "Password and confirm password doesn't match"
        }
       
        setFormerrors(errors)

        if (Object.keys(errors).length === 0) {
          return true;
        } 
        else {
          return false;
        }
    }

  return (
    <div>
    <Form className='p-3' onSubmit={handleSubmit}>
    {errMsg &&<span style={{color:'red', fontSize:'13px'}}>{formErrors.fname}</span>}
    <div className='d-flex'>
        <Form.Group className="mb-3" controlId="fname">
          <Form.Control name="fname" type="text" placeholder="Firstname" value={formData.fname} onChange={handleChange} required/>
        </Form.Group>
        <Form.Group className="mb-3 ms-3" controlId="lname">
          <Form.Control name="lname" type="text" placeholder="Lastname" value={formData.lname} onChange={handleChange} />
        </Form.Group>
    </div>
    <Form.Group className="mb-3" controlId="email">
      <Form.Control name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
    </Form.Group>
    {errMsg &&<span style={{color:'red', fontSize:'13px'}}>{formErrors.phone}</span>}
    <Form.Group className="mb-3" controlId="phone">
      <Form.Control name="phone"  placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required/>
    </Form.Group>
   <div className='d-flex'>
        <Form.Group className="mb-3 ms-3 d-flex"  controlId="photo">
            <Form.Label className='mt-2 me-2 text-muted'>UPLOAD PHOTO</Form.Label>     
            <Form.Label className='mt-2 me-2 text-muted'><img style={{width:'50px', height:'50px', borderRadius:'50%', cursor:'pointer'}} src={image} alt='no image'/></Form.Label>           
            <Form.Control style={{display:'none'}} name="photo" accept='image/*' type="file" onChange={handleImageChange} />
        </Form.Group>
        {/* <Form.Label className='mt-2 me-2 text-muted'>Gender</Form.Label>
        <Form.Select name="gender" className="mb-3" onChange={handleChange}>
          <option>select</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </Form.Select> */}
        <Form.Group className="mb-3 ms-3 d-flex"  controlId="dob">
            <Form.Label className='mt-2 me-2 text-muted'>DOB</Form.Label>
            <Form.Control name="dob" type="date" placeholder="DOB" value={formData.dob} max={current} onChange={handleChange} required/>
        </Form.Group>
   </div>
   {errMsg &&<span style={{color:'red', fontSize:'13px'}}>{formErrors.pwd}</span>}
    <Form.Group className="mb-3" controlId="pwd">
      <Form.Control name="pwd" type="password" placeholder="Password" value={formData.pwd} onChange={handleChange} required />
    </Form.Group>
    {errMsg &&<span style={{color:'red', fontSize:'13px'}}>{formErrors.confirmpwd}</span>}
    <Form.Group className="mb-3" controlId="confirmPwd">
      <Form.Control name="confirmpwd" type="password" placeholder="Confirm Password" value={formData.confirmpwd} onChange={handleChange} required/>
    </Form.Group>
    {apiMsg &&<span style={{color:'red', fontSize:'15px'}}>{apiMsg}</span>}
    <div  className='text-center'>
        <Button variant='light' style={{backgroundColor:'#cf6b3d', width:'100px', color:'white'}} type="submit">
          Register
        </Button>
    </div>
  </Form>
    </div>
  )
}

export default Registerform