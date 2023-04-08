import * as PostApi from '../api/PostRequests';

//action to get all posts
export const getPost = (postId) =>  async (dispatch) => {
    dispatch({ type: "START" });
    try {
      const result = await PostApi.getPost(postId);
      dispatch({ type: "GET_POST_SUCCESS", payload: result.data});
    } 
    catch (error) {
      dispatch({ type: "GET_POST_FAIL", payload: error.response.data});
      alert(error.response.data.message)
    }
  }

//action to add comments
export const addComment = (commentData) =>  async (dispatch) => {
    try {
      const result = await PostApi.addComment(commentData)
      dispatch({ type: "ADD_COMMENT_SUCCESS", payload: result.data});
      alert(result.data.message)

    } 
    catch (error) {
      dispatch({ type: "ADD_COMMENT_FAIL", payload: error.response.data});
      alert(error.response.data.message)
    }
  }

  //action to delete comment
export const deleteComment = (data) =>  async (dispatch) => {
  try {
    const result = await PostApi.deleteComment(data)
    dispatch({ type: "DELETE_COMMENT_SUCCESS", payload: result.data});
    alert(result.data.message)

  } 
  catch (error) {
    dispatch({ type: "DELETE_COMMENT_FAIL", payload: error.response.data});
    alert(error.response.data.message)
  }
}

  //action to update post
export const updatePost = (postId, postData) =>  async (dispatch) => {
  try {
    const result = await PostApi.updatePost(postId, postData)
    dispatch({ type: "UPDATE_SUCCESS", payload: result.data});
    alert(result.data.message)
  } 
  catch (error) {
    dispatch({ type: "UPDATE_FAIL", payload: error.response.data});
    alert(error.response.data.message)
  }
}

