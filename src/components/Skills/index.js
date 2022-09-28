import { useState, useEffect } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import MyCloud from '../CloudTag/Cloud';
import './index.scss';

const Skills = () => {

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        return () => {
            clearTimeout()
        }
    }, [])

    return (
        <>
        <div className='container skills-page'>
            <div className='text-zone'>
                <h1 className='page-title'>
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={'Skills & Experiencie'.split('')}
                        idx={15}
                    />
                </h1>
                <p>
                    Front-End development using technologies like <span className='boldText'>
                    HTML5, CSS3, JavaScript, TypeScript, React, SASS, TailwindCSS, Bootstrap
                    PHP, SQL, Firebase, Git</span>, etc. 
                </p>
                <p>
                    I'm a Software Engineer open to work in a full time position or as a Freelance.
                    I have experiencie in Fron-end Web development, mobile development with Android
                    and responsive web applications. 
                </p>
                <p>
                    Here's my <span className='boldText'><a className='links' 
                    href='https://www.linkedin.com/in/ivan-e-villanueva-26253157/'>
                    Linkedin</a></span> where you can see more details.  Also you can 
                    check-out my Resume <span className='boldText'><a className='links' href=''>
                    Here</a></span> or feel free visiting one of my blog posts.
                </p>
            </div>

            <div className='stage-cloud-container'>
                <MyCloud />
            </div>
        </div>
        <Loader type='pacman' />
        </>
    )

}

export default Skills;