'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TagCloud } from 'react-tagcloud'
import type { Tag } from 'react-tagcloud'
import AnimatedLetters from '@/components/animated-letters/animated-letters'
import PacmanLoader from '@/components/pacman-loader/pacman-loader'
import './skills.scss'

const SKILL_TAGS = [
  { value: 'jQuery', count: 25 },
  { value: 'SQL', count: 18 },
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'CSS3', count: 20 },
  { value: 'Webpack', count: 22 },
  { value: 'Babel.js', count: 7 },
  { value: 'ECMAScript', count: 25 },
  { value: 'Jest', count: 15 },
  { value: 'TailwindCSS', count: 17 },
  { value: 'React Native', count: 27 },
  { value: 'Bootstrap', count: 30 },
  { value: 'TypeScript', count: 15 },
  { value: 'PHP', count: 30 },
  { value: 'NPM', count: 11 },
  { value: 'Microsoft Excel', count: 48 },
]

const renderTag = (tag: Tag, size: number, color: string) => (
  <span
    key={tag.value}
    style={{
      animation: 'blinker 3s linear infinite',
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${size / 2}em`,
      border: `2px solid ${color}`,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: 'white',
    }}
  >
    {tag.value}
  </span>
)

const SkillsView = () => {
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
      <div className="container skills-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={'Skills & Experience'.split('')} idx={15} />
          </h1>
          <p>
            Front-End development using technologies like{' '}
            <span className="boldText">
              HTML5, CSS3, JavaScript, TypeScript, React, SASS, TailwindCSS, Bootstrap PHP, SQL, Firebase, Git
            </span>
            , etc.
          </p>
          <p>
            I&apos;m a Software Engineer open to work in a full time position or as a Freelance.
            I have experience in Front-end Web development, mobile development with Android
            and responsive web applications.
          </p>
          <p>
            Here&apos;s my{' '}
            <span className="boldText">
              <a
                className="links"
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/ivan-e-villanueva-26253157/"
              >
                Linkedin
              </a>
            </span>{' '}
            where you can see more details. Also you can check-out my Resume{' '}
            <span className="boldText">
              <Link className="links" href="/">
                Here
              </Link>
            </span>{' '}
            or feel free visiting one of my blog posts.
          </p>
        </div>

        <div className="cloud-cont">
          {/*
            react-tagcloud's function component relies on defaultProps for
            containerComponent/shuffle/className — React 19 dropped
            defaultProps support for function components, so those must be
            passed explicitly here or TagCloud crashes with "Element type
            is invalid" (Container ends up undefined).
          */}
          <TagCloud
            tags={SKILL_TAGS}
            minSize={1}
            maxSize={5}
            shuffle
            className="tag-cloud"
            renderer={renderTag}
            onClick={(tag: Tag) => alert(`'${tag.value}'!`)}
            // @types/react-tagcloud doesn't declare containerComponent even
            // though the installed package version supports (and requires,
            // post React-19) it — see the comment above.
            {...({ containerComponent: 'div' } as Record<string, unknown>)}
          />
        </div>
      </div>
      <PacmanLoader />
    </>
  )
}

export default SkillsView
