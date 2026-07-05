import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Intro from './components/Intro'
import Gallery from './components/Gallery'
import Description from './components/Description'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Guarantee from './components/Guarantee'
import Faq from './components/Faq'
import Testimonials from './components/Testimonials'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Booking from './pages/Booking'
import { useI18n } from './i18n'

const Home = ({closePrompt}: {closePrompt: () => void }) => (
  <main>
    <Navbar />
    <Intro />
      <Description />
    <Gallery />
    <Pricing closePrompt={closePrompt}/>
  <Guarantee />
  <Contact />
  <Faq />
  <Testimonials />
  <Footer />
  </main>
)

const AppRoutes = ({closePrompt}: {closePrompt: () => void }) => {
  const location = useLocation()
  const { locale, setLocale } = useI18n()

  useEffect(() => {
    const pathLocale = location.pathname.startsWith('/en') ? 'en' : 'cs'
    if (locale !== pathLocale) setLocale(pathLocale)
  }, [location.pathname, locale, setLocale])

  return (
    <div className="min-h-screen bg-sand-50 text-ink">
      <Routes>
        <Route path="/booking" element={<Booking />} />
        <Route path="/en/booking" element={<Booking />} />
        <Route path="/en" element={<Home closePrompt={closePrompt} />} />
        <Route path="/" element={<Home closePrompt={closePrompt} />} />
      </Routes>
    </div>
  )
}

const App: React.FC = () => {
    const { t } = useI18n()
  const [showPrompt, setShowPrompt] = useState<boolean>(false)


  useEffect(() => {
    let timer: number | undefined

      timer = window.setTimeout(() => setShowPrompt(true), 15000)

    return () => {
      if (timer !== undefined) clearTimeout(timer)
    }
  }, [])


  return (
    <BrowserRouter>
      <AppRoutes closePrompt={() =>setShowPrompt(false)} />

      {showPrompt && (
          <div className="fixed bottom-6 right-4 md:right-20 z-50 bg-olive-600 shadow-md rounded-xl p-4 flex items-start gap-4 max-w-xs">
          <div className="flex-1 space-y-2">
            <div className="font-semibold text-white ">{t('app.prompt.question')}</div>
            <div className="text-sm text-gray-200">{t('app.prompt.subtitle')}</div>
            <button
              type="button"
              onClick={() =>{ document.getElementById('calendar')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
              })
                  setShowPrompt(false)
              }}
              className=" inline-flex items-center text-sm justify-center shrink-0 rounded-full bg-white px-7 py-3 font-semibold text-clay-800 shadow-soft transition-all hover:bg-gray-100 hover:-translate-y-0.5"
            >
              {t('app.prompt.cta')}
            </button>
          </div>

          <button
            type="button"
            onClick={() => { setShowPrompt(false)}}
            className="text-white ml-2 "
            aria-label={t('app.prompt.close')}
          >
            ×
          </button>
        </div>
      )}

    </BrowserRouter>
  )
}

export default App
