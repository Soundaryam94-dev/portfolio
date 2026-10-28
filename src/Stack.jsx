import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { stackSection } from './data'

// Choreography and layout numbers follow the reference stack section:
// a ~7 second unwrap on its own clock: the gift rises, hops and shakes, the lid flies off, light bursts out and the
// tools launch one after another along curved paths into a neat grid above the box.
const MOUTH = -70 // where tools leave the box, relative to the stage origin
const UNWRAP_MS = 7000

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const range = (q, a, b) => clamp((q - a) / (b - a))
const ss = (t) => t * t * (3 - 2 * t)

function Gift() {
  return (
    <svg viewBox="0 0 300 300" aria-hidden="true">
      <defs>
        <linearGradient id="st-front" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a3b58" /><stop offset="1" stopColor="#16223a" /></linearGradient>
        <linearGradient id="st-side" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#131d30" /><stop offset="1" stopColor="#0c1424" /></linearGradient>
        <linearGradient id="st-lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#34496c" /><stop offset="1" stopColor="#24344f" /></linearGradient>
        <linearGradient id="st-top" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#3b5178" /><stop offset="1" stopColor="#2c3e5e" /></linearGradient>
        <linearGradient id="st-gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c79b52" /><stop offset=".35" stopColor="#f4dda6" /><stop offset=".6" stopColor="#d9b26c" /><stop offset="1" stopColor="#b98d45" /></linearGradient>
        <linearGradient id="st-goldv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4dda6" /><stop offset="1" stopColor="#c39650" /></linearGradient>
        <linearGradient id="st-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".07" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <radialGradient id="st-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#fff4d6" /><stop offset=".45" stopColor="#ffd98c" stopOpacity=".75" /><stop offset="1" stopColor="#ffd98c" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="152" cy="288" rx="132" ry="11" fill="#13233a" opacity=".18" />
      <path d="M40 132 L100 108 L262 108 L202 132 Z" fill="#0a111d" />
      <ellipse className="g-glow" cx="152" cy="116" rx="130" ry="64" fill="url(#st-glow)" opacity="0" />
      <path d="M202 132 L262 108 L262 256 L202 282 Z" fill="url(#st-side)" />
      <rect x="40" y="132" width="162" height="150" fill="url(#st-front)" />
      <rect x="40" y="132" width="162" height="150" fill="url(#st-sheen)" />
      <rect x="110" y="132" width="22" height="150" fill="url(#st-gold)" />
      <path d="M226 122.4 L240 116.8 L240 264.8 L226 270.4 Z" fill="#a98040" />
      <path d="M40 132h162" stroke="#43587e" strokeWidth="1.2" />
      <g className="g-lid">
        <path d="M30 104 L94 78 L272 78 L208 104 Z" fill="url(#st-top)" />
        <path d="M104 104 L168 78 L190 78 L126 104 Z" fill="url(#st-goldv)" />
        <path d="M208 104 L272 78 L272 110 L208 136 Z" fill="#1a2740" />
        <path d="M232 94.2 L246 88.5 L246 120.5 L232 126.2 Z" fill="#a98040" />
        <rect x="30" y="104" width="178" height="32" fill="url(#st-lid)" />
        <path d="M30 104.6h178" stroke="#5a7098" strokeWidth="1.4" />
        <rect x="106" y="104" width="30" height="32" fill="url(#st-gold)" />
        <g transform="translate(150 90)">
          <path d="M0 0 C -12 -30, -58 -40, -62 -16 C -64 -2, -30 4, 0 0 Z" fill="url(#st-gold)" />
          <path d="M-2 -1 C -16 -18, -40 -24, -48 -14" fill="none" stroke="#a98040" strokeWidth="2" strokeLinecap="round" opacity=".7" />
          <path d="M0 0 C 12 -30, 58 -40, 62 -16 C 64 -2, 30 4, 0 0 Z" fill="url(#st-gold)" />
          <path d="M2 -1 C 16 -18, 40 -24, 48 -14" fill="none" stroke="#a98040" strokeWidth="2" strokeLinecap="round" opacity=".7" />
          <path d="M-4 3 L-24 38 L-15 33 L-11 43 L4 5 Z" fill="#c79b52" />
          <path d="M4 3 L22 36 L13 32 L9 42 L-4 5 Z" fill="#d9b26c" />
          <rect x="-9" y="-7" width="18" height="13" rx="5" fill="#f0d69c" stroke="#b98d45" strokeWidth="1.5" />
        </g>
        <path d="M200 112 C 214 124, 222 140, 230 150" fill="none" stroke="#c79b52" strokeWidth="1.4" />
        <g transform="translate(232 150) rotate(-14)">
          <path d="M0 0 H34 L42 10 L34 20 H0 Z" fill="#fbf3e3" stroke="#d9c6a1" strokeWidth="1" />
          <circle cx="35" cy="10" r="2.4" fill="none" stroke="#c79b52" strokeWidth="1.2" />
          <text x="14" y="15" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fill="#2a3b58">{stackSection.tag}</text>
        </g>
      </g>
    </svg>
  )
}

// A tool's brand logo (an SVG path, from the official icon set) or, if it has none, its text mark.
// `lf` can point at the shared gradient below for logos that are not a single colour.
function Mark({ t }) {
  if (t.img) return <img src={t.img} alt="" />
  if (!t.logo) return t.mark
  return <svg viewBox="0 0 24 24" fill={t.lf || 'currentColor'} aria-hidden="true"><path d={t.logo} /></svg>
}

function Gradients() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="st-gem" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#4285f4" /><stop offset=".5" stopColor="#9b72cb" /><stop offset="1" stopColor="#d96570" /></linearGradient>
      </defs>
    </svg>
  )
}

// "My stack": tap the gift and it unwraps into a grid of tool tiles. Hover a tool to see what it is.
// Content lives in `stackSection` in data.js.
export default function Stack() {
  const { tools } = stackSection
  const pinRef = useRef(null)
  const headRef = useRef(null)
  const stageRef = useRef(null)
  const giftRef = useRef(null)
  const lidRef = useRef(null)
  const glowRef = useRef(null)
  const burstRef = useRef(null)
  const beamRef = useRef(null)
  const ringRef = useRef(null)
  const toolRefs = useRef([])
  const launched = useRef([]) // which tiles have already left the box (one soft sound each)
  const geo = useRef({ mobile: false, cols: 9, px: 112, py: 116, gtop: -420, lift: 0, ts: 1 })
  const sim = useRef({ go: false, t0: 0, q: 0, raf: 0, hot: -1 })
  const [tapped, setTapped] = useState(false)
  const [tip, setTip] = useState(null) // { i, x, y, w }

  const toolPos = useCallback((i) => {
    const g = geo.current
    const n = tools.length
    const rows = Math.ceil(n / g.cols)
    const r = Math.floor(i / g.cols)
    const inRow = r < rows - 1 ? g.cols : n - g.cols * (rows - 1)
    const c = i % g.cols
    return [(c - (inRow - 1) / 2) * g.px, g.gtop + r * g.py + g.py / 2]
  }, [tools.length])

  // lay out heading, icon rows and gift as one tight group: the gift sits right under the last row of icons
  const layout = useCallback(() => {
    const pin = pinRef.current
    const head = headRef.current
    if (!pin || !head) return
    const vw = window.innerWidth
    const mobile = vw < 860
    const g = geo.current
    g.mobile = mobile
    g.cols = mobile ? (window.innerHeight < 720 ? 6 : 5) : 9
    g.px = mobile ? Math.min(74, (vw - 24) / g.cols) : Math.min(112, (vw - 80) / 9)
    g.py = mobile ? 84 : 116
    const pb = pin.getBoundingClientRect()
    const headB = head.getBoundingClientRect().bottom - pb.top
    const giftTop = mobile ? 125 : 170
    const gapTop = mobile ? 18 : 30
    const gapMid = mobile ? 24 : 44
    const rows = Math.ceil(tools.length / g.cols)
    const room = pb.height - (mobile ? 120 : 150) - (headB + gapTop + gapMid + giftTop)
    const basePY = g.py
    if (rows * g.py > room) g.py = Math.max(mobile ? 42 : 62, room / rows)
    g.ts = Math.min(1, g.py / basePY)
    g.px = Math.max(g.px * g.ts, Math.min(g.px, (vw - 24) / g.cols) * g.ts)
    const gridH = rows * g.py
    const stageY = Math.min(pb.height - (mobile ? 120 : 150), headB + gapTop + gridH + gapMid + giftTop)
    stageRef.current.style.top = `${stageY}px`
    g.gtop = headB + gapTop - stageY
    g.lift = Math.max(0, stageY - (headB + gapTop + giftTop))
  }, [tools.length])

  const reduce = useRef(false)

  // one frame of the unwrap, for progress q (0..1)
  const apply = useCallback((q, now) => {
    const g = geo.current
    const vh = window.innerHeight
    const rise = ss(range(q, 0, 0.05))
    const shake = range(q, 0.03, 0.17)
    const open = ss(range(q, 0.16, 0.25))
    const drop = ss(range(q, 0.14, 0.28))
    stageRef.current.style.transform = `translate3d(0, ${(-(1 - drop) * g.lift).toFixed(1)}px, 0)`
    const amp = reduce.current ? 0 : shake * (1 - open) * 3.5
    const rot = Math.sin(now * 23) * amp
    const hop = Math.abs(Math.sin(now * 11.5)) * amp * 1.4
    giftRef.current.style.transform = `translate3d(0, ${((1 - rise) * vh * 0.08 - hop).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${(0.9 + 0.1 * rise).toFixed(3)})`
    lidRef.current.style.transform = `translate(${(open * 90).toFixed(1)}px, ${(-open * 150 + Math.sin(open * Math.PI) * -40 + ss(range(q, 0.25, 0.38)) * 110).toFixed(1)}px) rotate(${(open * 28).toFixed(1)}deg)`
    glowRef.current.setAttribute('opacity', open.toFixed(3))
    burstRef.current.style.opacity = (open * 0.95).toFixed(3)
    burstRef.current.style.scale = (0.55 + 0.45 * open).toFixed(3)
    beamRef.current.style.opacity = (open * 0.8).toFixed(3)
    stageRef.current.classList.toggle('open', open > 0.6)

    toolRefs.current.forEach((el, i) => {
      if (!el) return
      const s0 = 0.27 + i * 0.028
      const f = ss(range(q, s0, s0 + 0.11))
      if (f > 0.02 && !launched.current[i]) {
        launched.current[i] = true
      }
      const [tx, ty] = toolPos(i)
      const cx = tx * 0.25
      const cy = ty - 60
      const u = 1 - f
      const x = 2 * u * f * cx + f * f * tx
      const y = u * u * MOUTH + 2 * u * f * cy + f * f * ty
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${((0.2 + 0.8 * f) * g.ts).toFixed(3)}) rotate(${(u * (tx < 0 ? -40 : 40)).toFixed(1)}deg)`
      el.style.opacity = f > 0 ? Math.min(1, f * 5).toFixed(2) : 0
      el.style.pointerEvents = f > 0.98 ? '' : 'none'
      const set = f > 0.98
      if (el.classList.contains('set') !== set) el.classList.toggle('set', set)
    })
  }, [toolPos])

  const loopRef = useRef(null)
  const loop = useCallback(() => {
    const s = sim.current
    const now = performance.now()
    if (s.go) {
      const u = reduce.current ? 1 : Math.min(1, (now - s.t0) / UNWRAP_MS)
      s.q = u < 1 ? 0.5 - 0.5 * Math.cos(Math.PI * u) : 1
    }
    apply(s.q, now / 1000)
    if (!s.go || s.q < 1) s.raf = requestAnimationFrame(() => loopRef.current())
    else s.raf = 0
  }, [apply])

  useLayoutEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    loopRef.current = loop
    lidRef.current = stageRef.current.querySelector('.g-lid')
    glowRef.current = stageRef.current.querySelector('.g-glow')
    layout()
    const onResize = () => { layout(); apply(sim.current.q, performance.now() / 1000) }
    window.addEventListener('resize', onResize)
    // the heading and web fonts can shift the layout after first paint
    const t = setTimeout(onResize, 600)
    document.fonts?.ready.then(onResize)
    sim.current.raf = requestAnimationFrame(loop)
    const s = sim.current
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(t)
      cancelAnimationFrame(s.raf)
    }
  }, [layout, apply, loop])

  const unwrap = () => {
    const s = sim.current
    if (s.go) return
    s.go = true
    s.t0 = performance.now()
    setTapped(true)
    cancelAnimationFrame(s.raf)
    s.raf = requestAnimationFrame(loop)
  }

  const showTip = (i) => {
    const s = sim.current
    s.hot = i
    toolRefs.current.forEach((b, k) => b && b.classList.toggle('on', k === i))
    ringRef.current.classList.toggle('hov', i >= 0)
    if (i < 0 || !toolRefs.current[i]?.classList.contains('set')) {
      setTip(null)
      ringRef.current.classList.remove('hov')
      return
    }
    // sit right next to the hovered tile: outside edge first, flip inward if there is no room
    const g = geo.current
    const [px, py] = toolPos(i)
    const w = g.mobile ? 220 : 300
    const gap = g.mobile ? 40 : 58
    const vw = window.innerWidth
    let tx
    let ty = py
    if (g.mobile) {
      tx = clamp(px, -vw / 2 + w / 2 + 12, vw / 2 - w / 2 - 12)
      ty = py < g.gtop + g.py ? py + gap + 60 : py - gap - 56
    } else {
      const out = px >= 0 ? 1 : -1
      tx = px + out * (gap + w / 2)
      if (Math.abs(tx) + w / 2 > vw / 2 - 16) tx = px - out * (gap + w / 2)
    }
    setTip({ i, x: tx, y: ty, w })
  }

  const tool = tip ? tools[tip.i] : null

  return (
    <section id="stack" className={`stack${tapped ? ' tap opened' : ''}`}>
      <Gradients />
      <div className="stack-pin" ref={pinRef}>
        <div className="stack-head" ref={headRef}>
          <p className="work-eyebrow"><span aria-hidden="true">✸</span> {stackSection.eyebrow}</p>
          <h2>{stackSection.title} <mark>{stackSection.highlight}</mark></h2>
          <p className="stack-sub">Fourteen tools I know well, from the first line of code to the shipped build.</p>
        </div>

        {/* the gift itself is the control: click it, or focus it and press Enter or Space */}
        <div className="gift-stage" ref={stageRef} onClick={unwrap} role="button" tabIndex={tapped ? -1 : 0} aria-label={tapped ? undefined : 'Unwrap the gift to see my stack'}
          onKeyDown={(e) => { if (!tapped && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); unwrap() } }}>
          <div className="burst" ref={burstRef} aria-hidden="true" />
          <div className="beam" ref={beamRef} aria-hidden="true" />
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 14 }, (_, k) => (
              <i key={k} style={{ '--x0': `${((k * 37) % 120) - 60}px`, '--x1': `${((k * 71) % 260) - 130}px`, '--d': `${(-k * 0.41).toFixed(2)}s`, '--s': (0.4 + ((k * 29) % 10) / 14).toFixed(2) }} />
            ))}
          </div>
          <div className="gift" ref={giftRef}>
            <Gift />
          </div>
          <div className="ring" ref={ringRef}>
            {tools.map((t, i) => (
              <button
                key={t.name}
                ref={(el) => { toolRefs.current[i] = el }}
                type="button"
                className="tool"
                style={{ '--i': i, '--tb': t.bg, '--tf': t.fg }}
                aria-label={`${t.name}: ${t.note}`}
                onPointerEnter={(e) => e.pointerType === 'mouse' && showTip(i)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && showTip(-1)}
                onFocus={() => showTip(i)}
                onBlur={() => showTip(-1)}
                onClick={() => showTip(sim.current.hot === i ? -1 : i)}
              >
                <span className="ti" aria-hidden="true"><Mark t={t} /></span>
                <span className="tn">{t.name}</span>
              </button>
            ))}
          </div>
          <div className={`tool-tip${tool ? ' in' : ''}`} style={tip ? { left: tip.x, top: tip.y, width: tip.w } : undefined} aria-hidden="true">
            {tool && (
              <>
                <div className="tt-head">
                  <span className="ti" style={{ '--tb': tool.bg, '--tf': tool.fg }}><Mark t={tool} /></span>
                  <span><b>{tool.name}</b><small>{tool.cat}</small></span>
                </div>
                <p>{tool.note}</p>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
