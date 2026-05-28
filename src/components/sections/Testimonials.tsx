import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../data'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const next = () => setCurrent(p => (p + 1) % testimonials.length)
  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="section-pad bg-primary-bg">
      <div className="container-pad">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Témoignages</span>
          <h2 className="section-title mb-4">Ce que disent <span className="text-gradient">nos membres</span></h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-10 md:p-14 text-center relative overflow-hidden min-h-[260px] flex flex-col items-center justify-center">
            <Quote size={48} className="text-primary/8 absolute top-6 left-6" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <div className="flex justify-center gap-1 mb-5">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-7 font-light italic">
                  "{testimonials[current].text}"
                </p>
                <div className="font-bold text-primary">{testimonials[current].name}</div>
                <div className="text-gray-400 text-sm">{testimonials[current].role}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-6">
            <button onClick={prev} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-card">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-gray-300 hover:bg-primary/40'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-card">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
