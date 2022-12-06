import React, { useState } from 'react';

import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import AuthNavigation from '../components/Auth/AuthNavigation';

function AuthPage() {
  const [auth, setAuth] = useState('auth-nav');

  const showComponent = () => {
    if (auth === 'auth-reg') return <RegisterForm setAuth={setAuth} />;
    if (auth === 'auth-login') return <LoginForm setAuth={setAuth} />;
    return <AuthNavigation setAuth={setAuth} />;
  };

  return <div className='auth-container page'>{showComponent()}</div>;
}

export default AuthPage;
