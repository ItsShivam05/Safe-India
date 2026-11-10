import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/noto-sans-devanagari'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)

// Keeps the guides, helplines and tools working without signal after the first visit.
// New versions take over on the next page load, so a correction reaches people quickly.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // The site still works online without it
    })
  })
}
