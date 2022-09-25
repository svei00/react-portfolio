import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import LogoExW from '../../assets/images/LogoExcelWindow.png';
import logoIEVSsub from '../../assets/images/IvanEVillanueva.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faEnvelope, faHome, faLaptopCode, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

const Sidebar = () => {
    
    const [showNav, setShowNav] = useState(false);

    return (
    <div className='nav-bar'>
            <Link className='logo' to='/'>
                <img src={LogoExW} alt='logo'/>
                <img className='sub-logo' src={logoIEVSsub} alt="Time has come to... S v e í" />
            </Link>

            <nav className={showNav ? 'mobile-show' : ''}>
                <NavLink exact="true" activeclassname="active" to='/' >
                    <FontAwesomeIcon icon={faHome} color='#4d4d4e' />    
                </NavLink>
                <NavLink exact="true" activeclassname="active" className='about-link' to='/about' >
                    <FontAwesomeIcon icon={faUser} color='#4d4d4e' />    
                </NavLink>
                <NavLink exact="true" activeclassname="active" className='portfolio-link' to='/portfolio' >
                    <FontAwesomeIcon icon={faSuitcase} color='#4d4d4e' />    
                </NavLink>
                <NavLink exact="true" activeclassname="active" className="skills-link" to='/skills'>
                    <FontAwesomeIcon icon={faLaptopCode} color='#4d4d4e'/>
                </NavLink>
                <NavLink exact="true" activeclassname="active" className='contact-link' to='/contact' >
                    <FontAwesomeIcon icon={faEnvelope} color='#4d4d4e' />    
                </NavLink>
                <FontAwesomeIcon
                    onClick={() => setShowNav(false)}
                    icon={faClose}
                    color='#599DFB'
                    size='3x'
                    className='close-icon'
                />
            </nav>

            <ul>
                <li>
                    <a
                    target='_blnak'
                    rel='noreferrer'
                    href='https://www.linkedin.com/in/ivan-e-villanueva-26253157/'
                    >
                        <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />

                    </a>
                </li>
                <li>
                    <a
                    target='_blnak'
                    rel='noreferrer'
                    href='https://github.com/svei00/'
                    >
                        <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />

                    </a>
                </li>
                <li>
                    <a
                    target='_blnak'
                    rel='noreferrer'
                    href='https://www.youtube.com/channel/UCbxQit2ZC4U1eUwdZVQkhwg'
                    >
                        <FontAwesomeIcon icon={faYoutube} color="#4d4d4e" />

                    </a>
                </li>
                <li>
                    <a
                    target='_blnak'
                    rel='noreferrer'
                    href='https://twitter.com/svei00'
                    >
                        <FontAwesomeIcon icon={faTwitter} color="#4d4d4e" />

                    </a>
                </li>            
            </ul>
            <FontAwesomeIcon 
                onClick={() => setShowNav(true)}
                icon={faBars}
                color= '#00993F'
                size='3x'
                className='hamburger-icon'
            />
    </div>
    )
}

export default Sidebar;