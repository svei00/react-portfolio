import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { /* faAngular,*/ faCss3, faGitAlt, faHtml5, faJsSquare, faNode, faReact } from '@fortawesome/free-brands-svg-icons';
import Loader from 'react-loaders';
import { Helmet } from 'react-helmet';

const About = () => {

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        return () => {
            clearTimeout();
        }
    }, []);

    return (
        <>
        <div className='container about-page'>
            <Helmet>
                <title>About Me | Ivan E. Villanueva</title>
                <meta 
                    name='description'
                    content='Ivan E. Villanueva Fullstack developer in San Bernardino California'
                />
            </Helmet>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters 
                        letterClass={letterClass}
                        strArray={['A', 'b', 'o','u','t', ' ','M','e']}
                        idx={15}                                            // It means 1.5 seconds
                    />
                </h1>
                <p>
                    I'm a hardworking and ambitious person who is looking for a job
                    where I can explode all my qualifications in a IT company and 
                    work with the latest technologies on challenging projects. 
                </p>
                <p>
                    I'm a confident with my knoledge and problem solving person
                    also I can learn easily any new technologie.
                </p>
                <p>
                    I'm a tech obsessed person who enjoys the enviroment I like to 
                    take a walk through the woods, share time with my daughter, son 
                    and wife. We love to travel.
                </p>
            </div>

            <div className='stage-cube-cont'>
                <div className='cubespinner'>
                    <div className='face1'>
                        <FontAwesomeIcon icon={faNode} color='#339933' />
                        {/*<FontAwesomeIcon icon={faAngular} color='#DD0031' />*/}
                    </div>
                    <div className='face2'>
                        <FontAwesomeIcon icon={faHtml5} color='#F06529' />
                    </div>
                    <div className='face3'>
                        <FontAwesomeIcon icon={faCss3} color='#28A4D9' />
                    </div>
                    <div className='face4'>
                        <FontAwesomeIcon icon={faJsSquare} color='#EFD81D' />
                    </div>
                    <div className='face5'>
                        <FontAwesomeIcon icon={faReact} color='#5ED4F4' />
                    </div>
                    <div className='face6'>
                        <FontAwesomeIcon icon={faGitAlt} color='#EC4D28 ' />
                    </div>
                </div>
            </div>


        </div>
        <Loader type='pacman' />
        </>
    )
}

export default About;