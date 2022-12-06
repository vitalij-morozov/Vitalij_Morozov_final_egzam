import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className='container'>
        <h1 className='logo' onClick={() => navigate('/')}>
          Pretender
        </h1>

        <div className='profile' onClick={() => navigate('/profile')}>
          <h3 className='avatar'>T</h3>

          <h2 className='header_username'>Testman</h2>
        </div>
      </div>
    </header>
  );
}

export default Header;
