export const postReducer = (state = { postData: null, loading: false, error: false, updateLoading: false },action) => {
    switch (action.type){
        
        case "START":
            return {...state, loading: true, error: false };
       
        case "GET_POST_SUCCESS":
            return {...state,  postData: action.payload, loading: false, error: false };
        
        case "GET_POST_FAIL":
            return {...state, postData:action.payload, loading: false, error: true };

        //to add comments
        case "ADD_COMMENT_SUCCESS":
            return {...state,  postData: action.payload, loading: false, error: false };
        
        case "ADD_COMMENT_FAIL":
            return {...state, postData:action.payload, loading: false, error: true };

        //to delete comments
        case "DELETE_COMMENT_SUCCESS":
            return {...state,  postData: action.payload, loading: false, error: false };
        
        case "DELETE_COMMENT_FAIL":
            return {...state, postData:action.payload, loading: false, error: true };
        
        //to update post
        case "UPDATE_SUCCESS":
            return {...state,  postData: action.payload, loading: false, error: false };
        
        case "UPDATE_FAIL":
            return {...state, postData:action.payload, loading: false, error: true };
            
        default:
            return state
    }
} 