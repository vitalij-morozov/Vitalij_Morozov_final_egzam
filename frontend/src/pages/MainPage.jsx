import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserCard from '../components/Main/UserCard';
import Filter from '../components/Filter';

function MainPage({ socket }) {
  const navigate = useNavigate();

  const [counter, setCounter] = useState(0);
  const [showCards, setShowCards] = useState(true);

  const user = useSelector((state) => state.generalStore.user);
  const users = useSelector((state) => state.generalStore.users);

  const hadleLikeButtonClick = () => {
    setCounter(counter + 1);
    setShowCards(true);
    if (counter === users.length - 1) {
      setCounter(0);
      setShowCards(false);
    }
  };

  const hadleDislikeButtonClick = () => {
    setCounter(counter + 1);
    setShowCards(true);
    if (counter === users.length - 1) {
      setCounter(0);
      setShowCards(false);
    }
  };

  useEffect(() => {
    const sUser = sessionStorage.getItem('user');
    const lUser = localStorage.getItem('user');
    if (!sUser && !lUser) navigate('/auth');
  }, [navigate, user]);

  return (
    <div className='card_container page'>
      <div className='filter-container'>
        <Filter />
      </div>

      {users.length > 0 ? (
        <UserCard
          show={showCards}
          user={users[counter]}
          hadleLikeButtonClick={hadleLikeButtonClick}
          hadleDislikeButtonClick={hadleDislikeButtonClick}
          socket={socket}
        />
      ) : (
        <h2 className='cards-fail-message'>Cannot find users, that match your search criterea</h2>
      )}
    </div>
  );
}

export default MainPage;
