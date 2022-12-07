import React, { useState } from 'react';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';

function UserLikesCarouselCard({ user }) {
  const { images, username, info } = user;

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
    <div className='carousel-card small' style={{ backgroundImage: `url(${images[counter]})` }}>
      <button className='carousel-btn left-btn' onClick={handlePhotoChangeLeft} title='Previous Photo'>
        <HiOutlineArrowSmLeft className='carousel-btn' onClick={handlePhotoChangeLeft} />
      </button>
      <div className='card_info'>
        <h2 className='card_name'>{`${username}, ${info.age}, ${info.city}`}</h2>
      </div>
      <button className='carousel-btn rigth-btn' onClick={handlePhotoChangeRight} title='Next Photo'>
        <HiOutlineArrowSmRight />
      </button>
    </div>
  );
}

export default UserLikesCarouselCard;
