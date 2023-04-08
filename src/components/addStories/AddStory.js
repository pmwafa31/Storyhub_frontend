import React, {useState} from 'react'
import './AddStory.css'
import Header from '../subComponents/headerComponents/Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import * as PostApi from '../../api/PostRequests'
import { useSelector } from 'react-redux';


function AddStory() {
  //for tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Upload image to your story
    </Tooltip>
  );

  const today = new Date()
 
  const user = useSelector(state => state.authReducer.userData)
  const initialData = {
    userId: user.id,
    username: user.name,
    userphoto: user.photo,
    title: '',
    description: '',
    photo: '',
    createdDate: today.toString().slice(0,15)
  }
  const [postData, setPostData] = useState(initialData)
  const [image, setImage] = useState('https://neilpatel.com/wp-content/uploads/2017/09/blog-post-image-guide.jpg')
  const [file, setFile] = useState('')
  
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

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    file?postData.photo = file: postData.photo =image
    //api to addd story
    try{
      const result = await PostApi.createPost(postData)
      console.log(result);
      alert(result.data.message)
      setPostData(initialData)
      setImage('https://neilpatel.com/wp-content/uploads/2017/09/blog-post-image-guide.jpg')
    }
    catch(error){
        alert(error.response.data.message)
    }
  }

  return (
    <div>
      <Header/>
      <div style={{marginTop:'100px'}}>
        <Container className='mt-5 add_container'>

        <Form className='add_form' onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3" controlId="photo">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}>
           <Form.Label style={{cursor: 'pointer'}}>
            <img className='post_image' src={image} alt='no image'/>
            </Form.Label>
           </OverlayTrigger>
            <Form.Control name='photo' accept='image/*'  type="file" required style={{display: 'none'}} onChange={handleImageChange}/>
          </Form.Group>          

          <Form.Group className="mb-3" controlId="title">
            <Form.Control name='title' type="text" value={postData.title} placeholder="Title" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Control name='description' value={postData.description} as="textarea"  rows={5} placeholder="Tell your story" required onChange={handleChange}/>
          </Form.Group>
    
          <Button variant="light"  type="submit">
            Create
          </Button>
        </Form>
        </Container>
      </div>
    </div>
  )
}

export default AddStory