'use client'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Leaflet's default marker icon resolves its image URLs relative to the
// CSS file location, which breaks under any bundler (the icon silently
// fails to render — "iconUrl not set in Icon options"). Importing the
// PNGs as JS modules straight from node_modules didn't resolve correctly
// under Next's static-image pipeline either, so the three default marker
// images are copied into public/leaflet/ (see notes.md) and referenced
// by plain path instead — the standard workaround for this well-known
// Leaflet + bundler issue. Runs once at module load — safe because this
// whole file only ever loads client-side (see the dynamic import in
// contact-view.tsx with ssr: false).
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
})

// Neutral central-Inland-Empire point near Ontario, CA — not a home
// address (see notes.md for why: Svei no longer lives in San Bernardino,
// and the original site exposed his exact home coordinates, handoff.md
// finding S4).
const MAP_CENTER: [number, number] = [34.0633, -117.6509]

const ContactMap = () => (
  <MapContainer center={MAP_CENTER} zoom={9}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={MAP_CENTER}>
      <Popup>Open to remote &amp; Southern California</Popup>
    </Marker>
  </MapContainer>
)

export default ContactMap
