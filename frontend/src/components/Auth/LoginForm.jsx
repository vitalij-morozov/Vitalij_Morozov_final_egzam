import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import http from '../../plugins/http';

function LoginForm({ setAuth, setErrors }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const stayLoggedRef = useRef();

  const url = useSelector((state) => state.generalStore.baseURL);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    http.post(`${url}/auth/login`, loginData).then((data) => {
      console.log('login', data);
      if (data.error) {
        setErrors(data.data);
      }
    });
  };
  return (
    <form className='auth-form login'>
      <h2 className='auth-from_title'>Sign In</h2>
      <div className='input-container'>
        <label htmlFor='username'>Username: </label>
        <input ref={usernameRef} type='text' name='username' placeholder='Enter Username' />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password: </label>
        <input ref={passwordRef} type='password' name='password' placeholder='Enter Password' />
      </div>
      <div className='checkbox-container'>
        <label htmlFor='logged'>Stay logged in?</label>
        <input ref={stayLoggedRef} type='checkbox' name='logged' />
      </div>

      <p
        className='form-nav'
        onClick={() => {
          setAuth('auth-reg');
          setErrors([]);
        }}
      >
        Do not have an account? Click here to Register.
      </p>

      <button type='submit' className='form-btn' onClick={handleLogin}>
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
