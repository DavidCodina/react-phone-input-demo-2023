import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import type {} from 'styled-components/cssprop'

import 'styles/main.scss'
import App from './App'

/* ========================================================================
                           
======================================================================== */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>
)
