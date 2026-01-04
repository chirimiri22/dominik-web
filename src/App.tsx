import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './components/Intro'
import Gallery from './components/Gallery'
import Description from './components/Description'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Booking from './pages/Booking'

const Home = () => (
  <>
    <Intro />
    <Description />
    <Gallery />
    <Pricing />
    <Contact />
    <Footer />
  </>
)

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/booking" element={<Booking />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
