import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoI from '../../assets/images/3D-Letter-I.png'
import logoE from '../../assets/images/3D-Letter-E.png'
import logoV from '../../assets/images/3D-Letter-V.png'
import AnimatedLetters from '../AnimatedLetters';
import './index.scss'
import Logo from './Logo';
import Loader from 'react-loaders';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const nameArrayI = ['v', '\u00E1', 'n',' ']; // \u00E1 is the univode representation of á
    const nameArrayE = ['.']
    const nameArrayV = ['i','l','l','a','n','u','e','v','a','.']
    const jobArray = ['W','e','b',' ','D','e','v','e','l','o','p','e','r','.'];

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)

        // it is a good idea to clean up the timeOut
        return () => {
            clearTimeout();
        }

    }, [])

    return (
        <>
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                    <span className={letterClass}>H</span>
                    <span className={`${letterClass} _10`}>i</span>                    {/*//Was Hi, */}                    
                    <span className={`${letterClass} _11`}>,</span> 
                    <br />
                    <span className={`${letterClass} _12`}>I</span>
                    <span className={`${letterClass} _13`}>'</span>
                    <span className={`${letterClass} _14`}>m</span>                     {/*//Was I'm */}
                    
                    <img src={logoI} className='i' alt='developer' />
                    <AnimatedLetters letterClass={letterClass}                          // Was. Iv&aacute;n E. Villanueva
                    strArray = {nameArrayI}
                    idx = {15} />

                    <img src={logoE} className='e' alt='developer' />
                    <AnimatedLetters letterClass={letterClass}                          
                    strArray = {nameArrayE}
                    idx = {18} />

                    <img src={logoV} className='v' alt='developer' />
                    <AnimatedLetters letterClass={letterClass}                          
                    strArray = {nameArrayV}
                    idx = {19} />


                    <br />
                    <AnimatedLetters letterClass={letterClass}                          
                    strArray = {jobArray}
                    idx = {29} />                                                       {/* // It is 34 following the end of the index on nameArray */}
                </h1>
                <h2>FullStack Developer / Software Developer Engineer</h2>
                <Link to='/contact' className='flat-button'>Contact Me</Link>
            </div>
            <Logo />
        </div>
        <Loader type='pacman' />
        </>
    )
}

export default Home;