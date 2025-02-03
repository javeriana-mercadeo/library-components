import { Outlet } from 'react-router-dom'

import NavMenu from '../components/NavbarMenu/NavbarMenu.jsx'
import Footer from '../components/footer/Footer.jsx'

const General = () => {
  return (
    <>
      <NavMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default General
