import { useEffect } from 'react'
import LiferayDevBanner from '@library/components/liferay_dev_banner'
import './variantsLogos.scss'

const Logo = ({ children }) => {
  useEffect(() => {
    import('./script.js')
  }, [])

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
