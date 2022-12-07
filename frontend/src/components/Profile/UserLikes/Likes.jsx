import React from 'react';
import { useSelector } from 'react-redux';

function Likes() {
  const user = useSelector((state) => state.generalStore.user);

  console.log('user.likes ===', user.likes);

  return <div>Likes</div>;
}

export default Likes;
