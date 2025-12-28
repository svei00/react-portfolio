'use client'

import Loader from 'react-loaders'

// react-loaders' type definitions mark `active` as required even though the
// original untyped CRA usage never passed it (the component always rendered
// when mounted). `active` here just restores that same always-on behavior.
const PacmanLoader = () => <Loader type="pacman" active />

export default PacmanLoader
