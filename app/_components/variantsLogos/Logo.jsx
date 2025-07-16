'use client'
import { useEffect } from 'react'
import LiferayDevBanner from '@library/components/liferay_dev_banner'
import './variantsLogos.scss'
import script from './script.js'
import configData from './configuration.json'

const Logo = ({ children, width, height }) => {
  useEffect(() => {
    // Pass configuration to script
    const config = {
      width: width || configData.fieldSets[0].fields.find(f => f.name === 'width')?.defaultValue || 14,
      height: height || configData.fieldSets[0].fields.find(f => f.name === 'height')?.defaultValue || 12
    }
    script(config)
  }, [width, height])
 

  return (
    <>
      <LiferayDevBanner variant="info" icon="ph-info" className="mt-2 ">
        <p className="logo-explanation">
          <strong>Configuración recomendada para los LOGOS:</strong>
          <br />• Para logos <strong>cuadrados</strong>: <code>14%</code> de ancho y <code>12%</code> de alto.
          <br />• Para logos <strong>rectangulares</strong>: <code>30%</code> de ancho y <code>15%</code> de alto.
        </p>
      </LiferayDevBanner>
      <div className="logo-wrapper" id="logo-fragment">
        {children}
      </div>
    </>
  )
}

export default Logo
