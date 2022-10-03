import React, { useEffect, useRef, useState } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import windowLogo from '../../assets/images/LogoExcelWindow.png'
// import portfolioData from '../../data/portfolio.json'; // Staticdata
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';


const Portfolio = () => {

    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);                 // To update the array
    const dashboard = useRef('./dashboard')

    useEffect (() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    })

    // Retriving data from Firebase
    useEffect (() => {
      getPortfolio();  
    }, []);

    // Get data from the server
    const getPortfolio = async () => {
        const querySnapshot = await getDocs(collection(db, 'portfolio')); // Name of the collection in Firebase.
        console.log(querySnapshot); // Verify if we can retrieve data fron server
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()));                        
    };

    console.log(portfolio); // Test 

    const renderPortfolio = (portfolio) => {
        return (
            <div className='images-container'>
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className='image-box' key={idx}>
                                <img 
                                    src={port.image}            // Was cover in mock
                                    classname="portfolio-image"
                                    alt="portfolio"
                                />
                                <div className='content'>
                                    <p className='title'>{port.name}</p> {/* // Was title in mock data*/}
                                    <h4 className='description'>{port.description}</h4>
                                    <button
                                        className='btn'
                                        onClick={() => window.open(port.url)}
                                    >View</button>
                                </div>
                            </div>
                        )
                    })
                }
                <Link to='/dashboard'>
                    <img className='loginDashboard' ref={dashboard} src={windowLogo} alt='Excel SolutionsV' />
                </Link>
            </div>
        );
    } 
    
    return (
        <>
            <div className='container portfolio-page'>
                <h1 className='page-title'>
                    <AnimatedLetters 
                        letterClass={letterClass}
                        strArray={'Portfolio'.split('')}
                        idx={15}                                                // Remember that 15 means 1.5 and it is the delay from starting loading the page
                    />
                </h1>
                <div>
                    {renderPortfolio(portfolio)}                     {/* We use this (portfolioData) mock since we don't have a real databasa */}
                </div>
            </div>
            <Loader type='pacman' />
        </>
    );
}

export default Portfolio;