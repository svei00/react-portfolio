'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faClose,
  faEnvelope,
  faHome,
  faLaptopCode,
  faSuitcase,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import LogoExW from '../../assets/images/LogoExcelWindow.png'
import logoIEVSsub from '../../assets/images/IvanEVillanueva.png'
import './sidebar.scss'

// The original CRA site used react-router-dom's `activeclassname` prop to
// highlight the current page's icon, but that prop was removed from
// react-router-dom's NavLink API in v6 — it was silently doing nothing,
// so the intended green active-icon highlight never actually rendered.
// usePathname() below is what actually makes it work.
const NAV_LINKS = [
  { href: '/', icon: faHome, label: 'Home' },
  { href: '/about', icon: faUser, label: 'About', linkClass: 'about-link' },
  { href: '/portfolio', icon: faSuitcase, label: 'Portfolio', linkClass: 'portfolio-link' },
  { href: '/skills', icon: faLaptopCode, label: 'Skills', linkClass: 'skills-link' },
  { href: '/contact', icon: faEnvelope, label: 'Contact', linkClass: 'contact-link' },
]

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/ivan-e-villanueva-26253157/', icon: faLinkedin, label: 'LinkedIn' },
  { href: 'https://github.com/svei00/', icon: faGithub, label: 'GitHub' },
  { href: 'https://www.youtube.com/channel/UCbxQit2ZC4U1eUwdZVQkhwg', icon: faYoutube, label: 'YouTube' },
  { href: 'https://twitter.com/svei00', icon: faTwitter, label: 'Twitter' },
]

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false)
  const pathname = usePathname()

  return (
    <div className="nav-bar">
      <Link className="logo" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element -- converted to next/image in a later Phase 2 step */}
        <img src={LogoExW.src} alt="logo" />
        {/* eslint-disable-next-line @next/next/no-img-element -- converted to next/image in a later Phase 2 step */}
        <img className="sub-logo" src={logoIEVSsub.src} alt="Time has come to... S v e í" />
      </Link>

      <nav className={showNav ? 'mobile-show' : ''}>
        {NAV_LINKS.map(({ href, icon, label, linkClass }) => (
          <Link
            key={href}
            href={href}
            className={[linkClass, pathname === href ? 'active' : ''].filter(Boolean).join(' ')}
            onClick={() => setShowNav(false)}
            aria-label={label}
          >
            <FontAwesomeIcon icon={icon} color="#4d4d4e" />
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setShowNav(false)}
          className="close-icon"
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faClose} color="#599DFB" size="3x" />
        </button>
      </nav>

      <ul>
        {SOCIAL_LINKS.map(({ href, icon, label }) => (
          <li key={href}>
            <a target="_blank" rel="noreferrer" href={href} aria-label={label}>
              <FontAwesomeIcon icon={icon} color="#4d4d4e" />
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setShowNav(true)}
        className="hamburger-icon"
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faBars} color="#00993F" size="3x" />
      </button>
    </div>
  )
}

export default Sidebar
