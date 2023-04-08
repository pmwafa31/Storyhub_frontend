import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000' });

//passing jwt token in headers
API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
      req.headers.Authorization = localStorage.getItem("token")
    }
    return req;
  });

//api for creating new post
export const createPost= (postData)=> API.post('/add_story', postData)

//api to get all posts
export const getAllPosts= ()=> API.get('/all_posts');

//api to get a particular post
export const getPost= (postId)=> API.get(`/get_post/${postId}`);

//api to add comments
export const addComment= (commentData)=> API.post('/add_comment', commentData)

//api for deleting comment
export const deleteComment= (data)=> API.post('/delete_comment', data)

//api to get all comments
export const getComments= (postId)=> API.get(`/get_comment/${postId}`);

//api to delete post
export const deletePost= (postId)=> API.delete(`/delete_post/${postId}`);

//api to update post
export const updatePost= (postId, postData)=> API.put(`/update_post/${postId}`, postData)

