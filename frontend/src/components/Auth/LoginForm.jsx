import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import http from '../../plugins/http';
import { setUser } from '../../store/generalStore';

function LoginForm({ setAuth, setErrors, socket }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const stayLoggedRef = useRef();

  const url = useSelector((state) => state.generalStore.baseURL);

  const [stayLogged, setStayLogged] = useState(false);

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
        return;
      }
      if (!data.error) {
        dispatch(setUser(data.data.user));
        socket.emit('userLoggedIn', data.data.user.secret);

        sessionStorage.setItem('user', [data.data.userId, data.data.username]);
        if (stayLogged) {
          localStorage.setItem('user', [data.data.userId, data.data.username]);
        }
        navigate('/profile');
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
        <input ref={stayLoggedRef} type='checkbox' name='logged' onChange={() => setStayLogged(!stayLogged)} />
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
