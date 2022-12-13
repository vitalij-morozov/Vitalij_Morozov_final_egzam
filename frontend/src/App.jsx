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
import ProtectedRoutes from './pages/ProtectedRoutes';
import UserProfilePage from './pages/UserProfilePage';
import LikesPage from './pages/LikesPage';
import ChatPage from './pages/ChatPage';
import MessagesPage from './pages/MessagesPage';
import AuthPage from './pages/AuthPage';

const socket = io.connect('http://localhost:4000/');

function App() {
  const filter = useSelector((state) => state.generalStore.filterSettings);
  const url = useSelector((state) => state.generalStore.baseURL);
  const user = useSelector((state) => state.generalStore.user);
  const userLikes = useSelector((state) => state.generalStore.userLikes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      socket.emit('matches', user.likes);
      socket.emit('likes', user.liked);
    }
  }, [user]);

  useEffect(() => {
    if (filter) {
      http.get(`${url}/filtered/${filter.filterCity}&${filter.filterAge}&${filter.filterGender}`).then((data) => {
        const excludedFilterData = data.data.filter(
          (fUser) => !fUser.likes.includes(user.secret) && fUser.secret !== user.secret
        );
        dispatch(setUsers(excludedFilterData));
      });
    }
  });

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    const sessionUser = sessionStorage.getItem('user');

    if (localUser || sessionUser) {
      socket.emit('user', sessionUser.split(',')[0] || localUser.split(',')[0]);
      socket.emit('userLoggedIn', sessionUser.split(',')[0] || localUser.split(',')[0]);
    }
  }, [dispatch, url]);

  useEffect(() => {
    socket.on('getUser', (data) => {
      dispatch(setUser(data));
    });
  }, [dispatch]);

  useEffect(() => {
    const settings = sessionStorage.getItem('filterSettings');
    if (user && settings && !filter) {
      dispatch(setFilterSettings(JSON.parse(settings)));
    }
  }, [user, dispatch, filter]);

  useEffect(() => {
    socket.on('getLikes', (data) => {
      dispatch(setUserLikes(data));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('getMatches', (data) => {
      dispatch(setUserMatches(data));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('gu', (data) => {
      dispatch(setUser(data));
    });
  }, [dispatch, user]);

  useEffect(() => {
    socket.on('gu2', (data) => {
      dispatch(setUser(data));
    });
  }, [dispatch, user, userLikes]);

  return (
    <div className='App'>
      <BrowserRouter>
        {user && <Header />}
        <Routes>
          <Route path='/auth' element={<AuthPage socket={socket} />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<MainPage socket={socket} />} />
            <Route path='/profile' element={<UserProfilePage socket={socket} />} />
            <Route path='/profile/likes' element={<LikesPage socket={socket} />} />
            <Route path='/profile/messages' element={<MessagesPage socket={socket} />} />
            <Route path='/profile/chat/:toUser' element={<ChatPage socket={socket} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
