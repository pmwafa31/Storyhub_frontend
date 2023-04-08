export const authReducer = (state = { userData: null, loading: false, error: false, updateLoading: false },action) => {
    switch (action.type){
        
        case "AUTH_START":
            return {...state, loading: true, error: false };
       
        case "AUTH_SUCCESS":
            localStorage.setItem("userId",action?.payload.id)
            localStorage.setItem("token",action?.payload.token)
            return {...state,  userData: action.payload, loading: false, error: false };
        
        case "AUTH_FAIL":
            return {...state, userData:action.payload, loading: false, error: true };
        
        case "ACCEPT_SUCCESS":
            return {...state,  userData: action.payload, loading: false, error: false };
            
        case "ACCEPT_FAIL":
            return {...state, userData:action.payload, loading: false, error: true };

        default:
            return state
    }
} 