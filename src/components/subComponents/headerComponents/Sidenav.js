import React from 'react'
import './Sidenav.css'
import { useSelector } from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup';

function Sidenav() {
    const user = useSelector(state => state.authReducer.userData)

  return (
    <div className='header'>
       
        <div className='profile'>
            <img src={user.photo} alt='image' className='profilephoto'/> <br></br>
            <span>{user.name}</span><br></br>
            <span>jdfhdjghjhdfj</span><br></br>
            <span>{user.phone}</span>
        </div>
        <ListGroup className='mt-4'>
            <ListGroup.Item action className='actions'>All Stories</ListGroup.Item>
            <ListGroup.Item action className='actions'>My Stories</ListGroup.Item>
            <ListGroup.Item action href='/add_story' className='actions'>Add Story</ListGroup.Item>
            <ListGroup.Item action className='actions'>Chat</ListGroup.Item>
            <ListGroup.Item action className='actions'>Logout</ListGroup.Item>

        </ListGroup>
    </div>
  )
}

export default Sidenav