import React, { useState } from 'react';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';

// const testPhotos = [
//   'https://images.unsplash.com/photo-1670214765086-780147ba00ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
//   'https://images.unsplash.com/photo-1670150560579-7427b1e8a576?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
//   'https://images.unsplash.com/photo-1670199365078-b723b1ca9f56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//   'https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
// ];

function CardCarousel({ user, type }) {
  const [counter, setCounter] = useState(0);

  const { username, images, age, city } = user;

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

  console.log('counter ===', counter);

  return (
    <div className='card_carousel' style={{ backgroundImage: `url(${images[counter]})` }}>
      <button className='carousel-btn left-btn' onClick={handlePhotoChangeLeft} title='Previous Photo'>
        <HiOutlineArrowSmLeft className='carousel-btn' onClick={handlePhotoChangeLeft} />
      </button>
      <div className='card_info'>
        <h2 className='card_name'>{`${username}, ${age}, ${city}`}</h2>
      </div>
      <button className='carousel-btn rigth-btn' onClick={handlePhotoChangeRight} title='Next Photo'>
        <HiOutlineArrowSmRight />
      </button>
      {type === 'matches' && <button>Start Chat</button>}
    </div>
  );
}

export default CardCarousel;
