import { motion } from 'motion/react'
import { ChevronDown, CalendarDays, Phone } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy via-primary-dark to-primary">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('/6.jpg')` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-primary-dark/80 to-primary/70" />
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      {/* Blue glow */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[100px]" />

      <div className="relative z-10 container-pad pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 bg-sky-300 rounded-full animate-pulse" />
            Ouvert 7j/7 · 09h00 – 00h30 · La Soukra, Tunis
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            LE MEILLEUR<br />
            <span className="text-sky-300">PADEL INDOOR</span><br />
            EN TUNISIE
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/70 text-lg md:text-xl font-light mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            2 terrains indoor premium · Coaching certifié · Climatisation · Vestiaires modernes
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <a href="#booking" className="btn-white text-base">
              <CalendarDays size={18} />
              Réserver un terrain
            </a>
            <a href="tel:24722000" className="btn-outline border-white/40 text-white hover:bg-white hover:text-primary text-base">
              <Phone size={18} />
              24 722 000
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-x-10 gap-y-4 mt-16 pt-8 border-t border-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { value: '2',       label: 'Terrains Indoor' },
              { value: '100 TND', label: 'Par réservation' },
              { value: '1h30',    label: 'Durée créneau' },
              { value: '5★',      label: 'Avis clients' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-black text-sky-300">{s.value}</div>
                <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={24} className="text-white/40" />
      </motion.div>
    </section>
  )
}
