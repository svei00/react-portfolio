'use client'

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3, faGitAlt, faHtml5, faJsSquare, faNode, faReact } from '@fortawesome/free-brands-svg-icons'
import AnimatedLetters from '@/components/animated-letters/animated-letters'
import PacmanLoader from '@/components/pacman-loader/pacman-loader'
import './about.scss'

const TITLE_LETTERS = ['A', 'b', 'o', 'u', 't', ' ', 'M', 'e']

const AboutView = () => {
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
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={TITLE_LETTERS} idx={15} />
          </h1>
          <p>
            I&apos;m a hardworking and ambitious person who is looking for a job
            where I can apply my skills fully in an IT company and
            work with the latest technologies on challenging projects.
          </p>
          <p>
            I&apos;m a confident person with strong problem-solving skills
            who can learn any new technology easily.
          </p>
          <p>
            I&apos;m a tech obsessed person who also enjoys the outdoors, I like to
            take a walk through the woods, share time with my daughter, son
            and wife. We love to travel.
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faNode} color="#339933" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28 " />
            </div>
          </div>
        </div>
      </div>
      <PacmanLoader />
    </>
  )
}

export default AboutView
