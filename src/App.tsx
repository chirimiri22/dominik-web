import React, { useEffect } from 'react'
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

const Home = () => (
  <main>
    <Navbar />
    <Intro />
      <Description />
    <Gallery />
    <Pricing />
  <Guarantee />
  <Contact />
  <Faq />
  <Testimonials />
  <Footer />
  </main>
)

const AppRoutes = (): JSX.Element => {
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
        <Route path="/en" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
