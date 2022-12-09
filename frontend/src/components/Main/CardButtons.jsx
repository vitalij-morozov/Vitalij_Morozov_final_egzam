import React, { useEffect } from 'react';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLikes, setUserMatches } from '../../store/generalStore';

function CardButtons({ userId, socket, hadleLikeButtonClick, hadleDislikeButtonClick }) {
  const user = useSelector((state) => state.generalStore.user);
  const userLikes = useSelector((state) => state.generalStore.userLikes);
  const userMatches = useSelector((state) => state.generalStore.userMatches);

  const dispatch = useDispatch();

  const handleLike = () => {
    socket.emit('like', { userWhoLikes: user.secret, userWhoIsLiked: userId });

    hadleLikeButtonClick();
  };

  useEffect(() => {
    socket.on('getUpdatedLikesData', (data) => {
      console.log('getUpdatedLikesData', data);
      if (data.data.liked.includes(user.secret)) {
        dispatch(setUserMatches([data.data, ...userMatches]));
      } else {
        dispatch(setUserLikes([data.data, ...userLikes]));
      }
    });
  }, [socket]);

  return (
    <div className='card_buttons'>
      <button className='card_btn dislike' title='Dislike' onClick={hadleDislikeButtonClick}>
        <BsHandThumbsDown />
      </button>
      <button className='card_btn like' title='Like' onClick={handleLike}>
        <BsHandThumbsUp />
      </button>
    </div>
  );
}

export default CardButtons;
