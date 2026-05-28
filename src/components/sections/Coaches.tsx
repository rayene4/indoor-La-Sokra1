import { motion } from 'motion/react'
import { Share2, Star, Award } from 'lucide-react'
import { coaches } from '../../data'

export default function Coaches() {
  return (
    <section id="coaches" className="section-pad bg-white">
      <div className="container-pad">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">L'équipe</span>
          <h2 className="section-title mb-4">Nos <span className="text-gradient">Coachs</span></h2>
          <p className="section-sub mx-auto text-center">Des entraîneurs certifiés et passionnés pour vous accompagner à chaque niveau</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {coaches.map((coach, i) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card p-8 text-center hover:-translate-y-1"
            >
              {/* Avatar */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${coach.color} flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 shadow-blue`}>
                {coach.initials}
              </div>
              {/* Stars */}
              <div className="flex justify-center gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <h3 className="text-lg font-black text-navy mb-1">{coach.name}</h3>
              <div className="inline-flex items-center gap-1.5 bg-primary-bg border border-primary-border text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">
                <Award size={11} />
                {coach.level}
              </div>
              <p className="text-gray-400 text-xs mb-1">{coach.specialty}</p>
              <p className="text-gray-400 text-xs mb-4">{coach.experience} d'expérience</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{coach.description}</p>
              <a
                href={coach.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors text-sm"
              >
                <Share2 size={15} />
                Instagram
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
