import * as AuthApi from '../api/AuthRequests'
import * as ChatApi from '../api/ChatRequests'

  
export const login = (formData, location) =>  async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const result = await AuthApi.login(formData);
      dispatch({ type: "AUTH_SUCCESS", payload: result.data});
      location("/home", { replace: true });
    } 
    catch (error) {
      dispatch({ type: "AUTH_FAIL", payload: error.response.data});
      alert(error.response.data.message)
    }
  };
  
  export const requestAccept = (data) =>  async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const result = await ChatApi.acceptRequest(data);
      dispatch({ type: "ACCEPT_SUCCESS", payload: result.data});
      alert(result.data.message)
    } 
    catch (error) {
      dispatch({ type: "ACCEPT_FAIL", payload: error.response.data});
      alert(error.response.data.message)
    }
  };