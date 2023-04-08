import React from 'react'
import './ProfileCard.css'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux'

function ProfileCard() {

    const user = useSelector(state => state.authReducer.userData)
  return (
    <div >
        <Card  className='profilecard'>
        <Card.Img variant="top" src={user.coverphoto} className='coverphoto'/>
        <Card.Img variant="top" src={user.photo} className='profilephoto'/>
        <Card.Body className='mt-2'>
            <Card.Title className='text-center'>{user.name}</Card.Title>   
            {user.occupation && <Card.Title className='text-center' style={{fontSize:'15px'}}>Occupation</Card.Title>}
            {user.about?
            (<span>{user.about}</span>):
            (<span>Make friends and share your moments with them...</span>)} 
            <ListGroup variant="flush">
                {user.dob && <ListGroup.Item>Born on  {user.dob}</ListGroup.Item>}
                {user.place && <ListGroup.Item>Lives at</ListGroup.Item>}  
            </ListGroup>
        </Card.Body>
        </Card>
    </div>
  )
}

export default ProfileCard