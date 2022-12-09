import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserCard from '../components/Main/UserCard';
import Filter from '../components/Filter';

function MainPage({ socket }) {
  const navigate = useNavigate();

  const [counter, setCounter] = useState(0);
  const [showCards, setShowCards] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const user = useSelector((state) => state.generalStore.user);
  const users = useSelector((state) => state.generalStore.users);
  const filter = useSelector((state) => state.generalStore.filterSettings);

  // const handleSwipe = () => {
  //   setCounter(counter + 1);
  //   if (counter === users.length) {
  //   }
  // };

  const hadleLikeButtonClick = () => {
    setCounter(counter + 1);
    setShowCards(true);
    if (counter === users.length) {
      setCounter(0);
      setShowCards(false);
    }
  };

  const hadleDislikeButtonClick = () => {
    setCounter(counter + 1);
    setShowCards(true);
    if (counter === users.length) {
      setCounter(0);
      setShowCards(false);
    }
  };

  console.log('user ===', user);

  useEffect(() => {
    const sUser = sessionStorage.getItem('user');
    const lUser = localStorage.getItem('user');
    if (!sUser && !lUser) navigate('/auth');
  }, [navigate, user]);
  console.log('users ===', users);
  return (
    <div className='card_container page'>
      <div className='filter-container'>
        {!showFilter ? <button onClick={() => setShowFilter(!showFilter)}>FILTER</button> : ''}
        {showFilter ? <Filter /> : ''}
      </div>

      {users.length > 0 && users.length !== counter ? (
        <UserCard
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
