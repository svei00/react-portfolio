import Image from 'next/image'
import logoESV from '../../assets/images/LogoExcelTrim.png'
import './logo.scss'

// The GSAP DrawSVG outline animation this component originally supported is
// permanently disabled in the CRA source (commented out, Svei's licensing
// caution — GSAP is free now, see handoff.md §4.4/§8.3, real motion work is
// Phase 3). The two <img> refs that fed that dead animation are dropped
// here since nothing reads them; the two logo images render unchanged.
// `fill` fits logo.scss's existing `position: absolute; width: 100%`
// layout for .solid-logo1/.solid-logo2 exactly — logo-container is their
// sized, positioned ancestor.
const Logo = () => (
  <div className="logo-container">
    <Image className="solid-logo1" src={logoESV} alt="Excel SolutionsV" fill sizes="600px" />
    <Image className="solid-logo2" src={logoESV} alt="Excel SolutionsV" fill sizes="600px" />
  </div>
)

export default Logo
