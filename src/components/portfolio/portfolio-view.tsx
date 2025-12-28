'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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

const FALLBACK_IMAGE = '/path/to/fallback-image.png'

const PortfolioView = ({ projects }: PortfolioViewProps) => {
  const [letterClass, setLetterClass] = useState('text-animate')
  // Same fallback-on-error behavior as the original onError handler, just
  // expressed as state since next/image doesn't allow mutating its src
  // directly in an onError callback the way a plain <img> does.
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

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
                <Image
                  src={failedImages.has(project.image) ? FALLBACK_IMAGE : project.image}
                  className="portfolio-image"
                  alt={project.name || 'portfolio'}
                  fill
                  sizes="(max-width: 1200px) 50vw, 25vw"
                  onError={() => setFailedImages((prev) => new Set(prev).add(project.image))}
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
