import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import LogoExW from '../../assets/images/LogoExcelWindow.png';
import logoIEVSsub from '../../assets/images/IvanEVillanueva.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => (
   <div className='nav-bar'>
        <Link className='logo' to='/'>
            <img src={LogoExW} alt='logo'/>
            <img className='sub-logo' src={logoIEVSsub} alt="Time has come to... S v e í" />
        </Link>

        <nav>
            <NavLink exact="true" activeclassname="active" to='/' >
                <FontAwesomeIcon icon={faHome} color='#4d4d4e' />    
            </NavLink>
            <NavLink exact="true" activeclassname="active" className='about-link' to='/about' >
                <FontAwesomeIcon icon={faUser} color='#4d4d4e' />    
            </NavLink>
            <NavLink exact="true" activeclassname="active" className='contact-link' to='/contact' >
                <FontAwesomeIcon icon={faEnvelope} color='#4d4d4e' />    
            </NavLink>
            <NavLink exact="true" activeclassname="active" className='portfolio-link' to='/portfolio' >
                <FontAwesomeIcon icon={faSuitcase} color='#4d4d4e' />    
            </NavLink>

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
   </div>

)

export default Sidebar