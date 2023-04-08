import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000' });

//passing jwt token in headers
API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
      req.headers.Authorization = localStorage.getItem("token")
    }
    return req;
  });

  //api to add friend
  export const addFriend= (data)=> API.post('/add_friend', data)

  //api to accept request friend
  export const acceptRequest= (data)=> API.post('/accept_friend', data)

  //api to create chat
  export const createChat =(data) => API.post('/create_chat', data)

  //api to get all chats
  export const getAllChats = (userId) => API.get(`/get_all_chat/${userId}`)

  //api to get details of friend
  export const getFriend = (userId) => API.get(`/get_friend/${userId}`)

  //api to get messages of a chat
  export const getMessages = (chatId) => API.get(`/get_messages/${chatId}`)

  //api to add new messages
  export const addMessage =(message) => API.post('/add_message', message)


