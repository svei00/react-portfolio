import { useEffect } from 'react';
import { useState } from 'react';
import AnimatedLetters from '../AnimatedLetters';
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
                <h1>
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={'Skills & Experiencie'.split('')}
                        idx={15}
                    />
                </h1>
            </div>
        </div>
        </>
    )

}

export default Skills;