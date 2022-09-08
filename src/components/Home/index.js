import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoTitle from '../../assets/images/LogoExcelv2_1850x650.png'
import AnimatedLetters from '../AnimatedLetters';
import './index.scss'

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const nameArray = ['I', 'v', '\u00E1', 'n',' ','E','.', ' ', 'V','i','l','l','a','n','u','e','v','a','.']; // \u00E1 is the univode representation of á
    const jobArray = ['W','e','b',' ','D','e','v','e','l','o','p','e','r','.'];

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    return (
        <>
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                    <span className={letterClass}>H</span>
                    <span className={`${letterClass} _11`}>i,</span>                    {/*//Was Hi, */}                    
                    <br />
                    <span className={`${letterClass} _12`}>I</span>
                    <span className={`${letterClass} _13`}>'</span>
                    <span className={`${letterClass} _14`}>m</span>                     {/*//Was I'm */}
                    <img src={logoTitle} alt='developer' />
                    <AnimatedLetters letterClass={letterClass}                          // Was. Iv&aacute;n E. Villanueva
                    strArray = {nameArray}
                    idx = {15} />
                    <br />
                    <AnimatedLetters letterClass={letterClass}                          
                    strArray = {jobArray}
                    idx = {34} />                                                       {/* // It is 34 following the end of the index on nameArray */}
                </h1>
                <h2>FullStack Developer / Software Developer Engineer</h2>
                <Link to='/contact' className='flat-button'>Contact Me</Link>
            </div>
        </div>
        </>
    )
}

export default Home;