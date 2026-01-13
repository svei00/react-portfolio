import ContactForm from './contact-form'
import styles from './contact.module.scss'

// Contact rewrite (phase-3-plan.md §3.6): retires AnimatedLetters and
// PacmanLoader — both are now gone from every page, closing the last two
// items on handoff.md's Phase 3 "must not survive" list. The hardened
// form logic (route handler, honeypot, throttle, real <label>s, inline
// status — all built in Phase 2) is untouched here; this sub-phase is
// presentation only for the form.
//
// The map is retired outright rather than restyled, per
// phase-3-plan.md §3.6's recommendation: after the Phase 2 fix that
// stripped the exact street address (handoff.md finding S4), a
// city-level Leaflet map communicated nothing a typeset location line
// doesn't already say, at the cost of a real dependency (leaflet +
// react-leaflet + three marker image assets + a CSP img-src allowance
// for OpenStreetMap tiles). All four are removed in this sub-phase — see
// notes.md for the exact cleanup. If Svei wants the map back, this is a
// reversible presentation decision, not a data-loss one.
const ContactView = () => (
  <div className={styles.contactPage}>
    <div className={styles.intro}>
      <h1 className={styles.heading}>Contact</h1>
      <p>
        I&apos;m interested in full-time positions or freelance opportunities, especially
        ambitious or large projects. If you have a different request or question, use the form
        below.
      </p>
    </div>

    <div className={styles.layout}>
      <ContactForm />

      <div className={styles.locationInfo}>
        <p className={styles.locationName}>Ivan E. Villanueva</p>
        <p className={styles.locationCity}>Inland Empire, California</p>
        <a href="mailto:svei00@gmail.com" className={styles.locationEmail}>
          svei00@gmail.com
        </a>
      </div>
    </div>
  </div>
)

export default ContactView
