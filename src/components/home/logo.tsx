import logoESV from '../../assets/images/LogoExcelTrim.png'
import './logo.scss'

// The GSAP DrawSVG outline animation this component originally supported is
// permanently disabled in the CRA source (commented out, Svei's licensing
// caution — GSAP is free now, see handoff.md §4.4/§8.3, real motion work is
// Phase 3). The two <img> refs that fed that dead animation are dropped
// here since nothing reads them; the two logo images render unchanged.
const Logo = () => (
  <div className="logo-container">
    {/* eslint-disable-next-line @next/next/no-img-element -- converted to next/image in a later Phase 2 step */}
    <img className="solid-logo1" src={logoESV.src} alt="Excel SolutionsV" />
    {/* eslint-disable-next-line @next/next/no-img-element -- converted to next/image in a later Phase 2 step */}
    <img className="solid-logo2" src={logoESV.src} alt="Excel SolutionsV" />
  </div>
)

export default Logo
