import './styles/reset.css';
import './styles/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import io from 'socket.io-client';

import http from './plugins/http';

import Header from './components/Header';

//Pages
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import UserProfilePage from './pages/UserProfilePage';
import FilterPage from './pages/FilterPage';

function App() {
  const filter = useSelector((state) => state.generalStore.filterSettings);
  const url = useSelector((state) => state.generalStore.baseURL);

  const socket = io.connect(url + '/');

  console.log('filter ===', filter);

  useEffect(() => {
    if (filter) {
      http.get(`${url}/filtered`).then((data) => console.log(data));
    }
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/profile' element={<UserProfilePage socket={socket} />} />
          <Route path='/filter' element={<FilterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
