import React from 'react'
import {BsHandThumbsUp, BsHandThumbsDown} from 'react-icons/bs'


function CardButtons() {
  return (
    <div className='card_buttons'>
      <button className='card_btn dislike'><BsHandThumbsDown/></button>
      <button className='card_btn like'><BsHandThumbsUp/></button>
    </div>
  )
}

export default CardButtons