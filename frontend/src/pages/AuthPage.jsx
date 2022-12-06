import React, { useState } from 'react';

import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import AuthNavigation from '../components/Auth/AuthNavigation';
import AuthErrorMessage from '../components/Auth/AuthErrorMessage';

function AuthPage() {
  const [auth, setAuth] = useState('auth-nav');

  const [errors, setErrors] = useState([]);

  console.log('errors ===', errors);

  return (
    <div className='auth-container container page'>
      {auth === 'auth-reg' ? (
        <RegisterForm setAuth={setAuth} setErrors={setErrors} />
      ) : auth === 'auth-login' ? (
        <LoginForm setAuth={setAuth} setErrors={setErrors} />
      ) : (
        <AuthNavigation setAuth={setAuth} />
      )}
      <div className='error-container'>
        {errors && errors.length > 0 ? errors.map((err, i) => <AuthErrorMessage key={i} error={err} />) : ''}
      </div>
    </div>
  );
}

export default AuthPage;
