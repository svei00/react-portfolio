import { useState, useEffect } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import { TagCloud } from 'react-tagcloud';


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

    // CloudTag
    const data = [
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
        { value: 'Microsoft Excel', count: 48}
      ]
      
      const customRenderer = (tag, size, color) => (
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

    // Render
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

            <div className='cloud-cont'>
            <TagCloud tags={data} minSize={1} maxSize={5} renderer={customRenderer}
            onClick={(tag) => alert(`'${tag.value}'!`)}
            />
            
            </div>
        </div>
        <Loader type='pacman' />
        </>
    )

}

export default Skills;