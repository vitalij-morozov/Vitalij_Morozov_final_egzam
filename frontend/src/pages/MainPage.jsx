import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/Main/UserCard';
import { useSelector } from 'react-redux';

function MainPage({ socket }) {
  const navigate = useNavigate();

  const [counter, setCounter] = useState(0);

  const users = useSelector((state) => state.generalStore.users);
  const filter = useSelector((state) => state.generalStore.filterSettings);

  // const handleSwipe = () => {
  //   setCounter(counter + 1);
  //   if (counter === users.length) {
  //   }
  // };

  useEffect(() => {
    if (!filter) navigate('/filter');
  }, []);
  console.log('users ===', users);
  return (
    <div className='card_container page'>
      {users.length > 0 ? (
        <UserCard user={users[counter]} socket={socket} />
      ) : (
        <h2>Cannot find users, that match your search criterea</h2>
      )}
    </div>
  );
}

export default MainPage;
