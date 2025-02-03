import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import GeneralContext from './models/context/GeneralContext.jsx'
import Routes from './routes/Routes.jsx'

// Estilos con Tailwind CSS
import './ui/styles/_tailwind.css'
// Estilos del código con Highlighting
import 'prismjs/themes/prism-tomorrow.css'
// Estilos generales Styles
import './ui/styles/global.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GeneralContext>
        <Routes />
      </GeneralContext>
    </BrowserRouter>
  </StrictMode>
)
