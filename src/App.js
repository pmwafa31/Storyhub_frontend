import './App.css';
import Login from './components/auth/Login';
import Home from './components/homePage/Home'
import { Route, Routes } from 'react-router-dom';
import Chat from './components/chatPage/Chat';
import AddStory from './components/addStories/AddStory';
import Mystory from './components/myStoriesPage/Mystory';
import ViewPostDetail from './components/viewDetail/ViewPostDetail';
import UpdatePost from './components/updatePost/UpdatePost';
import Homepage from './components/mainHome/Homepage';
function App() {
  return (
    <div className="App">
      {/* <div className="blur" style={{top: '-18%', right: '0'}}></div> */}
      {/* <div className="blur" style={{top: '36%', left: '-8rem'}}></div> */}
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/add_story' element={<AddStory/>}/>
        <Route path='/view_my_stories' element={<Mystory/>}/>
        <Route path='/view_details/:id' element={<ViewPostDetail/>}/>
        <Route path='/update_post/:id' element={<UpdatePost/>}/>
      </Routes>
    </div>
  );
}

export default App;
