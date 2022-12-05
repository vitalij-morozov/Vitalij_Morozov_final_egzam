import React from 'react'

function LoginForm() {
  return (
    <form className='auth-form login'>
      <h2 className="auth-from_title">Login</h2>
      <div className="input-container">
        <label htmlFor="username">Username: </label>
        <input type="text" name='username' placeholder='Enter Username'/>
      </div>
      <div className="input-container">
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' placeholder='Enter Password'/>
      </div>
      <div className="checkbox-container">
        <label htmlFor="logged">Stay logged in?</label>
        <input type="checkbox" name='logged'/>
      </div>
    <button type='submit' className='form-btn'>Log In</button>
    </form>
  )
}

export default LoginForm