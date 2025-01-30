import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import GeneralContext from './models/context/GeneralContext.jsx'
import Routes from './routes/Routes.jsx'
import './ui/styles/_main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GeneralContext>
        <Routes />
      </GeneralContext>
    </BrowserRouter>
  </StrictMode>
)
