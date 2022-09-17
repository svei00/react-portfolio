import './index.scss';
import AnimatedLetters from '../AnimatedLetters';

const About = () => {
    return (
        <div className='container about-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters 
                        strArray={['A', 'b', 'o','u','t', ' ','M','e']}
                        idx={15}                                            // It means 1.5 seconds
                    />
                </h1>
                <p>
                    I'm a hardworking and ambitious person who is looking for a job
                    where I can explode all my qualifications in a IT company and 
                    work with the latest technologies on challenging projects. 
                </p>
                <p>
                    I'm a confident with my knoledge and problem solving person
                    also I can learn easily any new technologie.
                </p>
                <p>
                    I'm a tech obsessed person who enjoys the enviroment I like to 
                    take a walk through the woods, share time with my daughter, son 
                    and wife. We love to travel.
                </p>
            </div>
        </div>
    )
}

export default About;