import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/jost'
import '@fontsource-variable/newsreader/opsz.css'
import './styles/global.css'
import App from './App.tsx'

// Cada visita empieza arriba: el hero está pensado para verse desde el principio
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
