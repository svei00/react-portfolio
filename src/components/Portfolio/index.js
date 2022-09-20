import React, { useState } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss'

const Portfolio = () => {

    const [letterClass, setLetterClass] = useState('text-animate');
    
    return (
        <>
            <div className='container portfolio-page'>
                <h1 className='page-title'>
                    <AnimatedLetters 
                        letterClass={letterClass}
                        strArray={'Portfolio'.split('')}
                        idx={15}                            // Remember that 15 means 1.5 and it is the delay from starting loading the page
                    />
                </h1>
            </div>
            <Loader type='pacman' />
        </>
    );
}

export default Portfolio;