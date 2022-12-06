import React from 'react';

function AuthNavigation({ setAuth }) {
  return (
    <div className='auth-nav'>
      <h3 className='announcement'>Want to start using Pretender App? Then: </h3>
      <div className='auth-nav_buttons'>
        <button className='auth-nav_btn reg' onClick={() => setAuth('auth-reg')}>
          REGISTER
        </button>
        <span>OR</span>
        <button className='auth-nav_btn login' onClick={() => setAuth('auth-login')}>
          SIGN IN
        </button>
      </div>
    </div>
  );
}

export default AuthNavigation;
