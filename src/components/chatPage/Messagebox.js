import React, {useState, useEffect} from 'react'
import './Messagebox.css'
import * as ChatApi from '../../api/ChatRequests'
import { format } from "timeago.js";


function Messagebox({message, own}) {

  const [user, setUser] = useState(null)

  const getUser = async ()=>{
    try{
      const result = await ChatApi.getFriend(message.senderId);
      setUser(result.data)
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getUser()
  },[message])

  return (
    <div>
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                className="messageImg"
                src={user?.photo}
                alt="no image"
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    </div>
  )
}

export default Messagebox