import { Share2, Globe, Send, Phone } from 'lucide-react'
import { useState } from 'react'
import { navLinks, contactInfo } from '../../data'

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-navy text-white">
      <div className="container-pad py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20">
                <img src="/5.png" alt="logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-base font-black">PADEL INDOOR <span className="text-sky-300">LA SOUKRA</span></div>
                <div className="text-xs text-white/40 -mt-0.5">La Soukra, Ariana, Tunisie</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Premier centre de padel indoor premium en Tunisie. 2 terrains, coaches certifiés, ambiance unique.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: contactInfo.instagram },
                { icon: Globe, href: contactInfo.facebook },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
              <a href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-2 h-9 px-3 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 text-white/60 hover:text-white transition-all duration-200 text-sm">
                <Phone size={14} />
                {contactInfo.phone}
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-5">Newsletter</h4>
            <p className="text-white/40 text-sm mb-4">Offres et actualités chaque semaine.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-sky-400/50 transition-colors min-w-0"
              />
              <button className="bg-primary hover:bg-primary-dark p-2.5 rounded-xl transition-colors flex-shrink-0">
                <Send size={15} />
              </button>
            </div>
            <div className="mt-5 bg-white/5 border border-white/8 rounded-xl p-4">
              <div className="text-sky-300 font-bold text-sm">Ouvert 7j/7</div>
              <div className="text-white font-black text-lg">08h00 – 23h00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-pad py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs">© 2025 Padel Indoor La Soukra. Tous droits réservés.</p>
          <p className="text-white/20 text-xs">Made with ♥ in Tunisia</p>
        </div>
      </div>
    </footer>
  )
}
