import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Clock, User, Phone, CheckCircle, AlertCircle, Banknote, Loader2 } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../../emailjs.config'
import { SUPABASE_CONFIG, isSupabaseConfigured } from '../../supabase.config'

// ── Supabase client ───────────────────────────────────────────────────────────
const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY)
  : null

// ── LocalStorage fallback ────────────────────────────────────────────────────
const lsKey = (date: string, courtId: number) => `padel_${date}_c${courtId}`
function lsGet(date: string, courtId: number): string[] {
  try { return JSON.parse(localStorage.getItem(lsKey(date, courtId)) ?? '[]') } catch { return [] }
}
function lsAdd(date: string, courtId: number, time: string) {
  const list = lsGet(date, courtId)
  if (!list.includes(time)) localStorage.setItem(lsKey(date, courtId), JSON.stringify([...list, time]))
}
// ─────────────────────────────────────────────────────────────────────────────

const timeSlots = [
  '09:00','10:30','12:00','13:30','15:00',
  '16:30','18:00','19:30','21:00','22:30','00:00',
]

const courts = [
  { id: 1, name: 'Terrain 1' },
  { id: 2, name: 'Terrain 2' },
]

type Status = 'idle' | 'loading' | 'success' | 'error' | 'taken'

export default function Booking() {
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedCourt, setSelectedCourt] = useState(0)
  const [form, setForm] = useState({ date: '', name: '', phone: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  const isFormValid =
    form.name && form.phone && form.date &&
    selectedTime && selectedCourt && !bookedSlots.includes(selectedTime)

  // Load booked slots from Supabase (or localStorage)
  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!form.date || !selectedCourt) {
        setBookedSlots([])
        return
      }
      if (isSupabaseConfigured && supabase) {
        setLoadingSlots(true)
        const { data } = await supabase
          .from('bookings')
          .select('time')
          .eq('date', form.date)
          .eq('court_id', selectedCourt)
        if (!cancelled) {
          setBookedSlots(data?.map(r => r.time as string) ?? [])
          setLoadingSlots(false)
        }
      } else {
        if (!cancelled) setBookedSlots(lsGet(form.date, selectedCourt))
      }
    }

    load()
    return () => { cancelled = true }
  }, [form.date, selectedCourt])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setStatus('loading')

    const courtName = courts.find(c => c.id === selectedCourt)?.name ?? ''
    const formattedDate = new Date(form.date).toLocaleDateString('fr-TN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    try {
      // ── Save booking ──
      if (isSupabaseConfigured && supabase) {
        const id = `${form.date}_court${selectedCourt}_${selectedTime.replace(':', '')}`
        const { error } = await supabase.from('bookings').insert({
          id, date: form.date, time: selectedTime,
          court_id: selectedCourt, court_name: courtName,
          client_name: form.name, client_phone: form.phone,
        })
        if (error?.code === '23505') {
          // Unique constraint violation = slot already taken
          setBookedSlots(prev => [...prev, selectedTime])
          setSelectedTime('')
          setStatus('taken')
          setTimeout(() => setStatus('idle'), 5000)
          return
        }
        if (error) throw error
        setBookedSlots(prev => [...prev, selectedTime])
      } else {
        if (lsGet(form.date, selectedCourt).includes(selectedTime)) {
          setSelectedTime('')
          setStatus('taken')
          setTimeout(() => setStatus('idle'), 5000)
          return
        }
        lsAdd(form.date, selectedCourt, selectedTime)
        setBookedSlots(lsGet(form.date, selectedCourt))
      }

      // ── Send email ──
      if (EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID') {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          {
            to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
            client_name: form.name, client_phone: form.phone,
            booking_date: formattedDate, booking_time: selectedTime,
            court_name: courtName,
          },
          EMAILJS_CONFIG.PUBLIC_KEY,
        )
      } else {
        await new Promise(r => setTimeout(r, 1200))
      }

      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        setForm({ date: '', name: '', phone: '' })
        setSelectedTime('')
        setSelectedCourt(0)
        setBookedSlots([])
      }, 6000)
    } catch (err) {
      console.error('Booking error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="booking" className="section-pad bg-primary-bg">
      <div className="container-pad">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Réservation en ligne</span>
          <h2 className="section-title mb-4">Réservez votre terrain</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Choisissez votre créneau et confirmez en quelques secondes
          </p>
          <div className="inline-flex items-center gap-3 bg-white border border-primary/20 shadow-blue rounded-2xl px-6 py-3 mt-6">
            <Banknote size={22} className="text-primary" />
            <div className="text-left">
              <span className="text-navy font-black text-xl">100 TND</span>
              <span className="text-gray-400 text-sm ml-2">/ réservation</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <span className="text-gray-500 text-sm">1h30 · tous créneaux</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* ── FORM ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-card border border-gray-100 p-8"
            >
              <AnimatePresence mode="wait">

                {status === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-black text-navy mb-2">Réservation confirmée !</h3>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Email envoyé au club. Nous vous contacterons au <strong>{form.phone}</strong>.
                    </p>
                  </motion.div>
                )}

                {status === 'taken' && (
                  <motion.div key="taken" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle size={32} className="text-orange-500" />
                    </div>
                    <h3 className="text-xl font-black text-navy mb-2">Créneau déjà réservé</h3>
                    <p className="text-gray-500 text-sm">Ce créneau est pris. Choisissez un autre horaire.</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle size={32} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-black text-navy mb-2">Erreur d'envoi</h3>
                    <p className="text-gray-500 text-sm mb-4">Réservez directement par téléphone.</p>
                    <a href="tel:24722000" className="btn-primary text-sm py-2.5">Appeler le 24 722 000</a>
                  </motion.div>
                )}

                {(status === 'idle' || status === 'loading') && (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>

                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          <User size={12} className="text-primary" /> Nom complet
                        </label>
                        <input type="text" placeholder="Votre nom" value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })} required className="input" />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          <Phone size={12} className="text-primary" /> Téléphone
                        </label>
                        <input type="tel" placeholder="XX XXX XXX" value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })} required className="input" />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mb-6">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        <CalendarDays size={12} className="text-primary" /> Date
                      </label>
                      <input type="date" value={form.date}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]} required className="input" />
                    </div>

                    {/* Time slots */}
                    <div className="mb-6">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        <Clock size={12} className="text-primary" /> Heure
                        {loadingSlots && (
                          <span className="flex items-center gap-1 text-gray-400 font-normal normal-case tracking-normal ml-1">
                            <Loader2 size={11} className="animate-spin" /> Vérification…
                          </span>
                        )}
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {timeSlots.map(t => {
                          const isBooked = bookedSlots.includes(t)
                          const isSelected = selectedTime === t
                          return (
                            <button type="button" key={t}
                              onClick={() => !isBooked && setSelectedTime(t)}
                              disabled={isBooked}
                              title={isBooked ? 'Créneau indisponible' : undefined}
                              className={`py-2 rounded-xl text-xs font-semibold transition-all duration-150 relative ${
                                isBooked
                                  ? 'bg-gray-100 border border-gray-200 text-gray-300 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-primary text-white shadow-blue'
                                  : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                              }`}
                            >
                              {t}
                              {isBooked && (
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full border border-white" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                      {bookedSlots.length > 0 && (
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-red-400 rounded-full inline-block flex-shrink-0" />
                          Les créneaux barrés sont déjà réservés
                        </p>
                      )}
                    </div>

                    {/* Courts */}
                    <div className="mb-8">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Terrain</label>
                      <div className="grid grid-cols-2 gap-4">
                        {courts.map(c => (
                          <button type="button" key={c.id} onClick={() => setSelectedCourt(c.id)}
                            className={`p-5 rounded-2xl border-2 text-center transition-all duration-150 ${
                              selectedCourt === c.id ? 'border-primary bg-primary/5 shadow-blue' : 'border-gray-200 bg-white hover:border-primary/40'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${
                              selectedCourt === c.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                            }`}>
                              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5"/>
                                <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                              </svg>
                            </div>
                            <div className={`font-bold text-sm ${selectedCourt === c.id ? 'text-primary' : 'text-navy'}`}>{c.name}</div>
                            <div className="text-gray-400 text-xs mt-0.5">Indoor · Verre panoramique</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={!isFormValid || status === 'loading'}
                      className={`btn-primary w-full justify-center text-base py-4 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {status === 'loading' ? (
                        <><Loader2 size={18} className="animate-spin" /> Envoi en cours…</>
                      ) : (
                        <><CalendarDays size={18} /> Confirmer la réservation</>
                      )}
                    </button>
                    {!isFormValid && (
                      <p className="text-center text-xs text-gray-400 mt-3">Remplissez tous les champs pour continuer</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* ── SIDEBAR ── */}
          <motion.div className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>

            <div className="bg-primary rounded-2xl p-6 text-white shadow-blue-lg">
              <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Tarif unique</div>
              <div className="text-5xl font-black">100</div>
              <div className="text-sky-200 font-bold text-lg">TND / réservation (1h30)</div>
              <div className="mt-3 pt-3 border-t border-white/15 text-white/60 text-xs leading-relaxed">
                Accès illimité au terrain. Aucun frais supplémentaire.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
              <h4 className="font-bold text-navy text-sm mb-3 flex items-center gap-2">
                <Clock size={14} className="text-primary" /> Horaires
              </h4>
              <div className="space-y-2.5">
                {[['Lundi – Dimanche', '09h00 – 00h30'], ['Jours fériés', '09h00 – 00h30']].map(([d, h]) => (
                  <div key={d} className="flex justify-between">
                    <span className="text-gray-500 text-sm">{d}</span>
                    <span className="font-semibold text-primary text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
              <h4 className="font-bold text-navy text-sm mb-3">Réserver par téléphone</h4>
              <a href="tel:24722000" className="flex items-center gap-3 p-3 bg-primary-bg rounded-xl hover:bg-primary-border/30 transition-colors">
                <Phone size={16} className="text-primary" />
                <span className="font-bold text-primary">24 722 000</span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
