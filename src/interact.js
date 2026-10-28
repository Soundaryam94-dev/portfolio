// Interactive cursor, modelled on the behaviour of the reference portfolio: one filled ball replaces the mouse pointer, swells
// over anything clickable, shows a short word on the big targets, shrinks while pressed, and hides over text fields
// (mouse only; touch devices keep the normal pointer). The site has no sounds.

/* ---------------------------------------------------------------- wiring ---------------------------------------------------------------- */
const CLICKABLE = 'a, button, summary, select, label, [role="button"], .pin, .wk, .tool, .cs-frame, .gift-stage'
const TEXT = 'input, textarea, select, [contenteditable="true"], iframe'
// a short word on the big targets, where it isn't obvious what a click does
const WORDS = [
  ['.cs-back, .sheet-close, .cs-lightbox', 'Close'],
  ['.pin:not(.static)', 'Open'],
  ['.c-tile[data-mail]', 'Write'],
  ['.gm-copy', 'Copy'],
  ['.wk', 'View'],
  ['.cs-frame', 'Zoom'],
  ['.theme-chip, .cs-theme', 'Theme'],
  ['.gift-stage:not(.open)', 'Tap'],
]

function startCursor() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
  const root = document.documentElement
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  const ball = document.createElement('div')
  ball.className = 'cc-ball off'
  ball.setAttribute('aria-hidden', 'true')
  ball.appendChild(document.createElement('i'))
  const word = document.createElement('b')
  ball.appendChild(word)
  document.body.appendChild(ball)

  let x = 0
  let y = 0
  let rx = 0
  let ry = 0
  let on = false
  let raf = 0
  const loop = () => {
    rx += (x - rx) * (still ? 1 : 0.28)
    ry += (y - ry) * (still ? 1 : 0.28)
    ball.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
    raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(loop) : 0
  }
  const show = (v) => ball.classList.toggle('off', !v)

  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return
    x = e.clientX
    y = e.clientY
    if (!on) { on = true; rx = x; ry = y; root.classList.add('cc'); show(true) }
    if (!raf) raf = requestAnimationFrame(loop)
  }, { passive: true })

  // checked once when the pointer enters a new element, never while it moves
  document.addEventListener('pointerover', (e) => {
    if (!on || e.pointerType !== 'mouse') return
    const t = e.target
    if (t.closest && t.closest(TEXT)) { show(false); return }
    show(true)
    const hit = t.closest && WORDS.find(([q]) => t.closest(q))
    word.textContent = hit ? hit[1] : ''
    ball.classList.toggle('lbl', !!hit)
    ball.classList.toggle('link', !hit && !!(t.closest && t.closest(CLICKABLE)))
  }, true)
  document.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') ball.classList.add('down') }, true)
  addEventListener('pointerup', () => ball.classList.remove('down'), true)
  root.addEventListener('mouseleave', () => show(false))
  root.addEventListener('mouseenter', () => on && show(true))
}

let started = false
export function startInteractions() {
  if (started || typeof window === 'undefined') return
  started = true
  startCursor()
}
