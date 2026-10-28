import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { motion } from 'framer-motion'
import Scene from './Scene'
import Work from './Work'
import Stack from './Stack'
import Contact from './Contact'
import { profile, pins } from './data'
import './App.css'

const sections = ['home', 'work', 'stack', 'contact']
const labels = { home: 'Home', work: 'Work', stack: 'Stack', contact: 'Contact' }

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

function Nav({ theme, onToggle }) {
  const active = useActiveSection()
  const resume = profile.links.find((l) => l.label === 'Resume')?.href
  return (
    <>
      <div className="top-bar">
        <button className="theme-chip" onClick={onToggle} aria-label="Toggle day and night mode" title="Click to switch day / night">
          {theme === 'dark' ? <><svg className="mode-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" /></svg></> : <><svg className="mode-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" /></svg></>}
        </button>
      </div>
      <motion.nav
        className="pill-nav"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
      >
        {sections.map((s) => (
          <a key={s} href={`#${s}`} className={active === s ? 'active' : ''}>
            {active === s && <motion.span layoutId="nav-bg" className="nav-bg" />}
            <span className="nav-label">{labels[s]}</span>
          </a>
        ))}
        <span className="nav-sep" aria-hidden="true" />
        <a href={resume} className="resume-btn" target="_blank" rel="noreferrer">Resume ↗</a>
      </motion.nav>
    </>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <Scene pins={pins} />
    </section>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme-v2') || 'light'
    } catch {
      return 'light'
    }
  })

  // day <-> night as one smooth crossfade of the whole page (sky, sun and moon, lights, buildings, sections), in both
  // directions; browsers without page transitions (or with reduced motion) switch at once as before
  const switchTheme = (next) => {
    const apply = () => flushSync(() => setTheme(next))
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || still) { apply(); return }
    document.startViewTransition(() => {
      apply()
      document.documentElement.dataset.theme = typeof next === 'function' ? next(document.documentElement.dataset.theme) : next
    })
  }

  useEffect(() => {
    const flip = () => switchTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    window.addEventListener('toggle-theme', flip)
    return () => window.removeEventListener('toggle-theme', flip)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme-v2', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  return (
    <>
      <Nav theme={theme} onToggle={() => switchTheme(theme === 'dark' ? 'light' : 'dark')} />
      <Hero />
      <main>
        <Work />
        <Stack />
        <Contact />
      </main>
    </>
  )
}
