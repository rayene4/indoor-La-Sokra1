import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Booking from './components/sections/Booking'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Booking />
      <Testimonials />
      <Contact />
      <Footer />

    </div>
  )
}

export default App
