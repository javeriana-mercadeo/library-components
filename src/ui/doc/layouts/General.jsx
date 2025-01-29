import { Outlet } from 'react-router-dom'

import NavMenu from '../partials/NavMenu/NavMenu.jsx'

const General = () => {
  return (
    <>
      <NavMenu />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </>
  )
}

export default General
