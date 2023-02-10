import React, { useState } from 'react';
import './index.scss';
// import stars from './scripts';

const Star = ({
    selected = false, 
    onClick = f => f
}) => (
    <span className='star' onClick={onClick}>
        {selected ? '★' : '☆'}
    </span>
);

const Rating = ({totalStars=5}) => {

  const [starsSelected, selectStar] = useState(0);

  return (
    // Pure HTML Code
    /*
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
    */

    <div className='rating-body'>
        <h1>5 Star Rating</h1>
        <div className='star_rating'>
            <p>How was your Experience?</p>
            {[...Array(totalStars)].map((n, i) =>
                <Star 
                    key={i}
                    selected={i < starsSelected}
                    onClick={() => selectStar(i + 1)}
                />
            )}
            <p >{starsSelected} of {totalStars} stars</p>
        </div>
    </div>
  );
};

// stars();

export default Rating