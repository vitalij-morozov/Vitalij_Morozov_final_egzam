import React from 'react';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { useSelector } from 'react-redux';

function CardButtons({ userId, socket, hadleLikeButtonClick, hadleDislikeButtonClick }) {
  const user = useSelector((state) => state.generalStore.user);

  const handleLike = () => {
    socket.emit('like', { userWhoLikes: user.secret, userWhoIsLiked: userId });
    hadleLikeButtonClick();
  };

  return (
    <div className='card_buttons'>
      <button className='card_btn dislike' title='Dislike' onClick={hadleDislikeButtonClick}>
        SKIP
        <span>
          <BsHandThumbsDown />
        </span>
      </button>
      <button className='card_btn like' title='Like' onClick={handleLike}>
        LIKE
        <span>
          {' '}
          <BsHandThumbsUp />
        </span>
      </button>
    </div>
  );
}

export default CardButtons;
