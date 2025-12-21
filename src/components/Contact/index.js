import Loader from 'react-loaders';
import '../Contact/index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Helmet } from 'react-helmet';

const Contact = () => {
    const [letterClass, setLetterclass] = useState('text-animate');
    const refForm = useRef()

    useEffect(() => {
        setTimeout(() => {
            setLetterclass('text-animate-hover');
        }, 3000)

        return (() => {
            clearTimeout();
        })
    },[])

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'svei00',
                'template_f2vnjd2',
                refForm.current,
                'Ff-0XRmnMhpWt9tDR'
            )
            .then (
                () => {
                    alert('Message Successfully sent!!')
                    window.location.reload(false)
                },
                () => {
                    alert('Failed to send the message, please try again.')
                }
            )
    }

    return (
        <>
            <div className='container contact-page'>
                <Helmet>
                    <title>Contact | Ivan E. Villanueva</title>
                    <meta
                        name='description' content='Software Engineer in Inland Empire Area'
                    />
                    <meta 
                        name='keywords' content='Software Engineer, San Bernardino, Riverside, Rialto, Colton, Inland Empire, California'
                    />
                </Helmet>
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
                        opportunities especially ambitious or large projects. 
                        However, if you have other request or question, do not 
                        hesitate to contact me using below form either.
                    </p>
                    {/*<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />*/}
                    <div className='contact-form'>
                        <form ref={refForm} onSubmit={sendEmail}>
                           
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
                            
                        </form>
                    </div>
                </div>
                <div className='info-map'>
                    Iv&aacute;n E. Villanueva.
                    <br />
                    United States,
                    <br />
                    San Bernardino, CA.
                    <span>svei00@gmail.com</span>
                </div>
                <div className='map-wrap'>
                    <MapContainer center={[34.1083, -117.2898]} zoom={11}>
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        <Marker position={[34.1083, -117.2898]}>
                            <Popup>San Bernardino, CA</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <Loader type='pacman' />
        </>
    )
}

export default Contact;