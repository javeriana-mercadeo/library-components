import { useEffect } from 'react'
import './varRectangle.scss'

const Logo = ({ children }) => {
  useEffect(() => {
    import('./script.js')
  }, [])

  return (
    <div className="logo-wrapper" id="logo-fragment">
      {children}
    </div>
  )
}

export default Logo
