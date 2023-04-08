import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment } from '../../actions/PostAction';


function Comments({postId}) {
    const [comment, setComment] = useState('')

    const user = useSelector(state => state.authReducer.userData)
    const result = useSelector(state => state.postReducer.postData)
    const post = result? result.post : ''
    
    const dispatch = useDispatch()
    
    const handleSubmit =  (e)=>{
        e.preventDefault()
        const commentData ={
            postId: post._id,
            comment: comment,
            userId:user.id,
            username: user.name,
            userphoto: user.photo
        }
        dispatch(addComment(commentData))
        // alert("Comment posted")
        setComment('')
        window.location.reload(false)
    }

    const deleteMyComment =(commentId)=>{
        const data={
            postId: post._id,
            commentId: commentId
        }
        dispatch(deleteComment(data))
        // window.location.reload(false)
    }

    return (
        <>
        {post?
        (
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="comment">
                            <Form.Control name='comment' value={comment} as="textarea" rows={3} placeholder='Comment Here' required onChange= {(e)=>setComment(e.target.value)}/>
                        </Form.Group>
                        <div style={{ float: 'right' }}>
                            <Button variant="primary" type="submit" >Post</Button>
                        </div>
                    </Form>
                    <div style={{ marginTop: '50px', textAlign: 'left' }}>
                        <h5 >Comments &nbsp;&nbsp;<span style={{ fontWeight: 'lighter' }}>{post.comments.length} comments</span></h5>
                        {post.comments.map(item => (
                            <div style={{display:'flex', marginBottom:'10px', width:'100%'}}>
                                <img src={item.userphoto} style={{ width: '40px', height: '40px', borderRadius:'50%', marginTop:'5px'}} />&nbsp;&nbsp;
                                <div style={{backgroundColor: "rgb(247, 245, 244)", width:'100%', borderRadius:'10px'}}>
                                <span style={{fontSize:'20px', marginLeft:'10px', color:'brown'}}>{item.username}</span><br/>
                                <span style={{marginLeft:'18px', fontSize:'18px'}}>{item.comment}</span>
                                {item.userId == user.id && <span><button onClick={()=>deleteMyComment(item.id)} style={{border:'none', marginLeft:'18px', fontSize:'13px', color:'red'}}><i class="fa-solid fa-trash"></i></button></span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        ):''}
            
            
        </>
    )
}

export default Comments