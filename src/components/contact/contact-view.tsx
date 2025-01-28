'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import AnimatedLetters from '@/components/animated-letters/animated-letters'
import PacmanLoader from '@/components/pacman-loader/pacman-loader'
import ContactForm from './contact-form'
import './contact.scss'

// The map uses browser-only Leaflet APIs and must never run during server
// rendering — dynamic() with ssr:false can only be called from a Client
// Component, which is why this lives here rather than in the server
// app/contact/page.tsx.
const ContactMap = dynamic(() => import('./contact-map'), { ssr: false })

const ContactView = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I&apos;m interested in a full time job position job or freelance
            opportunities especially ambitious or large projects.
            However, if you have other request or question, do not
            hesitate to contact me using below form either.
          </p>
          <ContactForm />
        </div>
        <div className="info-map">
          Iv&aacute;n E. Villanueva.
          <br />
          United States,
          <br />
          Southern California.
          <span>svei00@gmail.com</span>
        </div>
        <div className="map-wrap">
          <ContactMap />
        </div>
      </div>
      <PacmanLoader />
    </>
  )
}

export default ContactView
