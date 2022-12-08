import React from 'react';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { setUserLikes, setUserMatches } from '../../store/generalStore';

function CardButtons({ userId, socket }) {
  const user = useSelector((state) => state.generalStore.user);
  const userLikes = useSelector((state) => state.generalStore.userLikes);
  const userMatches = useSelector((state) => state.generalStore.userMatches);

  const handleLike = () => {
    socket.emit('like', { userWhoLikes: user.secret, userWhoIsLiked: userId });
    socket.on('getUpdatedLikesData', (data) => {
      console.log('getUpdatedLikesData', data);
      if (data.data.liked.includes(user.secret)) {
        setUserMatches([data.data, ...userMatches]);
      } else {
        setUserLikes([data.data, ...userLikes]);
      }
    });
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
