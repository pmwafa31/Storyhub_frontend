import {  createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/AuthReducer";
import { postReducer } from "../reducers/PostReducer";

const reducers = combineReducers({authReducer, postReducer})
const middleware = [thunk]

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
  }
  
  function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
  }

//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedState = loadFromLocalStorage();
  
  const store = createStore(reducers, persistedState, applyMiddleware(...middleware));
  
  store.subscribe(() => saveToLocalStorage(store.getState()));
//   const store = createStore(reducers, applyMiddleware(...middleware))

export default store

