import React, { useState } from 'react';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function UserLikesCarouselCard({ user, type }) {
  const { images, username, age, city, secret } = user;

  const navigate = useNavigate();

  const [counter, setCounter] = useState(0);

  const handlePhotoChangeLeft = () => {
    setCounter(counter - 1);

    if (counter === images.length) {
      setCounter(0);
    }
    if (counter === 0) {
      setCounter(images.length - 1);
    }
  };

  const handlePhotoChangeRight = () => {
    setCounter(counter + 1);

    if (counter === images.length - 1) {
      setCounter(0);
    }
  };

  return (
    <div className='card_carousel small' style={{ backgroundImage: `url(${images && images[counter]})` }}>
      <div className='card_buttons'>
        <button className='carousel-btn left-btn' onClick={handlePhotoChangeLeft} title='Previous Photo'>
          <HiOutlineArrowSmLeft className='carousel-btn' onClick={handlePhotoChangeLeft} />
        </button>
        <button className='carousel-btn rigth-btn' onClick={handlePhotoChangeRight} title='Next Photo'>
          <HiOutlineArrowSmRight />
        </button>
      </div>

      <div className='card_info'>
        <h2 className='card_name'>{`${username}, ${age}, ${city}`}</h2>
      </div>
      {type === 'matches' && <button onClick={() => navigate(`/profile/chat/${secret}`)}>Start Chatting</button>}
    </div>
  );
}

export default UserLikesCarouselCard;
