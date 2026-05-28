import type { ElementType } from 'react'
import { motion } from 'motion/react'
import { Layers, Wind, ShowerHead, Car } from 'lucide-react'
import { features } from '../../data'

const iconMap: Record<string, ElementType> = { Layers, Wind, ShowerHead, Car }

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function About() {
  return (
    <section id="about" className="section-pad bg-white">
      <div className="container-pad">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            className="reveal"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Notre Club</span>
            <h2 className="section-title mb-6">
              Pourquoi choisir<br />
              <span className="text-gradient">Padel Indoor</span><br />
              La Soukra ?
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Premier centre de padel indoor premium de La Soukra, nous avons conçu chaque détail pour vous offrir la meilleure expérience de jeu — des terrains aux vestiaires, jusqu'au coaching.
            </p>
            <div className="space-y-3">
              {['Terrains aux normes WPT internationales', 'Ambiance conviviale et compétitive', 'Communauté active de joueurs passionnés'].map((pt) => (
                <div key={pt} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-gray-600 text-sm">{pt}</span>
                </div>
              ))}
            </div>
            <a href="#booking" className="btn-primary mt-8">Réserver maintenant</a>
          </motion.div>

          {/* Right — feature cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((f) => {
              const Icon = iconMap[f.icon] || Layers
              return (
                <motion.div
                  key={f.title}
                  variants={item}
                  className="card p-5 hover:-translate-y-1 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-bg border border-primary-border flex items-center justify-center mb-3">
                    <Icon size={19} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-navy text-sm mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
