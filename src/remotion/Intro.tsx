import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion'

export const Intro: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const logoScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 100 } })
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })

  const titleOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: 'clamp' })
  const titleY = interpolate(frame, [25, 55], [40, 0], { extrapolateRight: 'clamp' })

  const subtitleOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: 'clamp' })
  const subtitleY = interpolate(frame, [50, 80], [30, 0], { extrapolateRight: 'clamp' })

  const badgeOpacity = interpolate(frame, [75, 100], [0, 1], { extrapolateRight: 'clamp' })
  const badgeScale = spring({ frame: frame - 75, fps, from: 0.8, to: 1, config: { damping: 10 } })

  const lineWidth = interpolate(frame, [30, 90], [0, 280], { extrapolateRight: 'clamp' })

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1d4ed8 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', overflow: 'hidden', position: 'relative',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', right: '-100px', top: '20%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', left: '-80px', bottom: '25%',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* Logo */}
      <div style={{
        opacity: logoOpacity,
        transform: `scale(${logoScale})`,
        marginBottom: 32,
        width: 110, height: 110,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        <Img src={staticFile('5.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Separator line */}
      <div style={{
        width: lineWidth, height: 2,
        background: 'linear-gradient(90deg, transparent, #7dd3fc, transparent)',
        marginBottom: 28,
      }} />

      {/* Club name */}
      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 64, fontWeight: 900, color: '#ffffff',
          letterSpacing: '-2px', lineHeight: 1,
          textTransform: 'uppercase',
        }}>
          PADEL INDOOR
        </div>
        <div style={{
          fontSize: 40, fontWeight: 900,
          background: 'linear-gradient(90deg, #7dd3fc, #38bdf8, #0ea5e9)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: 10, marginTop: 4,
          textTransform: 'uppercase',
        }}>
          LA SOUKRA
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        opacity: subtitleOpacity,
        transform: `translateY(${subtitleY}px)`,
        marginTop: 24, color: 'rgba(255,255,255,0.6)',
        fontSize: 20, fontWeight: 300, letterSpacing: 1,
      }}>
        Centre de Padel Premium — Tunis
      </div>

      {/* Badge */}
      <div style={{
        opacity: badgeOpacity,
        transform: `scale(${badgeScale})`,
        marginTop: 40,
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 100, padding: '12px 28px',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7dd3fc' }} />
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
          Ouvert 7j/7 · 09h00 – 00h30
        </span>
      </div>
    </div>
  )
}
