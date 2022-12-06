import './styles/reset.css';
import './styles/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';

//Pages
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/profile' element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
