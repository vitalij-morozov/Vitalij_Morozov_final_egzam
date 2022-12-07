import React from 'react';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { useSelector } from 'react-redux';

function CardButtons({ userId, socket }) {
  const user = useSelector((state) => state.generalStore.user);

  const handleLike = () => {
    socket.emit('like', { likeUsername: user.secret, likedUsername: userId });
    console.log('btn');
  };

  return (
    <div className='card_buttons'>
      <button className='card_btn dislike' title='Dislike'>
        <BsHandThumbsDown />
      </button>
      <button className='card_btn like' title='Like' onClick={handleLike}>
        <BsHandThumbsUp />
      </button>
    </div>
  );
}

export default CardButtons;
