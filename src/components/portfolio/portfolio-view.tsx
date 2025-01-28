'use client'

import { useEffect, useState } from 'react'
import AnimatedLetters from '@/components/animated-letters/animated-letters'
import PacmanLoader from '@/components/pacman-loader/pacman-loader'
import type { Project } from '@/types/project'
import './portfolio.scss'

type PortfolioViewProps = {
  projects: Project[]
}

const handleViewButtonClick = (url: string) => {
  window.open(url, '_blank')
}

const PortfolioView = ({ projects }: PortfolioViewProps) => {
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
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters letterClass={letterClass} strArray={'Portfolio'.split('')} idx={15} />
        </h1>
        <div>
          <div className="images-container">
            {projects.map((project) => (
              <div className="image-box" key={project.name}>
                {/* eslint-disable-next-line @next/next/no-img-element -- converted to next/image in a later Phase 2 step */}
                <img
                  src={project.image}
                  className="portfolio-image"
                  alt={project.name || 'portfolio'}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/path/to/fallback-image.png'
                  }}
                />
                <div className="content">
                  <p className="title">{project.name}</p>
                  <h4 className="description">{project.description}</h4>
                  <button className="btn" onClick={() => handleViewButtonClick(project.url)}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PacmanLoader />
    </>
  )
}

export default PortfolioView
