import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/Main/UserCard';
import { useSelector } from 'react-redux';

function MainPage() {
  const navigate = useNavigate();

  const users = useSelector((state) => state.generalStore.users);
  const filter = useSelector((state) => state.generalStore.filterSettings);

  useEffect(() => {
    if (!filter) navigate('/filter');
  }, []);

  return (
    <div className='card_container page'>{users && users.map((user, idx) => <UserCard key={idx} user={user} />)}</div>
  );
}

export default MainPage;
