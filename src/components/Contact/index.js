import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useState } from 'react';

const Contact = () => {
    const [letterClass, setLetterclass] = useState('text-animate');

    useEffect(() => {
        setTimeout(() => {
            setLetterclass('text-animate-hover');
        }, 3000)

        return (() => {
            clearTimeout();
        })
    },[])

    return (
        <>
            <div className='container contact-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={['C','o','n','t','a','c','t',' ','m','e']}
                            idx={15}
                        />
                    </h1>
                    <p>
                        I'm interested in a full time job position job or freelance 
                        opportunities - especially ambitious or large projects. 
                        However, if you have other request or question, do not 
                        hesitate to contact me using below form either.
                    </p>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <div className='contact-form'>
                        <form>
                            <ul>
                                <li className='half'>
                                    <input
                                    type='text'
                                    name='name'
                                    placeholder='Name'
                                    required
                                    />
                                </li>
                                <li className='half'>
                                    <input
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    required
                                    />
                                </li>
                                <li>
                                    <input
                                    type='text'
                                    name='subject'
                                    placeholder='Subject'
                                    required
                                    />
                                </li>
                                <li>
                                    <textarea
                                    name='message'
                                    placeholder='Message'
                                    required
                                    >       
                                    </textarea>
                                </li>
                                <li>
                                <input
                                    type='submit'
                                    className='flat-button'
                                    value='Send'
                                />
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
            <Loader type='pacman' />
        </>
    )
}

export default Contact;