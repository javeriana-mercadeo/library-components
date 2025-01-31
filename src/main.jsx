import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import GeneralContext from './models/context/GeneralContext.jsx'
import Routes from './routes/Routes.jsx'

// Tailwind CSS
import './ui/styles/_tailwind.css'
// Code Highlighting
import 'prismjs/themes/prism-tomorrow.css'

// General Styles
/* import './ui/styles/_main.scss' */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GeneralContext>
        <div className="text-foreground bg-background">
          <Routes />
        </div>
      </GeneralContext>
    </BrowserRouter>
  </StrictMode>
)
