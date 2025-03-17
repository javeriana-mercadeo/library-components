'use client'

import { useEffect } from 'react'
import info from './info.json'
import './styles.scss'
import script from './script'

import logo from '../../../../assets/logos/logo-jave-v-blue-.svg'

const Splash = () => {
  useEffect(() => {
    script()
  }, [])

  return (
    <div id="splash">
      <div className="splash-content">
        <img className="logo" src={logo.src} />
      </div>
    </div>
  )
}

export default Splash
