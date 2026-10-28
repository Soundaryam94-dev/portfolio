import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import InfoSheet from './InfoSheet'
import CaseStudy from './CaseStudy'
import { workSection } from './data'

// Geometry and motion copied from the reference "box" (px, in the box's own flat plane)
const BOX_W = 660
const BOX_D = 260
const WALL_H = 96
const CARD_W = 224
const CARD_H = 304
const VIEW_X = 57 // resting tilt of the box
const VIEW_Z = 30
const SUNK = -(CARD_H - WALL_H + 40) // cards start sunk below the floor
const LIFT = 70 // how far a hovered card rises

const stand = (z) => `translate3d(0px, 0px, ${z}px) rotateZ(-90deg) rotateX(-90deg) rotateY(0deg)`
const faced = (x) => `translate3d(${(BOX_W / 2 - x).toFixed(1)}px, ${BOX_D * 0.95}px, 210px) rotateZ(${-VIEW_Z}deg) rotateX(${-VIEW_X}deg) rotateY(0deg)`
// a sunk card is clipped at the floor, so nothing pokes out underneath
const rim = (z, settled) => (z < 0 ? `inset(${z <= SUNK ? 0 : -90}px -90px ${-z}px -90px)` : settled ? 'none' : 'inset(-90px -90px 0px -90px)')
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (t) => t * t * (3 - 2 * t)

// "Selected work": a tilted open box of standing cards.
// The box opens as it scrolls into view, follows the cursor, lifts the hovered card, and a click lifts a card out
// and turns it to face you before its popup opens. Content lives in `workSection` in data.js.
export default function Work() {
  const { projects } = workSection
  const reduce = useReducedMotion()
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const areaRef = useRef(null)
  const fitRef = useRef(null)
  const boxRef = useRef(null)
  const cardRefs = useRef([])
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  const [opened, setOpened] = useState(false)
  const [risen, setRisen] = useState(() => projects.map(() => false))
  const [settled, setSettled] = useState(() => projects.map(() => false))
  const [hover, setHover] = useState(null)
  const [picked, setPicked] = useState(null)
  const [sheet, setSheet] = useState(null)
  const live = useRef({ opened: false, picked: null })
  live.current = { opened, picked }

  // a shared link like /#case/websiteextractor opens that case study directly
  useEffect(() => {
    const m = window.location.hash.match(/^#case\/(.+)$/)
    const i = m ? projects.findIndex((p) => p.caseStudy?.slug === m[1]) : -1
    if (i >= 0) {
      setPicked(i)
      setSheet(i)
    }
  }, [projects])

  // open when the box has scrolled into view (the reference opens at ~30% from the top)
  useEffect(() => {
    const check = () => {
      const el = stageRef.current
      if (el && el.getBoundingClientRect().top < window.innerHeight * (window.innerWidth < 860 ? 0.6 : 0.3)) setOpened(true)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  // cards rise one after another once the lid starts opening
  useEffect(() => {
    if (!opened) return undefined
    const timers = []
    projects.forEach((_, i) => {
      timers.push(setTimeout(() => setRisen((r) => r.map((v, k) => (k === i ? true : v))), reduce ? 0 : 800 + i * 130))
      timers.push(setTimeout(() => setSettled((r) => r.map((v, k) => (k === i ? true : v))), reduce ? 0 : 800 + i * 130 + 1300))
    })
    return () => timers.forEach(clearTimeout)
  }, [opened, projects, reduce])

  // one frame loop: cursor tilt + sizing the box into the space between the heading and the legend
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const rot = { x: VIEW_X, z: VIEW_Z, ok: false }
    let cur = 0
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const { opened: isOpen, picked: isPicked } = live.current
      const p = pointer.current
      const pe = 1 - Math.exp(-dt * 3)
      p.x += (p.tx - p.x) * pe
      p.y += (p.ty - p.y) * pe
      const tilt = reduce || isPicked != null || !isOpen ? 0 : 1
      const tx = VIEW_X - p.y * 2.5 * tilt
      const tz = VIEW_Z + p.x * 4.5 * tilt
      const k = !rot.ok || !dt ? 1 : 1 - Math.exp(-dt * (isPicked != null ? 12 : 6))
      rot.ok = true
      rot.x += (tx - rot.x) * k
      rot.z += (tz - rot.z) * k
      if (boxRef.current) boxRef.current.style.transform = `rotateX(${rot.x.toFixed(2)}deg) rotateZ(${rot.z.toFixed(2)}deg)`

      const area = areaRef.current
      const track = trackRef.current
      if (area && track && fitRef.current && isPicked == null) {
        const { width, height } = area.getBoundingClientRect()
        const fit = Math.min(height / 700, width / 840, 1.15)
        const r = track.getBoundingClientRect()
        const q = clamp((window.innerHeight - r.top) / r.height)
        const want = window.innerWidth < 860 || reduce ? fit : fit * (0.5 + 0.5 * smooth(clamp(q / 0.42)))
        cur = !cur || reduce ? want : cur + (want - cur) * (1 - Math.exp(-dt * 6))
        fitRef.current.style.transform = `scale(${cur.toFixed(4)})`
        fitRef.current.style.top = `${(height / 2 + 99 * cur).toFixed(1)}px`
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  const cardX = (i) => 108 + i * ((BOX_W - 216) / (projects.length - 1))
  const zOf = (i) => (!risen[i] ? SUNK : hover === i ? LIFT : 0)

  const enter = (i) => {
    if (picked != null || !opened) return
    setHover(i)
  }
  const leave = (i) => {
    if (picked != null) return
    setHover((h) => (h === i ? null : h))
  }

  // click: lift the card out of the box, turn it to face you, then open its popup
  const pick = useCallback((i) => {
    if (picked != null || !opened) return
    const el = cardRefs.current[i]
    if (!el) return
    setPicked(i)
    setHover(null)
    const z = risen[i] ? 0 : SUNK
    el.style.transition = 'none'
    const anim = el.animate(
      [{ transform: stand(z) }, { transform: stand(CARD_H + 60), offset: 0.38 }, { transform: faced(cardX(i)) }],
      { duration: reduce ? 1 : 1500, easing: 'cubic-bezier(.55, 0, .15, 1)', fill: 'forwards' },
    )
    anim.onfinish = () => {
      el.style.transform = faced(cardX(i))
      anim.cancel()
      setSheet(i)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked, opened, risen, reduce])

  // popup closed: bring the card back into the box
  const closeSheet = () => {
    const i = sheet
    setSheet(null)
    const el = cardRefs.current[i]
    if (el == null) {
      setPicked(null)
      return
    }
    const anim = el.animate(
      [{ transform: faced(cardX(i)) }, { transform: stand(CARD_H + 60), offset: 0.62 }, { transform: stand(0) }],
      { duration: reduce ? 1 : 1200, easing: 'cubic-bezier(.2, .9, .25, 1)', fill: 'forwards' },
    )
    anim.onfinish = () => {
      el.style.transform = stand(0)
      anim.cancel()
      el.style.transition = ''
      setPicked(null)
    }
  }

  const onStageMove = (e) => {
    if (e.pointerType !== 'mouse') return
    pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1
    pointer.current.ty = (e.clientY / window.innerHeight) * 2 - 1
    // the hover stays on a card until the pointer reaches another card or leaves the box, so a lifted card never flickers
    // (the title list below the box counts too: hovering a title highlights its card and must not be cleared by the next move)
    if (hover != null && picked == null && !e.target.closest('.box3, .box-info, .bi-list')) setHover(null)
  }
  const onStageLeave = () => {
    pointer.current.tx = 0
    pointer.current.ty = 0
    if (hover != null && picked == null) setHover(null)
  }

  const active = hover ?? picked
  const accent = active != null ? projects[active].accent : null

  return (
    <section id="work" className="work">
      <div className="box-track" ref={trackRef}>
        <div className={`box-stage${opened ? ' opened' : ''}`} ref={stageRef} onPointerMove={onStageMove} onPointerLeave={onStageLeave}>
          <div className="box-halo" />

          <div className={`box-info${opened ? ' in' : ''}`} style={accent ? { '--c': accent } : undefined}>
            <p className="work-eyebrow"><span aria-hidden="true">✸</span> {workSection.eyebrow}</p>
            <h2>{workSection.title} <mark>{workSection.highlight}</mark></h2>
            <p className="work-intro">{workSection.intro}</p>
          </div>

          <div className="box-area" ref={areaRef}>
            <div className="box-fit" ref={fitRef}>
              <div className="box3" ref={boxRef}>
                <div className="box-shadow" />
                <div className="box-floor"><i /></div>
                <div className="f wall-i" style={{ width: BOX_W, height: WALL_H, left: 0, top: -WALL_H, transform: 'rotateX(-90deg)' }} />
                <div className="f wall-i" style={{ width: BOX_D, height: WALL_H, left: -BOX_D / 2, top: BOX_D / 2 - WALL_H, transform: 'rotateZ(90deg) rotateX(-90deg)' }} />
                <div
                  className="f box-lid"
                  style={{ width: BOX_W, height: BOX_D, left: 0, top: -BOX_D, transform: `translate3d(0px, 0px, ${WALL_H}px) rotateX(${opened ? -72 : -180}deg)` }}
                >
                </div>

                {projects.map((p, i) => {
                  const z = zOf(i)
                  const group = p.sheet?.groups?.[0]
                  const isPicked = picked === i
                  return (
                    <button
                      key={p.title}
                      ref={(el) => { cardRefs.current[i] = el }}
                      className={`wk${hover === i ? ' hover' : ''}${isPicked ? ' out' : ''}`}
                      type="button"
                      aria-label={`${p.title}, open details`}
                      style={{
                        '--bg': p.gradient, '--glow': p.accent, '--c': p.accent,
                        left: cardX(i) - CARD_W / 2, top: BOX_D / 2 - CARD_H,
                        transform: isPicked ? faced(cardX(i)) : stand(z),
                        clipPath: isPicked ? 'none' : rim(z, settled[i]),
                        transition: isPicked ? 'none' : 'transform 1.2s cubic-bezier(.2, .9, .25, 1), clip-path 1.2s cubic-bezier(.2, .9, .25, 1), box-shadow .5s, filter .5s',
                      }}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && enter(i)}
                      onFocus={() => enter(i)}
                      onBlur={() => leave(i)}
                      onClick={() => pick(i)}
                    >
                      <span className="wk-top">
                        <span className="wk-ic" aria-hidden="true">{p.icon}</span>
                        <span className="wk-tag">{String(i + 1).padStart(2, '0')}</span>
                      </span>
                      <img className="wk-shot" src={p.image} alt="" loading="lazy" />
                      <span className="wk-body">
                        <span className="wk-mid">{p.short}</span>
                        <span className="wk-sub">{p.stack}</span>
                      </span>
                      <span className="wk-bk" aria-hidden="true">
                        <span className="wb-k">{(group?.label ?? 'Details').toUpperCase()}</span>
                        <span className="wb-l">
                          {(group?.items ?? []).slice(0, 4).map((it) => (
                            <span key={it}>
                              <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                              {it}
                            </span>
                          ))}
                        </span>
                        <span className="wb-go">Open details →</span>
                      </span>
                    </button>
                  )
                })}

                <div className="f wall-o" style={{ width: BOX_D, height: WALL_H, left: BOX_W - BOX_D / 2, top: BOX_D / 2 - WALL_H, transform: 'rotateZ(-90deg) rotateX(-90deg)' }} />
                <div className="f wall-o" style={{ width: BOX_W, height: WALL_H, left: 0, top: BOX_D - WALL_H, transform: 'rotateX(-90deg)' }}>
                  <span className="wall-text">{workSection.stamp}</span>
                </div>
              </div>
            </div>
          </div>

          <ol
            className="bi-list"
            onPointerOver={(e) => {
              const b = e.target.closest('[data-k]')
              if (b) enter(+b.dataset.k)
            }}
          >
            {projects.map((p, i) => (
              <li key={p.title}>
                <button type="button" data-k={i} className={active === i ? 'on' : ''} style={{ '--c': p.accent }} onClick={() => pick(i)}>
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <em>{p.short}</em>
                  <span>{p.legend}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {projects.map((p, i) => (
        p.caseStudy
          ? <CaseStudy key={p.title} study={p.caseStudy} accent={p.accent} open={sheet === i} onClose={closeSheet} />
          : <InfoSheet key={p.title} id={`work-${i}`} content={p.sheet} open={sheet === i} onClose={closeSheet} />
      ))}
    </section>
  )
}
