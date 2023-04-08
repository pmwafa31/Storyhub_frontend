import React, {useState, useEffect} from 'react'
import './FriendList.css'
import * as ChatApi from '../../api/ChatRequests'

function ChatList({chat, currentUser}) {
  
    const [friend, setFriend] = useState(null)

    const friendId = chat.members.find((id)=> id !== currentUser.id)

    const getFriend = async ()=>{
      try{
        const result = await ChatApi.getFriend(friendId);
        setFriend(result.data)
      }
      catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      getFriend()
    },[chat, currentUser])
  
    return (

    <div>
      {friend && <div className='mt-3 friend_div'>
            <img className='frd_img' src={friend.photo} />&nbsp;&nbsp;
            <span className='name'>{friend.name}</span>&nbsp;&nbsp;
        </div>}
         
    </div>
  )
}

export default ChatList