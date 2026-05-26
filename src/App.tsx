import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Booking from './components/sections/Booking'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import { MessageCircle } from 'lucide-react'

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

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/21624722000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Réserver via WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </div>
  )
}

export default App
