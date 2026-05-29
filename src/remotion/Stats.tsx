import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'

const stats = [
  { value: 2,      suffix: '',     label: 'Terrains Indoor',  color: '#7dd3fc' },
  { value: 100,    suffix: ' TND', label: 'Par réservation',  color: '#a78bfa' },
  { value: 1,      suffix: 'h30',  label: 'Durée créneau',    color: '#34d399' },
  { value: 5,      suffix: '★',    label: 'Avis clients',     color: '#fbbf24' },
]

function Counter({ target, suffix, frame, delay }: { target: number; suffix: string; frame: number; delay: number }) {
  const f = Math.max(0, frame - delay)
  const progress = interpolate(f, [0, 50], [0, 1], { extrapolateRight: 'clamp' })
  const current = Math.round(target * progress)
  return <>{current}{suffix}</>
}

export const Stats: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' })
  const titleY = interpolate(frame, [0, 30], [30, 0], { extrapolateRight: 'clamp' })

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', padding: '0 80px',
    }}>
      {/* Title */}
      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        textAlign: 'center', marginBottom: 70,
      }}>
        <div style={{ fontSize: 18, color: '#7dd3fc', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>
          Le Club en Chiffres
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: '#ffffff', letterSpacing: '-1px' }}>
          Pourquoi nous choisir ?
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        {stats.map((s, i) => {
          const delay = i * 20
          const cardOpacity = interpolate(frame, [delay + 10, delay + 40], [0, 1], { extrapolateRight: 'clamp' })
          const cardY = interpolate(frame, [delay + 10, delay + 45], [60, 0], { extrapolateRight: 'clamp' })
          const cardScale = spring({ frame: frame - delay - 10, fps, from: 0.85, to: 1, config: { damping: 14, stiffness: 100 } })

          return (
            <div key={i} style={{
              opacity: cardOpacity,
              transform: `translateY(${cardY}px) scale(${cardScale})`,
              width: 240, padding: '44px 32px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: 24,
              textAlign: 'center',
              boxShadow: `0 0 40px ${s.color}20`,
            }}>
              {/* Icon dot */}
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.color, margin: '0 auto 20px' }} />
              {/* Value */}
              <div style={{
                fontSize: 72, fontWeight: 900,
                color: s.color, lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>
                <Counter target={s.value} suffix={s.suffix} frame={frame} delay={delay + 20} />
              </div>
              {/* Label */}
              <div style={{
                fontSize: 16, color: 'rgba(255,255,255,0.5)',
                marginTop: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1,
              }}>
                {s.label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
