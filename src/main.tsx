import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'
import { I18nProvider } from './i18n'

const container = document.getElementById('root')!
createRoot(container).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
)
