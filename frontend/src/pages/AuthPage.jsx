import React from 'react'

import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

function AuthPage() {
  return (
    <div className='auth-container page'>
      <LoginForm/>
      <RegisterForm/>
    </div>
  )
}

export default AuthPage