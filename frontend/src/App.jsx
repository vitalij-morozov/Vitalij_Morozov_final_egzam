import './styles/reset.css';
import './styles/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUsers } from './store/generalStore';

import io from 'socket.io-client';

import http from './plugins/http';

import Header from './components/Header';

//Pages
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import UserProfilePage from './pages/UserProfilePage';
import FilterPage from './pages/FilterPage';
import LikesPage from './pages/LikesPage';

const socket = io.connect('http://localhost:4000/');

function App() {
  const filter = useSelector((state) => state.generalStore.filterSettings);
  const url = useSelector((state) => state.generalStore.baseURL);
  const user = useSelector((state) => state.generalStore.user);

  const dispatch = useDispatch();

  // const navigate = useNavigate();

  console.log('filter ===', filter);

  useEffect(() => {
    if (filter) {
      http.get(`${url}/filtered`).then((data) => {
        console.log('filtered data', data);
        dispatch(setUsers(data.data));
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
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        {user && <Header />}
        <Routes>
          <Route path='/' element={<MainPage socket={socket} />} />
          <Route path='/auth' element={!user && <AuthPage />} />
          <Route path='/profile' element={<UserProfilePage socket={socket} />} />
          <Route path='/profile/likes' element={<LikesPage socket={socket} />} />
          <Route path='/filter' element={<FilterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
