import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80', alt: 'Terrain 1', tall: true },
  { id: 2, src: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80', alt: 'Match', tall: false },
  { id: 3, src: 'https://images.unsplash.com/photo-1591491653056-4ed2763bec4a?w=800&q=80', alt: 'Coaching', tall: false },
  { id: 4, src: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80', alt: 'Ambiance', tall: true },
  { id: 5, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Terrain 2', tall: false },
  { id: 6, src: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&q=80', alt: 'Tournoi', tall: false },
]

type GalleryImage = typeof images[0]

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <section id="gallery" className="section-pad bg-dark-2">
      <div className="container-pad">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="w-16 h-1 bg-neon rounded mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">NOS <span className="text-neon-gradient">INSTALLATIONS</span></h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.tall ? 'row-span-2' : ''}`}
              style={{ aspectRatio: img.tall ? '3/4' : '4/3' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(img)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <ZoomIn size={28} className="text-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:text-neon transition-colors">
              <X size={20} />
            </button>
            <motion.img
              src={selected.src}
              alt={selected.alt}
              className="max-w-4xl w-full max-h-[85vh] object-contain rounded-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
