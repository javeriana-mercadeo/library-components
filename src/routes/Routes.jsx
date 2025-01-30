import { Routes as RoutesReact, Route } from 'react-router-dom'

import General from '../ui/doc/layouts/General.jsx'
import Home from '../ui/doc/views/home/Home.jsx'

const Routes = () => {
  return (
    <RoutesReact>
      <Route path="/" element={<General />}>
        <Route index element={<Home />} />
      </Route>
    </RoutesReact>
  )
}

export default Routes
