import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../src/assets/scss/main.scss'
import App from './App.jsx'

if (typeof window !== "undefined") {
  const { worker } = await import("./api/browser.js");
  worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js"   // required for GitHub Pages!
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
