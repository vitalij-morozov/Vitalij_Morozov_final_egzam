import React from 'react';

function AuthErrorMessage({ error }) {
  return <p className='auth-error'>{error.message}</p>;
}

export default AuthErrorMessage;
