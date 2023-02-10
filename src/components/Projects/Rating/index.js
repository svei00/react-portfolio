import React from 'react'
import './index.scss';
// import stars from './scripts';

const Rating = () => {

 // Function
 const allStars = document.querySelectorAll('.star');
 let current_rating = document.querySelector('.current_rating');

    // console.log(allStars);                   // Test to check if the function works

    allStars.forEach( (star, i) => {
        star.onclick = function() {
            // console.log(star);               // Test
            // console.log(i + 1);              // Test
            let current_star_level = i + 1;
            current_rating.innerText = `${current_star_level} of 5`;
            // console.log(current_star_level); // Test

            allStars.forEach( (star, j) => {
                // console.log(j + 1);          // Test
                if (current_star_level >= j + 1) {
                    star.innerHTML = '&#9733';
                } else {
                    star.innerHTML = '&#9734';
                }
            });
        }
    })


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
            <p className='current_rating'>1 of 5</p>
        </div>
    </div>
  )
}

// stars();

export default Rating