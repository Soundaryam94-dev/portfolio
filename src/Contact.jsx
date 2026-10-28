import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile, contactSection } from './data'

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const ICONS = {
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  github: <path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.500 2.900 5.500 3.200 5.500 3.200a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.600c0 4.700 2.800 5.700 5.500 6A2.800 2.800 0 0 0 8.700 17.800V21" />,
  linkedin: <path d="M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.600c.8-1.200 2-1.900 3.600-1.900 3 0 3.400 2 3.400 4.600V20h-4v-5.600c0-1.200-.2-2.200-1.600-2.200S14 13.200 14 14.400V20h-4z" />,
  file: <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />,
}

// Closing section: a big headline on a sky gradient and a card of ways to reach me.
// Tiles also answer to keyboard shortcuts (M, G, L, R). Content lives in `contactSection` in data.js.
// Copies my email address to the clipboard (with an older fallback for browsers or contexts without the Clipboard API).
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = profile.email; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'
    document.body.appendChild(ta); ta.select()
    let ok = false
    try { ok = document.execCommand('copy') } catch { ok = false }
    ta.remove()
    return ok
  }
}

// EmailJS settings come from Vite environment variables (see .env.example). None of them is a secret: EmailJS is designed so the
// service ID, template ID and public key live in the browser; the private key is never used here. Without them, Send falls back
// to opening Gmail's compose screen as before.
const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const EMAILJS_READY = Boolean(EMAILJS.service && EMAILJS.template && EMAILJS.publicKey)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_MESSAGE = 10, MAX_MESSAGE = 5000, SEND_TIMEOUT = 15000, COOLDOWN = 20000

// checks every field and returns an { field: message } map (empty when the form is fine)
function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Please add your name.'
  if (!f.email.trim()) e.email = 'Please add your email so I can reply.'
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'That email address doesn\u2019t look right.'
  const n = f.body.trim().length
  if (!n) e.body = 'Write a message first.'
  else if (n < MIN_MESSAGE) e.body = `A little more, please (at least ${MIN_MESSAGE} characters).`
  else if (n > MAX_MESSAGE) e.body = `Please keep it under ${MAX_MESSAGE} characters.`
  return e
}

// A Gmail-style "New message" window. With EmailJS set up, Send delivers the message straight to my inbox; the visitor's email is
// used as the reply-to address.
const EMPTY = { name: '', email: '', subject: '', body: '', company: '' } // `company` is a hidden honeypot only bots fill in

function Compose({ f, setF, onClose, onCopy }) {
  const empty = EMPTY
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const sendingRef = useRef(false) // blocks a second submit before React has re-rendered the disabled button
  const cooldownRef = useRef(0)
  useEffect(() => () => clearTimeout(cooldownRef.current), [])
  const set = (k) => (e) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }))
    if (errors[k]) setErrors((prev) => { const n = { ...prev }; delete n[k]; return n })
    if (status === 'error') setStatus('idle')
  }
  const text = () => `${f.body.trim()}${f.name.trim() ? `

— ${f.name.trim()}` : ''}`
  const subject = () => f.subject.trim() || `Hello ${profile.name}`
  const gmail = () => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject())}&body=${encodeURIComponent(text())}`

  const send = async (e) => {
    e.preventDefault()
    if (sendingRef.current || status === 'sending' || status === 'sent') return
    const found = validate(f)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`gm-${Object.keys(found)[0]}`)?.focus()
      return
    }
    if (!EMAILJS_READY) { window.open(gmail(), '_blank', 'noopener'); return } // not configured: the old Gmail hand-off
    if (f.company) { setStatus('sent'); setF(empty); return } // a bot filled the hidden field: pretend it worked, send nothing
    sendingRef.current = true
    setStatus('sending')
    try {
      const { default: emailjs } = await import('@emailjs/browser') // loaded only when someone actually sends
      const params = {
        from_name: f.name.trim(),
        from_email: f.email.trim(),
        reply_to: f.email.trim(),
        subject: subject(),
        message: f.body.trim(),
        to_name: profile.name,
      }
      await Promise.race([
        emailjs.send(EMAILJS.service, EMAILJS.template, params, { publicKey: EMAILJS.publicKey }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), SEND_TIMEOUT)),
      ])
      setStatus('sent')
      setF(empty)
      cooldownRef.current = setTimeout(() => setStatus('idle'), COOLDOWN) // a short pause before another message can go
    } catch {
      setStatus('error') // the typed message stays, so nothing is lost
    } finally {
      sendingRef.current = false
    }
  }

  const busy = status === 'sending'
  const fieldProps = (k) => ({ id: `gm-${k}`, 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `gm-${k}-err` : undefined, disabled: busy })
  return (
    <form className="gm" onSubmit={send} aria-labelledby="gm-title" noValidate aria-busy={busy}>
      <div className="gm-bar"><span id="gm-title">New message</span><button type="button" className="gm-x" onClick={onClose} aria-label="Close">×</button></div>
      <div className="gm-row"><span>To</span><button type="button" className="gm-chip gm-copy" onClick={onCopy} title="Copy email address" aria-label={`Copy email address ${profile.email}`}>{profile.email}</button></div>
      <label className={`gm-row${errors.name ? ' bad' : ''}`}><span>From</span><input {...fieldProps('name')} value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" maxLength={100} /></label>
      {errors.name && <p className="gm-err" id="gm-name-err">{errors.name}</p>}
      <label className={`gm-row${errors.email ? ' bad' : ''}`}><span>Email</span><input {...fieldProps('email')} type="email" inputMode="email" value={f.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" maxLength={150} /></label>
      {errors.email && <p className="gm-err" id="gm-email-err">{errors.email}</p>}
      <label className="gm-row"><span>Subject</span><input id="gm-subject" disabled={busy} value={f.subject} onChange={set('subject')} placeholder="Optional" maxLength={150} /></label>
      <textarea className={`gm-body${errors.body ? ' bad' : ''}`} {...fieldProps('body')} value={f.body} onChange={set('body')} placeholder="Hi Soundarya, …" aria-label="Message" rows={7} maxLength={MAX_MESSAGE + 200} />
      {errors.body && <p className="gm-err" id="gm-body-err">{errors.body}</p>}
      {/* honeypot: hidden from people and screen readers; bots that fill every field give themselves away */}
      <input className="gm-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.company} onChange={set('company')} name="company" />
      <div className="gm-foot">
        <button type="submit" className={`gm-send${busy ? ' busy' : ''}`} disabled={busy || status === 'sent'}>
          {busy ? <><span className="gm-spin" aria-hidden="true" />Sending…</> : status === 'sent' ? <>Sent <span aria-hidden="true">✓</span></> : <>Send <span aria-hidden="true">▸</span></>}
        </button>
      </div>
      <p className={`gm-status ${status}`} role="status" aria-live="polite">
        {status === 'sent' && 'Thanks! Your message is on its way to my inbox. I\u2019ll get back to you soon.'}
        {status === 'error' && <>Sorry, that didn&rsquo;t go through. Please try again in a moment, or email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
      </p>
      {status !== 'sent' && status !== 'error' && (
        <p className="gm-note">{EMAILJS_READY ? 'Your message goes straight to my inbox. I\u2019ll reply to the email you give.' : 'Send opens Gmail in a new tab with your message ready.'}</p>
      )}
    </form>
  )
}

// A centred popup holding the message form: dimmed backdrop, close with ×, Esc or a click outside, the page behind stops
// scrolling, Tab stays inside, and focus returns to whatever opened it.
function MailModal({ open, onClose, children }) {
  const boxRef = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    // lock the page behind (and keep it from shifting where the scrollbar was)
    const root = document.documentElement, gap = window.innerWidth - root.clientWidth
    const prev = { overflow: root.style.overflow, pad: document.body.style.paddingRight }
    root.style.overflow = 'hidden'; if (gap > 0) document.body.style.paddingRight = `${gap}px`
    const focusables = () => [...boxRef.current.querySelectorAll('button, input:not(.gm-hp), textarea, a[href]')].filter((e) => !e.disabled)
    const t = setTimeout(() => boxRef.current?.querySelector('#gm-name')?.focus(), 60)
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return }
      if (e.key !== 'Tab' || !boxRef.current) return
      const list = focusables(); if (!list.length) return
      const first = list[0], last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      clearTimeout(t); window.removeEventListener('keydown', onKey, true)
      root.style.overflow = prev.overflow; document.body.style.paddingRight = prev.pad
      opener?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="mail-modal-wrap" key="mail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
          <motion.div ref={boxRef} className="mail-modal" role="dialog" aria-modal="true" aria-labelledby="gm-title"
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default function Contact() {
  const [mailOpen, setMailOpen] = useState(false)
  const [draft, setDraft] = useState(EMPTY) // what someone has typed stays if they close the popup and come back
  const closeMail = useCallback(() => setMailOpen(false), [])
  // the To address in the message popup copies it, and a small toast confirms
  const [toast, setToast] = useState('')
  const toastTimer = useRef(0)
  const onCopy = async (e) => {
    e?.preventDefault?.()
    const ok = await copyEmail()
    setToast(ok ? 'Email copied!' : `Copy failed: ${profile.email}`)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2200)
  }
  useEffect(() => () => clearTimeout(toastTimer.current), [])
  const tiles = contactSection.tiles.map((t) => ({
    ...t,
    href: t.kind === 'mail' ? `mailto:${profile.email}` : profile.links.find((l) => l.label === t.link)?.href,
  }))

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('input, textarea, [contenteditable], [role=dialog]')) return
      if (document.querySelector('.me-sheet')) return
      const t = tiles.find((x) => x.key.toLowerCase() === e.key.toLowerCase())
      if (!t || !t.href) return
      if (t.kind === 'mail') setMailOpen(true)
      else window.open(t.href, '_blank', 'noopener')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tiles])

  return (
    <section id="contact" className="contact">
      <div className="contact-sky" aria-hidden="true" />
      <div className="contact-inner">
        <motion.h2 {...reveal}>
          {/* two fixed lines: "Let's build" / "something together." */}
          <span className="ct-line">{contactSection.title.split(' ').slice(0, -1).join(' ')}</span>{' '}
          <span className="ct-line">{contactSection.title.split(' ').slice(-1)[0]} <mark>{contactSection.highlight}</mark></span>
        </motion.h2>
        <motion.p {...reveal} className="contact-sub">{contactSection.sub}</motion.p>


        <motion.div {...reveal} className="contact-card">
          <p className="contact-keys">
            psst, these work on your keyboard too:
            {tiles.map((t) => <kbd key={t.key}>{t.key}</kbd>)}
          </p>
          <div className="contact-grid">
            {tiles.map((t) => (
              <a
                key={t.key}
                className="c-tile"
                style={{ '--c': t.color }}
                href={t.href}
                target={t.kind === 'mail' ? undefined : '_blank'}
                rel="noreferrer"
                onClick={t.kind === 'mail' ? (e) => { e.preventDefault(); setMailOpen(true) } : undefined}
                data-mail={t.kind === 'mail' ? '' : undefined}
                aria-haspopup={t.kind === 'mail' ? 'dialog' : undefined}
              >
                <span className="c-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{ICONS[t.icon]}</svg>
                  <kbd>{t.key}</kbd>
                </span>
                <b>{t.title}</b>
                <small>{t.text}</small>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      <MailModal open={mailOpen} onClose={closeMail}>
        <Compose f={draft} setF={setDraft} onClose={closeMail} onCopy={onCopy} />
      </MailModal>
      <p className={`copy-toast${toast ? ' on' : ''}`} role="status" aria-live="polite">{toast}</p>
      <p className="contact-foot">© {new Date().getFullYear()} {profile.name}</p>
    </section>
  )
}
