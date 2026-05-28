import { ChevronDown } from 'lucide-react'
import AnimatedShaderHero from '../ui/animated-shader-hero'

export default function Hero() {
  return (
    <div id="hero" className="relative">
      <AnimatedShaderHero
        trustBadge={{
          text: 'Ouvert 7j/7 · 09h00 – 00h30 · La Soukra, Tunis',
          pulse: true,
        }}
        headline={{
          line1: 'LE MEILLEUR',
          line2: 'PADEL INDOOR EN TUNISIE',
        }}
        subtitle="2 terrains indoor premium · Coaching certifié · Climatisation · Vestiaires modernes"
        buttons={{
          primary: {
            text: 'Réserver un terrain',
            onClick: () => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }),
          },
          secondary: {
            text: '📞 24 722 000',
            href: 'tel:24722000',
          },
        }}
        stats={[
          { value: '2',       label: 'Terrains Indoor' },
          { value: '100 TND', label: 'Par réservation' },
          { value: '1h30',    label: 'Durée créneau' },
          { value: '5★',      label: 'Avis clients' },
        ]}
      />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown size={24} className="text-white/40" />
      </div>
    </div>
  )
}
