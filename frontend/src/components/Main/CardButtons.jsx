import React from 'react';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';

function CardButtons() {
  return (
    <div className='card_buttons'>
      <button className='card_btn dislike' title='Dislike'>
        <BsHandThumbsDown />
      </button>
      <button className='card_btn like' title='Like'>
        <BsHandThumbsUp />
      </button>
    </div>
  );
}

export default CardButtons;
