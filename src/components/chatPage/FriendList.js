import React from 'react'
import './FriendList.css'

function FriendList({friend}) {
  return (
    <div>
        <div className='mt-3 friend_div'>
            <img className='frd_img' src={friend.userphoto} />&nbsp;&nbsp;
            <span className='name'>{friend.username}</span>&nbsp;&nbsp;
        </div>
    </div>
  )
}

export default FriendList