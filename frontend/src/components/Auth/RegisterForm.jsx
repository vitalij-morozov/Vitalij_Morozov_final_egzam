import React from 'react'

function RegisterForm() {
  return (
    <form className='auth-form register'>
      <h2 className="auth-from_title">Register</h2>
      <div className="input-container">
        <label htmlFor="username">Username: </label>
        <input type="text" name='username' placeholder='Enter Username'/>
      </div>
      <div className="input-container">
        <label htmlFor="passwordOne">Password: </label>
        <input type="password" name='passwordOne' placeholder='Enter Password'/>
      </div>
      <div className="input-container">
        <label htmlFor="passwordTwo">Repeat Password: </label>
        <input type="password" name='passwordTwo' placeholder='Repeat Password'/>
      </div>
      <div className="input-container">
        <label htmlFor="city">City: </label>
        <select name="city">
          <option value="vilnius">Vilnius</option>
          <option value="kaunas">Kaunas</option>
          <option value="klaipeda">Klaipeda</option>
          <option value="siauliai">Siauliai</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="gender">Repeat Password: </label>
        <select name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="age">Repeat Password: </label>
        <input type="number" name='age' placeholder='Enter your full age'/>
      </div>
    <button type='submit' className='form-btn'>Register</button>
    </form>
  )
}

export default RegisterForm