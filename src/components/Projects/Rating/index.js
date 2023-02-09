import React from 'react'
import './index.scss';
import stars from './scripts';

const Rating = () => {
  return (
    <div className='rating-body'>
        <h1>5 Star Rating</h1>
        <div className="star_rating">
            <p>How was your experiencie?</p>
            <button className="star">&#9734;</button>
            <button className="star">&#9734;</button>
            <button className="star">&#9734;</button>
            <button className="star">&#9734;</button>
            <button className="star">&#9734;</button>
            <p className='current_rating'>0 of 5</p>
        </div>
    </div>
  )
}

stars();

export default Rating