import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, MessageCircle, Share2, Globe, Send, Clock } from 'lucide-react'
import { contactInfo } from '../../data'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="container-pad">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title mb-4">Contactez-<span className="text-gradient">nous</span></h2>
          <p className="section-sub mx-auto text-center">Une question ou besoin d'aide ? On vous répond rapidement.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { icon: Phone, label: 'Téléphone', value: contactInfo.phone, href: `tel:${contactInfo.phone}`, color: 'text-primary', bg: 'bg-primary-bg border-primary-border' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Écrire sur WhatsApp', href: `https://wa.me/${contactInfo.whatsapp.replace('+','')}`, color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
              { icon: Share2, label: 'Instagram', value: '@padelindoorlasoukra', href: contactInfo.instagram, color: 'text-pink-500', bg: 'bg-pink-50 border-pink-100' },
              { icon: Globe, label: 'Facebook', value: 'Padel Indoor La Soukra', href: contactInfo.facebook, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
              { icon: MapPin, label: 'Adresse', value: contactInfo.address, href: `https://maps.google.com/?q=${contactInfo.address}`, color: 'text-red-500', bg: 'bg-red-50 border-red-100' },
              { icon: Clock, label: 'Horaires', value: contactInfo.hours, href: '#', color: 'text-primary', bg: 'bg-primary-bg border-primary-border' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 rounded-2xl border ${item.bg} hover:shadow-card transition-all duration-200 group`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0 ${item.color}`}>
                  <item.icon size={17} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</div>
                  <div className={`font-semibold text-sm mt-0.5 ${item.color}`}>{item.value}</div>
                </div>
              </a>
            ))}

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-48 shadow-card">
              <iframe
                src={contactInfo.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Padel Indoor La Soukra - Localisation"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form className="bg-white rounded-3xl border border-gray-100 shadow-card p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {[
                  { key: 'name', label: 'Nom complet', placeholder: 'Votre nom', type: 'text' },
                  { key: 'email', label: 'Email', placeholder: 'votre@email.com', type: 'email' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="input"
                    />
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Téléphone</label>
                <input type="tel" placeholder="XX XXX XXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input" />
              </div>
              <div className="mb-6">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Votre message..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="input resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                <Send size={15} />
                Envoyer le message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
