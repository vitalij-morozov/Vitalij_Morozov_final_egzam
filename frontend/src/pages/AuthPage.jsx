import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import AuthNavigation from '../components/Auth/AuthNavigation';

function AuthPage({ socket }) {
  const [auth, setAuth] = useState('auth-nav');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    errors && errors.forEach((err) => toast.warn(err.message));
  }, [errors]);

  return (
    <div className='auth-container container page'>
      {auth === 'auth-reg' ? (
        <RegisterForm setAuth={setAuth} setErrors={setErrors} />
      ) : auth === 'auth-login' ? (
        <LoginForm setAuth={setAuth} setErrors={setErrors} socket={socket} />
      ) : (
        <AuthNavigation setAuth={setAuth} />
      )}
      <ToastContainer position='bottom-right' theme='dark' />
    </div>
  );
}

export default AuthPage;
