import './styles/reset.css';
import './styles/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUsers, setFilterSettings, setUserLikes, setUserMatches } from './store/generalStore';

import io from 'socket.io-client';

import http from './plugins/http';

import Header from './components/Header';

//Pages
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import UserProfilePage from './pages/UserProfilePage';
import LikesPage from './pages/LikesPage';
import ChatPage from './pages/ChatPage';
import MessagesPage from './pages/MessagesPage';

const socket = io.connect('http://localhost:4000/');

function App() {
  const filter = useSelector((state) => state.generalStore.filterSettings);
  const url = useSelector((state) => state.generalStore.baseURL);
  const user = useSelector((state) => state.generalStore.user);

  const dispatch = useDispatch();

  console.log('filter ===', filter);

  useEffect(() => {
    if (filter) {
      http.get(`${url}/filtered/${filter.filterCity}&${filter.filterAge}&${filter.filterGender}`).then((data) => {
        console.log('filtered data', data);
        const excludedFilterData = data.data.filter(
          (fUser) => !fUser.likes.includes(user.secret) && fUser.secret !== user.secret
        );
        dispatch(setUsers(excludedFilterData));
      });
    }
  }, [filter]);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    const sessionUser = sessionStorage.getItem('user');

    if (localUser || sessionUser) {
      http.get(`${url}/users/${sessionUser.split(',')[0] || localUser.split(',')[0]}`).then((data) => {
        console.log('getting user data ===', data);
        dispatch(setUser(data.data));
        console.log('sessionUser ===', sessionUser);
      });
    }
  }, [dispatch, url]);

  useEffect(() => {
    const settings = localStorage.getItem('filterSettings');
    if (user && settings && !filter) {
      dispatch(setFilterSettings(JSON.parse(settings)));
      console.log('JSON.parse(settings) ===', JSON.parse(settings));
    }
  }, [user, dispatch, filter]);

  useEffect(() => {
    if (user) {
      socket.emit('likes', user.liked);
      socket.on('getMatches', (data) => {
        console.log('get likes data', data);
        if (!data.error) {
          const filterLikes = data.data.filter((fUser) => !fUser.liked.includes(user.secret));
          const filteredMatches = data.data.filter((fUser) => fUser.liked.includes(user.secret));
          dispatch(setUserLikes(filterLikes));
          dispatch(setUserMatches(filteredMatches));
        }
      });
    }
  }, [dispatch, user]);

  return (
    <div className='App'>
      <BrowserRouter>
        {user && <Header />}
        <Routes>
          <Route path='/' element={<MainPage socket={socket} />} />
          <Route path='/auth' element={!user && <AuthPage />} />
          <Route path='/profile' element={<UserProfilePage socket={socket} />} />
          <Route path='/profile/likes' element={<LikesPage socket={socket} />} />
          <Route path='/profile/messages' element={<MessagesPage socket={socket} />} />
          <Route path='/profile/chat/:toUser' element={<ChatPage socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
