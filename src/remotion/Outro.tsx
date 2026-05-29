import { useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion'

export const Outro: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
  const logoScale = spring({ frame: frame - 10, fps, from: 0, to: 1, config: { damping: 12 } })
  const textOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: 'clamp' })
  const textY = interpolate(frame, [30, 60], [30, 0], { extrapolateRight: 'clamp' })
  const btnScale = spring({ frame: frame - 60, fps, from: 0.7, to: 1, config: { damping: 10 } })
  const btnOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: 'clamp' })

  const phoneOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp' })

  // Pulsing glow on CTA button
  const pulse = Math.sin(frame * 0.12) * 0.5 + 0.5

  return (
    <div style={{
      width: '100%', height: '100%',
      opacity: bgOpacity,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow blobs */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '8%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* Logo */}
      <div style={{
        transform: `scale(${logoScale})`,
        width: 90, height: 90,
        borderRadius: 20, overflow: 'hidden',
        marginBottom: 28,
        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
      }}>
        <Img src={staticFile('5.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Text */}
      <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)`, textAlign: 'center' }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
          Réservez votre terrain
        </div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.55)', marginTop: 12, fontWeight: 300 }}>
          Disponible 7j/7 · 09h00 – 00h30
        </div>
      </div>

      {/* CTA Button */}
      <div style={{
        opacity: btnOpacity,
        transform: `scale(${btnScale})`,
        marginTop: 44,
        background: `linear-gradient(135deg, #2563eb, #0ea5e9)`,
        borderRadius: 100, padding: '20px 60px',
        fontSize: 22, fontWeight: 800, color: '#fff',
        letterSpacing: 1,
        boxShadow: `0 0 ${30 + pulse * 30}px rgba(56,189,248,${0.3 + pulse * 0.3})`,
      }}>
        Réserver maintenant
      </div>

      {/* Phone number */}
      <div style={{
        opacity: phoneOpacity,
        marginTop: 28,
        display: 'flex', alignItems: 'center', gap: 10,
        color: 'rgba(255,255,255,0.6)', fontSize: 18, fontWeight: 500,
      }}>
        <span>📞</span>
        <span>24 722 000</span>
        <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.2)' }}>·</span>
        <span>La Soukra, Tunis</span>
      </div>
    </div>
  )
}
