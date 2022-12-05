import React from 'react'

import CardCarousel from './CardCarousel'
import CardButtons from './CardButtons'

function UserCard() {
  return (
    <div className='card'>
      <CardCarousel/>
      <h2 className="card_name">Test</h2>
      <CardButtons/>
    </div>
  )
}

export default UserCard