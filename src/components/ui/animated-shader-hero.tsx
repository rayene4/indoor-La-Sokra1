import React, { useRef, useEffect } from 'react'

interface HeroProps {
  trustBadge?: { text: string; pulse?: boolean }
  headline: { line1: string; line2: string }
  subtitle: string
  buttons?: {
    primary?: { text: string; onClick?: () => void }
    secondary?: { text: string; href?: string }
  }
  stats?: { value: string; label: string }[]
  className?: string
}

// ── WebGL Shader Background ───────────────────────────────────────────────────
const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

const SHADER_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    /* blue/cyan palette instead of warm tones */
    col+=.00125/d*(cos(sin(i)*vec3(3,4,6)+1.8)+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.02,bg*.08,bg*.28),d);
  }
  O=vec4(col,1);
}`

const VERTICES = [-1, 1, -1, -1, 1, 1, 1, -1]

function useShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2')
    if (!gl) return

    let raf = 0

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC)
    const fs = compile(gl.FRAGMENT_SHADER, SHADER_SRC)
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VERTICES), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uRes  = gl.getUniformLocation(prog, 'resolution')
    const uTime = gl.getUniformLocation(prog, 'time')

    const resize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(prog)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, now * 1e-3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return canvasRef
}
// ─────────────────────────────────────────────────────────────────────────────

const AnimatedShaderHero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  stats,
  className = '',
}) => {
  const canvasRef = useShaderBackground()

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden bg-black ${className}`}>
      {/* WebGL canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{ background: 'black' }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-navy/60" />

      {/* Content */}
      <div className="relative z-10 w-full container-pad pt-24 pb-16">
        <div className="max-w-3xl">

          {/* Trust badge */}
          {trustBadge && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 animate-fade-in-down">
              {trustBadge.pulse && (
                <span className="w-1.5 h-1.5 bg-sky-300 rounded-full animate-pulse" />
              )}
              {trustBadge.text}
            </div>
          )}

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            <span className="block text-white animate-fade-in-up animation-delay-200">
              {headline.line1}
            </span>
            <span className="block bg-gradient-to-r from-sky-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
              {headline.line2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-lg md:text-xl font-light mb-10 max-w-xl animate-fade-in-up animation-delay-600">
            {subtitle}
          </p>

          {/* Buttons */}
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-800">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="btn-white text-base"
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <a
                  href={buttons.secondary.href}
                  className="btn-outline border-white/40 text-white hover:bg-white hover:text-primary text-base"
                >
                  {buttons.secondary.text}
                </a>
              )}
            </div>
          )}

          {/* Stats */}
          {stats && (
            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-16 pt-8 border-t border-white/15 animate-fade-in-up animation-delay-800">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-black text-sky-300">{s.value}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AnimatedShaderHero
