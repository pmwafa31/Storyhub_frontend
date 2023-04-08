import React, {useState, useEffect} from 'react'
import Header from '../subComponents/headerComponents/Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getPost, updatePost } from '../../actions/PostAction';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './UpdatePost.css'

function UpdatePost() {

    //for tooltip
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
        Update image of your story
        </Tooltip>
    );

    const [updateMsg, setUpdatemsg] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getPost(params.id))
  },[])

  const postDetail = useSelector(state => state.postReducer.postData)
  const post = postDetail? postDetail.post : ''
//   if(result.message){
//     setUpdatemsg(result.message)
//   }
  const [image, setImage] = useState(post.photo)
  const initialData = {
    title: post.title,
    description: post.description,
    photo: post.photo
  }
  const [postData, setPostData] = useState(initialData)
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
    dispatch(updatePost(post._id, postData)) 
    // window.location.reload(false)
    // if(postDetail.message){
    //     alert(postDetail.message)
    // }

  }

  return (
    <div>
        <Header/>
       <div style={{marginTop:'60px'}}>
          {post?
          (
              <Container>
              <Row>
                  <Col>
                  <Form className='p-5' onSubmit={handleSubmit} >
            
                  <Form.Group className="mb-3" controlId="photo">
                  <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}>
                  <Form.Label style={{cursor: 'pointer', width:'100%'}}>
                      <img style={{ width:'100%', height:'300px', borderRadius:'10px'}} src={image} alt='no image' />
                      </Form.Label>
                  </OverlayTrigger>
                      <Form.Control name='photo' accept='image/*'  type="file" style={{display: 'none'}} onChange={handleImageChange} />
                  </Form.Group>          
  
                  <Form.Group className="mb-3" controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control name='title' type="text" value={postData.title}  onChange={handleChange}/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                      <Form.Control name='description' value={postData.description} as="textarea"  rows={5}  onChange={handleChange}/>
                  </Form.Group>
                  <div style={{float:'right'}}>
                      <Button className='edit_btn'  variant="dark" onClick={ ()=> navigate('/view_my_stories')}>
                          Cancel
                      </Button>
                      <Button className='ms-3 edit_btn' variant="dark" type="submit">
                          Update
                      </Button>
                  </div>        
                  </Form>
                  </Col>
              </Row>
          </Container>
          ):
          (
              <h4 className='mt-5 text-center'>No data available</h4>
          )}
       </div >

    </div>
  )
}

export default UpdatePost