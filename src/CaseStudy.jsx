import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

function Frame({ src, url, alt, onOpen, tilt = false, natural = false }) {
  return (
    <button type="button" className={`cs-frame${tilt ? ' tilt' : ''}${natural ? ' nat' : ''}`} onClick={onOpen} aria-label={`Enlarge: ${alt}`}>
      <span className="cs-bar" aria-hidden="true"><i /><i /><i /><em>{url}</em></span>
      <img src={src} alt={alt} loading="lazy" />
    </button>
  )
}

function Head({ eyebrow, title, intro }) {
  return (
    <motion.header {...reveal} className="cs-head">
      <p className="cs-kicker"><span aria-hidden="true">✸</span> {eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="cs-intro">{intro}</p>}
    </motion.header>
  )
}

// A full case-study page. Always dark, to match the app it describes and the portfolio's dark theme.
// Content comes from `caseStudy` in data.js. Closing returns to the Work box; the URL hash makes it linkable.
export default function CaseStudy({ study, open, onClose, accent = '#a855f7' }) {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
  const scroller = useRef(null)
  const backRef = useRef(null)
  const pushed = useRef(false)
  const [zoom, setZoom] = useState(null)
  const { scrollYProgress } = useScroll({ container: scroller })
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  const requestClose = () => {
    if (zoom) return setZoom(null)
    if (pushed.current) {
      pushed.current = false
      window.history.back() // popstate below finishes the job
      return
    }
    if (window.location.hash.startsWith('#case/')) window.history.replaceState(null, '', '#work')
    onClose()
  }

  // history entry + scroll lock + keyboard while open
  useEffect(() => {
    if (!open) return undefined
    const hash = `#case/${study.slug}`
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash)
      pushed.current = true
    }
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    const opener = document.activeElement // focus goes back here when the case study closes
    backRef.current?.focus()
    const onPop = () => {
      pushed.current = false
      onClose()
    }
    const onKey = (e) => {
      // Tab stays inside the dialog (it is modal: the page behind is not reachable), wrapping from the last control to the first
      if (e.key === 'Tab') {
        const dlg = backRef.current?.closest('[role=dialog]')
        if (!dlg) return
        const list = [...dlg.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent !== null)
        if (!list.length) return
        const first = list[0], last = list[list.length - 1], cur = document.activeElement
        if (!dlg.contains(cur)) { e.preventDefault(); first.focus() }
        else if (e.shiftKey && cur === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus() }
        return
      }
      if (e.key !== 'Escape') return
      if (zoomRef.current) setZoom(null)
      else requestCloseRef.current()
    }
    window.addEventListener('popstate', onPop)
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prev
      if (opener && opener !== document.body && document.contains(opener)) opener.focus({ preventScroll: true })
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, study.slug])

  const zoomRef = useRef(null)
  const requestCloseRef = useRef(requestClose)
  useEffect(() => {
    zoomRef.current = zoom
    requestCloseRef.current = requestClose
  })

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="case"
          style={{ '--c': accent }}
          role="dialog"
          aria-modal="true"
          aria-label={`${study.title} ${study.highlight} case study`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="cs-progress" style={{ scaleX: bar }} />
          <div className="cs-top">
            <button ref={backRef} className="cs-back" onClick={requestClose} aria-label="Back to portfolio">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <span className="cs-top-title">{study.title} {study.highlight}</span>
            <button type="button" className="cs-theme" onClick={() => window.dispatchEvent(new Event('toggle-theme'))} aria-label="Toggle day and night mode">{dark ? <><svg className="mode-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" /></svg></> : <><svg className="mode-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" /></svg></>}</button>
            <a className="cs-top-live" href={study.liveUrl} target="_blank" rel="noreferrer">{study.topLink || 'Visit live'} ↗</a>
          </div>

          <div className="cs-scroll" ref={scroller}>
            {/* ---------- hero ---------- */}
            <section className="cs-hero">
              <div className="cs-glow" aria-hidden="true" />
              {study.icon && <motion.img initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 18 }} className="cs-icon" src={study.icon} alt="" />}
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="cs-kicker"><span aria-hidden="true">✸</span> {study.kicker}</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <mark>{study.title} {study.highlight}</mark>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="cs-lead">{study.tagline}</motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }} className="cs-cta-row">
                <a className="cs-btn" href={study.liveUrl} target="_blank" rel="noreferrer">{study.cta.button} <span aria-hidden="true">↗</span></a>
                <a className="cs-btn ghost" href="#cs-overview" onClick={(e) => { e.preventDefault(); scroller.current?.querySelector('#cs-overview')?.scrollIntoView({ behavior: 'smooth' }) }}>Read the case study</a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="cs-hero-shot">
                <Frame tilt natural={study.heroNatural} src={(study.heroImage || study.screens.items[0].image)} url={(study.frameUrl || study.liveUrl.replace(/^https:\/\//, '').replace(/\/$/, ''))} alt={`${study.title} ${study.highlight} screenshot`} onOpen={() => setZoom({ image: study.heroImage || study.screens.items[0].image, title: `${study.title} ${study.highlight}` })} />
              </motion.div>
            </section>

            {/* ---------- meta + numbers ---------- */}
            <section className="cs-meta">
              <motion.dl {...reveal}>
                {study.meta.map((m) => (
                  <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
                ))}
              </motion.dl>
              <motion.div {...reveal} className="cs-stats">
                {study.stats.map((s) => (
                  <div key={s.value}><b>{s.value}</b><span>{s.label}</span></div>
                ))}
              </motion.div>
            </section>

            {/* ---------- 1 · overview ---------- */}
            <section className="cs-sec" id="cs-overview">
              <div className="cs-narrow">
                <Head eyebrow={study.overview.eyebrow} title={study.overview.title} />
                {study.overview.paragraphs.map((t) => <motion.p key={t} {...reveal} className="cs-p">{t}</motion.p>)}
              </div>
            </section>

            {/* ---------- 2 · app screens ---------- */}
            <section className="cs-sec">
              <Head eyebrow={study.screens.eyebrow} title={study.screens.title} intro={study.screens.intro} />
              <div className="cs-gallery rows">
                {study.screens.items.map((it, i) => (
                  <motion.figure key={it.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
                    <Frame src={it.image} natural={it.natural} url={it.url || (study.frameUrl || study.liveUrl.replace(/^https:\/\//, '').replace(/\/$/, ''))} alt={`${it.title} screen`} onOpen={() => setZoom(it)} />
                    <figcaption><b>{String(i + 1).padStart(2, '0')} · {it.title}</b><span>{it.text}</span></figcaption>
                  </motion.figure>
                ))}
              </div>
            </section>

            {/* ---------- 3 · features ---------- */}
            <section className="cs-sec">
              <Head eyebrow={study.features.eyebrow} title={study.features.title} />
              <div className="cs-features">
                {study.features.items.map((f, i) => (
                  <motion.article key={f.title} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }}>
                    <span className="cs-ico" aria-hidden="true">{f.icon}</span>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* ---------- 4 · workflow ---------- */}
            <section className="cs-sec">
              <Head eyebrow={study.workflow.eyebrow} title={study.workflow.title} intro={study.workflow.intro} />
              <ol className="cs-flow">
                {study.workflow.steps.map((st, i) => (
                  <motion.li key={st.name} {...reveal} transition={{ ...reveal.transition, delay: 0.05 }}>
                    <span className="cs-node"><b>{i + 1}</b></span>
                    <div>
                      <h3>{st.name}</h3>
                      <p>{st.text}</p>
                      {study.workflow.progress !== false && <span className="cs-pct">{Math.round(((i + 1) / study.workflow.steps.length) * 100)}% of the run</span>}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </section>

            {/* ---------- 5 · output / listing ---------- */}
            {study.output && (
              <section className="cs-sec">
                <Head eyebrow={study.output.eyebrow} title={study.output.title} intro={study.output.intro} />
                {(study.output.chips || study.output.folders) && (
                  <motion.ul {...reveal} className="cs-zip" aria-label={study.output.chipLabel || 'ZIP contents'}>
                    {(study.output.chips || study.output.folders).map((f) => <li key={f}>{f}</li>)}
                  </motion.ul>
                )}
                <div className="cs-gallery rows">
                  {study.output.items.map((it, i) => (
                    <motion.figure key={it.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
                      <Frame src={it.image} natural={it.natural} url={it.file || it.url || study.frameUrl || study.liveUrl.replace(/^https:\/\//, '').replace(/\/$/, '')} alt={`${it.title} screen`} onOpen={() => setZoom(it)} />
                      <figcaption><b>{it.title}</b><span>{it.text}</span></figcaption>
                    </motion.figure>
                  ))}
                </div>
              </section>
            )}

            {/* ---------- 6 · stack ---------- */}
            <section className="cs-sec">
              <Head eyebrow={study.stack.eyebrow} title={study.stack.title} />
              <div className="cs-stack">
                {study.stack.groups.map((g, i) => (
                  <motion.div key={g.label} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
                    <h3>{g.label}</h3>
                    <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
                    <p>{g.note}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ---------- closing ---------- */}
            <section className="cs-end">
              <div className="cs-glow end" aria-hidden="true" />
              <motion.h2 {...reveal}>{study.cta.title}</motion.h2>
              <motion.p {...reveal} className="cs-lead">{study.cta.text}</motion.p>
              <motion.div {...reveal} className="cs-cta-row">
                <a className="cs-btn big" href={study.liveUrl} target="_blank" rel="noreferrer">{study.cta.button} <span aria-hidden="true">↗</span></a>
                <button className="cs-btn ghost" onClick={requestClose}>Back to portfolio</button>
              </motion.div>
            </section>
          </div>

          {/* ---------- screenshot lightbox ---------- */}
          <AnimatePresence>
            {zoom && (
              <motion.div className="cs-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(null)}>
                <motion.img src={zoom.image} alt={zoom.title} initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} />
                <p>{zoom.title}{zoom.file ? ` · ${zoom.file}` : ''} <small>Click or press Esc to close</small></p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
