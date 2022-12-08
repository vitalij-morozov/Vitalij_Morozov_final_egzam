import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import http from '../../plugins/http';

function RegisterForm({ setAuth, setErrors }) {
  const usernameRef = useRef();
  const passOneRef = useRef();
  const passTwoRef = useRef();
  const cityRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();

  const url = useSelector((state) => state.generalStore.baseURL);

  const handleRegistration = async (e) => {
    e.preventDefault();

    const registrationData = {
      username: usernameRef.current.value,
      password1: passOneRef.current.value,
      password2: passTwoRef.current.value,
      gender: genderRef.current.value,
      city: cityRef.current.value,
      age: +ageRef.current.value,
    };

    http.post(`${url}/auth/register`, registrationData).then((data) => {
      console.log(data);
      if (data.error) {
        setErrors(data.data);
      }
      setAuth('auth-login');
    });
  };

  return (
    <form className='auth-form register'>
      <h2 className='auth-from_title'>Register</h2>
      <div className='input-container'>
        <label htmlFor='username'>Username: </label>
        <input ref={usernameRef} type='text' name='username' placeholder='Enter Username' />
      </div>
      <div className='input-container'>
        <label htmlFor='passwordOne'>Password: </label>
        <input ref={passOneRef} type='password' name='passwordOne' placeholder='Enter Password' />
      </div>
      <div className='input-container'>
        <label htmlFor='passwordTwo'>Repeat Password: </label>
        <input ref={passTwoRef} type='password' name='passwordTwo' placeholder='Repeat Password' />
      </div>
      <div className='input-container'>
        <label htmlFor='city'>City: </label>
        <select ref={cityRef} name='city'>
          <option value='vilnius'>Vilnius</option>
          <option value='kaunas'>Kaunas</option>
          <option value='klaipeda'>Klaipeda</option>
          <option value='siauliai'>Siauliai</option>
        </select>
      </div>
      <div className='input-container'>
        <label htmlFor='gender'>Gender: </label>
        <select ref={genderRef} name='gender'>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </div>
      <div className='input-container'>
        <label htmlFor='age'>Full Age: </label>
        <input ref={ageRef} type='number' name='age' placeholder='Enter your full age' />
      </div>
      <p
        className='form-nav'
        onClick={() => {
          setAuth('auth-login');
          setErrors([]);
        }}
      >
        Already have an account? Click here to Sign In.
      </p>
      <button type='submit' className='form-btn' onClick={handleRegistration}>
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
