'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedLetters from '@/components/animated-letters/animated-letters'
import PacmanLoader from '@/components/pacman-loader/pacman-loader'
import Logo from './logo'
import logoI from '../../assets/images/3D-Letter-I.png'
import logoE from '../../assets/images/3D-Letter-E.png'
import logoV from '../../assets/images/3D-Letter-V.png'
import './home.scss'

const NAME_I = ['v', 'á', 'n', ' ']
const NAME_E = ['.']
const NAME_V = ['i', 'l', 'l', 'a', 'n', 'u', 'e', 'v', 'a', '.']
const JOB_TITLE = ['W', 'e', 'b', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.']

const HomeView = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _10`}>i</span>
            <span className={`${letterClass} _11`}>,</span>
            <br />
            <span className={`${letterClass} _12`}>I</span>
            <span className={`${letterClass} _13`}>&apos;</span>
            <span className={`${letterClass} _14`}>m</span>

            <Image src={logoI} className="i" alt="" priority />
            <AnimatedLetters letterClass={letterClass} strArray={NAME_I} idx={15} />

            <Image src={logoE} className="e" alt="" priority />
            <AnimatedLetters letterClass={letterClass} strArray={NAME_E} idx={18} />

            <Image src={logoV} className="v" alt="" priority />
            <AnimatedLetters letterClass={letterClass} strArray={NAME_V} idx={19} />

            <br />
            <AnimatedLetters letterClass={letterClass} strArray={JOB_TITLE} idx={29} />
          </h1>
          <h2>FullStack Developer / Software Developer Engineer</h2>
          <Link href="/contact" className="flat-button">
            Contact Me
          </Link>
        </div>
        <Logo />
      </div>
      <PacmanLoader />
    </>
  )
}

export default HomeView
