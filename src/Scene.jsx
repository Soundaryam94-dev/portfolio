import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { educationSheet, yupptvSheet, approachSheet, profile } from './data'


// ---------------------------------------------------------------------------------------------------------------------------
// The hero is a 3D boulevard seen from a camera just above the road, in the spirit of an endless-runner: scrolling moves the camera
// forward down the road. Everything is placed in world metres (x: right of the road's centre line, z: ahead of the start) and
// projected with one pinhole camera, so nearer things are larger and move faster, and the road keeps its perspective toward the
// vanishing point. The sky and sun are effectively at infinity (they barely move).
// ---------------------------------------------------------------------------------------------------------------------------
const ROAD = 5.5        // half the road's width
const WALK = 3          // sidewalk width
const CAM_H = 2.4       // camera height above the road
const TRAVEL = 128      // where the camera ends up (metres down the road)
const START = -10       // where it starts: a little back from the first building, so the opening view has room
const ARRIVE_Z = 152    // the road ends at the arrival building, straight ahead
// the cyclist rides in the right lane a few metres ahead of the camera; pedals turn by the distance travelled
const RIDER = { x: 2.2, ahead: 7, h: 1.8, ar: 0.3892, crank: 0.34 * 2.6 } // ar: the picture's width over its height
const START_Z = 2       // the start line, painted across the road just ahead of where the camera begins
const NEAR = 1.2        // nothing closer than this is drawn
// the four buildings: two on the left, two on the right, at staggered depths (x is the building's centre)
const BUILDINGS = [
  { key: 'b1', src: '/fig/building1.webp', night: '/fig/building1-night.webp', ar: 1.826, side: -1, z: 34, w: 20 }, // night: a full night picture of it
  { key: 'b2', src: '/fig/building2.webp', night: '/fig/building2-night.webp', ar: 1.954, side: 1, z: 58, w: 20 },
  { key: 'b3', src: '/fig/building3.webp', night: '/fig/building3-night.webp', ar: 1.67, side: -1, z: 86, w: 22 },
  { key: 'b4', src: '/fig/building4.webp', night: '/fig/building4-night.webp', ar: 1.503, side: 1, z: 112, w: 20 },
].map((b) => ({ ...b, x: b.side * (ROAD + WALK + 0.6 + b.w / 2), h: b.w / b.ar, lights: b.night || b.src.replace('.webp', '-lights.webp') }))
// street furniture, repeating forever down the road (a fixed pool of elements is recycled as the camera moves)
const TREE_SP = 9, LAMP_SP = 12, POOL = 16
const FIRST_TREE_Z = 4 // the first tree on each side of the road; the trees and the streetlights both start here, nothing stands before it
// a chapter caption for each building, shown while you drive past it (taken from the popups' own text)
const CHAPTERS = {
  // the 2015 card also carries the college sheet's subtitle and its sentence about what the degree gave (taken from data.js, not rewritten)
  edu: { text: 'Bachelor of Technology (B.Tech)', more: { title: educationSheet.subtitle, text: educationSheet.paragraphs[0].split(/(?<=\.)\s+/)[1] } },
  // 2016: the headings, plus the role from the CV (Front-End UI Developer at Syntax Tree, May 2016 – Jul 2017) and its skills
  y2016: { text: 'Software Engineer · Front-End Developer', more: { title: 'Syntax Tree Software Solutions Pvt Ltd, Hyderabad',
    points: ['Built front-end user interfaces', 'Close attention to spacing, interface states and detail', 'HTML · CSS'] } },
  yupptv: { text: 'Trainee Software Engineer at YuppTV', more: { points: yupptvSheet.highlights } },
  // a no-break space before each dot keeps it with the word before, so the list only wraps between technologies
  // the same layout as the other cards: a short title, then the technologies as a detail line
  stack: { when: 'My stack', text: 'Tools & Technologies', more: { text: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'MySQL', 'C', 'C++', 'Figma'].join(' · ') } },
  // the How I work card adds the My Approach sheet's title and its three steps, word for word
  // the same layout as the other cards: the step names as the yellow sub-line, then each step as a plain bullet
  approach: { when: 'My Approach', text: 'How I Work', more: { title: approachSheet.steps.map((st) => st.title).join(' · '), points: approachSheet.steps.map((st) => st.text) } },
}
// the stops on the progress rail: the start, each building (when it is about 20 m ahead) and the arrival
const STOPS = [
  { key: 'start', label: 'Start', camZ: -10 },
  // each stop puts the rider a few metres before its line on the road (camera = line - 7 m rider lead - 4 m)
  { key: 'edu', label: 'Education', camZ: 25 - 11 },
  { key: 'y2016', label: 'Syntax Tree · Front-End Developer', camZ: 46 - 11 },
  { key: 'stack', label: 'Tools & Technologies', camZ: 72 - 11 },
  { key: 'approach', label: 'How I work', camZ: 86 - 11 },
  { key: 'yupptv', label: 'Experience · YuppTV', camZ: 100 - 11 },
  { key: 'arrive', label: 'My Projects', camZ: 124 },
]
// milestones painted on the asphalt, a little before the building they belong to
// `card`: the chapter card this line belongs to. The card shows while the rider approaches the line and hides once she crosses it
const MILESTONES = [
  { z: 25, big: '2015', small: 'B.TECH', card: 'edu' }, // before SVCE (b1)
  { z: 46, big: '2016', small: 'FRONT-END DEV', card: 'y2016' }, // before Syntax Tree (b2)
  { z: 72, big: 'STACK', small: 'MY TOOLS', card: 'stack' }, // before the skills building (b3)
  { z: 86, big: 'HOW', small: 'I WORK', card: 'approach' }, // beside it (its My Approach block)
  { z: 100, big: '2026', small: 'YUPPTV TRAINEE', card: 'yupptv' }, // before YuppTV (b4)
  { z: 122, big: 'BUILT', small: 'MY PROJECTS' },
]
const CARD_LEAD = 18 // how far before its line (metres of road) a card appears (never before the previous line, so they take turns)
// where each milestone's card starts: CARD_LEAD before its line, but not before the line before it
const showFrom = (m) => { const i = MILESTONES.indexOf(m); return Math.max(m.z - CARD_LEAD, i > 0 ? MILESTONES[i - 1].z : -Infinity) }
// night-sky stars: [left %, top %, size px, twinkle delay s], fixed so they stay put between visits
const STARS = [[33.1, 9.5, 1.5, 0.3], [7.6, 24.8, 1.5, 0.3], [42.1, 13.3, 3, 1.7], [81.4, 8.3, 2, 2.5], [58.0, 5.7, 3, 1.6], [95.7, 5.0, 2, 1.2], [15.8, 8.1, 2, 2.2], [67.5, 7.4, 3, 2.6], [37.8, 26.6, 1.5, 2.3], [46.7, 42.7, 2, 1.2], [78.3, 33.1, 2, 0.3], [30.8, 24.3, 2, 2.9], [29.6, 45.1, 1.5, 2.0], [17.8, 17.7, 2.5, 1.7], [94.4, 6.3, 3, 2.3], [86.0, 16.5, 2, 2.4], [82.6, 43.6, 2.5, 2.8], [8.2, 34.4, 2, 2.6], [97.3, 38.3, 2, 2.9], [87.2, 17.9, 2.5, 1.4], [22.9, 15.4, 2, 1.6], [90.0, 24.3, 2, 1.8], [80.7, 40.2, 2, 2.8], [96.7, 32.4, 2.5, 3.8], [16.5, 10.6, 2, 2.6], [3.2, 38.7, 2, 1.1], [2.4, 21.0, 2, 2.4], [32.6, 8.4, 3, 3.8], [45.8, 40.5, 3, 1.6], [40.3, 7.5, 2.5, 0.2], [8.5, 12.0, 2, 0.4], [59.7, 7.4, 3, 0.6], [11.7, 18.6, 1.5, 0.3], [22.0, 19.2, 2, 3.8], [13.1, 24.0, 2.5, 1.9], [31.9, 9.2, 2, 3.0], [41.9, 32.8, 3, 0.1], [93.3, 25.7, 2, 2.8]]
// the top outline of the mountain picture: for 48 equal columns, how far down (as a share of its height) the first mountain pixel is
const RANGE_TOP = [0.203, 0.194, 0.166, 0.132, 0.102, 0.096, 0.062, 0.023, 0.002, 0.026, 0.087, 0.143, 0.207, 0.252, 0.23, 0.213, 0.203, 0.226, 0.275, 0.318, 0.305, 0.303, 0.305, 0.294, 0.311, 0.307, 0.313, 0.298, 0.249, 0.196, 0.181, 0.203, 0.241, 0.222, 0.192, 0.153, 0.105, 0.087, 0.109, 0.122, 0.07, 0.021, 0.021, 0.064, 0.104, 0.137, 0.168, 0.198]
// the clouds: centre and width as shares of the screen width; 'flip' mirrors one so repeats don't look identical.
// Phones (portrait) get two larger ones so the narrow sky isn't crowded
// `depth` 1 is nearest: nearer clouds are bigger, whiter and move more with the pointer; farther ones smaller and fainter
const CLOUDS = [{ x: 0.17, w: 0.21, depth: 1 }, { x: 0.79, w: 0.16, flip: true, depth: 2 }, { x: 0.33, w: 0.09, depth: 3 }]
const CLOUDS_PORTRAIT = [{ x: 0.24, w: 0.46, depth: 1 }, { x: 0.78, w: 0.34, flip: true, depth: 2 }]

const clamp01 = (v) => Math.min(1, Math.max(0, v))

// Where each building image is solid (alpha), at a quarter of its size: used to tell whether a pin is hidden by a nearer building.
const ALPHA = {}
const loadAlpha = (src) => new Promise((done) => {
  const img = new Image()
  img.onload = () => {
    const w = Math.max(1, Math.round(img.naturalWidth / 4)), h = Math.max(1, Math.round(img.naturalHeight / 4))
    const c = document.createElement('canvas'); c.width = w; c.height = h
    const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0, w, h)
    const px = g.getImageData(0, 0, w, h).data, a = new Uint8Array(w * h)
    for (let k = 0; k < w * h; k++) a[k] = px[k * 4 + 3]
    ALPHA[src] = { w, h, a }; done()
  }
  img.onerror = () => done()
  img.src = src
})
const solidIn = (src, r, x, y) => {
  const m = ALPHA[src]; if (!m || !r) return false
  const u = (x - r.x) / r.w, v = (y - r.y) / r.h
  if (u < 0 || v < 0 || u >= 1 || v >= 1) return false
  return m.a[Math.floor(v * m.h) * m.w + Math.floor(u * m.w)] > 128
}

export default function Scene({ pins, children }) {
  const wrap = useRef(null)
  const canvas = useRef(null)

  useEffect(() => {
    const el = wrap.current, cv = canvas.current
    const hero = el?.closest('.hero')
    if (!el || !cv || !hero) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const g = cv.getContext('2d')
    const q = (sel) => [...el.querySelectorAll(sel)]
    const bEls = q('.blv-bld'), treeEls = q('.blv-tree'), lampEls = q('.blv-lamp'), litEls = q('.blv-lit')
    const sky = el.querySelector('.blv-sky'), range = el.querySelector('.blv-range'), cloudEls = q('.blv-cl'), mist = el.querySelector('.blv-mist')
    const rider = el.querySelector('.blv-rider'), footL = el.querySelector('.rd-footL'), footR = el.querySelector('.rd-footR')
    const pinEls = q('.blvd .pin'), capEls = q('.blv-cap'), arrive = el.querySelector('.blv-arrive'), startEl = el.querySelector('.blv-start'), rail = el.querySelector('.blv-rail'), railDots = q('.blv-rail button')
    // the state: target and shown scroll progress, target and shown pointer offset
    let p = 0, pT = 0, mx = 0, my = 0, mxT = 0, myT = 0, last = performance.now(), raf = 0, W = 0, H = 0, dpr = 1
    // arriving at the Projects building hands you to the Work section: once per pass, only when riding forward (scrolling down)
    let armed = true, prevT = 0, holdUntil = 0
    // a jump from an in-page link (the nav, the progress dots…) scrolls fast past the end of the ride; it must land where it was
    // sent, so the hand-off to Work stays off until that scroll has settled
    let jumpUntil = 0
    const onLinkJump = (e) => { const a = e.target.closest?.('a[href^="#"]'); if (a && !a.closest('.blv-arrive')) { jumpUntil = performance.now() + 2500; armed = false } }
    document.addEventListener('click', onLinkJump, true)
    const hold = (e) => { if (performance.now() < holdUntil) e.preventDefault() }
    const readScroll = () => {
      const r = hero.getBoundingClientRect()
      pT = clamp01(-r.top / Math.max(1, r.height - (el.clientHeight || window.innerHeight))) // the scene's own height: steady while a phone's address bar moves
      // while the ride is under way (past the very start, before the arrival) the bottom nav steps aside; it returns at the top,
      // at the end of the ride and everywhere else on the page
      document.documentElement.toggleAttribute('data-riding', pT > 0.07 && pT < 0.96)
      document.documentElement.toggleAttribute('data-rode', pT > 0.01) // the ride has begun: the top-left name label steps aside (back at the very top)
      if (pT < 0.9 && performance.now() > jumpUntil) armed = true
      if (armed && pT >= 0.97 && pT > prevT && performance.now() > jumpUntil) {
        armed = false
        holdUntil = performance.now() + 1200 // leftover wheel / touch momentum is ignored briefly, so you land on Work rather than fly past it
        document.getElementById('work')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      }
      prevT = pT
    }
    const resize = () => {
      W = el.clientWidth; H = el.clientHeight; dpr = Math.min(2, window.devicePixelRatio || 1)
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr)
    }

    let riderBox = null // the rider's picture box (for the window lights' cut-outs)
    const draw = () => {
      el.style.setProperty('--p', p.toFixed(4))
      // the camera: focal length from the screen (a wider lens on a narrow phone so the buildings stay in view), the horizon a little
      // above the middle, the vanishing point nudged by the pointer
      const portrait = W < H
      const F = portrait ? W * 0.95 : Math.min(W * 0.95, H * 1.05)
      const hy0 = H * (portrait ? 0.5 : 0.44), vx = W / 2 - mx * W * 0.012, hy = hy0 - my * H * 0.01
      const camZ = START + p * (TRAVEL - START)
      // on a narrow portrait screen the camera sways toward the building coming up next (like a runner changing lanes), so each
      // building gets its moment on screen; on wider screens it stays on the centre line
      let sway = 0
      if (portrait) {
        let ws = 0.2
        BUILDINGS.forEach((b) => { const wgt = Math.exp(-(((b.z - camZ - 22) / 14) ** 2)); sway += wgt * b.x * 0.36; ws += wgt })
        sway /= ws
        sway = 0 // the camera stays on the centre line, so the rider on it is centred on every screen
      }
      const camX = sway + mx * 0.25
      const P = (x, z, y = 0) => { const d = z - camZ; const s = F / d; return { x: vx + (x - camX) * s, y: hy + (CAM_H - y) * s, s, d } }

      // ---- the ground: grass, sidewalks, road, edge lines and the lane dashes streaming toward the viewer ----
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H)
      const grd = g.createLinearGradient(0, hy, 0, H)
      grd.addColorStop(0, '#8fbf7a'); grd.addColorStop(0.25, '#5e9e4f'); grd.addColorStop(1, '#3f7f38')
      g.fillStyle = grd; g.fillRect(0, hy, W, H - hy)
      const zN = camZ + NEAR, zF = Math.min(camZ + 600, ARRIVE_Z + 4)
      const quad = (x0, x1, z0, z1, col) => {
        const a = P(x0, z0), b = P(x1, z0), c = P(x1, z1), d = P(x0, z1)
        g.fillStyle = col; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.lineTo(c.x, c.y); g.lineTo(d.x, d.y); g.closePath(); g.fill()
      }
      quad(-ROAD - WALK, -ROAD, zN, zF, '#d9d4c7'); quad(ROAD, ROAD + WALK, zN, zF, '#d9d4c7')       // sidewalks
      quad(-ROAD - WALK, -ROAD - WALK + 0.35, zN, zF, '#b9b2a2'); quad(ROAD + WALK - 0.35, ROAD + WALK, zN, zF, '#b9b2a2') // kerbs
      quad(-ROAD, ROAD, zN, zF, '#3c4656')                                                                     // asphalt
      quad(-ROAD + 0.25, -ROAD + 0.45, zN, zF, '#f2efe6'); quad(ROAD - 0.45, ROAD - 0.25, zN, zF, '#f2efe6')    // edge lines
      const DASH = 3, GAP = 6
      for (let n = Math.floor(zN / (DASH + GAP)); n * (DASH + GAP) < Math.min(camZ + 220, ARRIVE_Z - 6); n++) {
        const z0 = Math.max(zN, n * (DASH + GAP)), z1 = n * (DASH + GAP) + DASH
        if (z1 > z0 && !MILESTONES.some((m) => z1 > m.z - 0.5 && z0 < m.z + 5)) quad(-0.13, 0.13, z0, z1, '#f6e7a8') // no dash through a painted milestone
      }
      // the start line: a two-row chequered strip across the road
      if (START_Z > zN) {
        const IN = 0.55, N = 18, sq = (2 * (ROAD - IN)) / N // inset inside the edge lines
        for (let row = 0; row < 2; row++) for (let k = 0; k < N; k++) {
          const x0 = -ROAD + IN + k * sq
          quad(x0, x0 + sq, START_Z + row * 0.32, START_Z + (row + 1) * 0.32, (k + row) % 2 ? 'rgba(242,239,230,.94)' : 'rgba(28,32,42,.9)')
        }
      }
      // milestones painted on the asphalt: the text lies flat on the road, so it is squashed by the perspective like the dashes
      g.textAlign = 'center'; g.textBaseline = 'middle'
      MILESTONES.forEach((m) => {
        const c = P(0, m.z + 2.2)
        if (c.d < 7 || c.d > 140) return
        const len = 4.4, wid = 6.4                         // the marking is 6.4 m across the road and 4.4 m long
        const sx = (wid * c.s) / 600, sy = (CAM_H * F * len) / (c.d * c.d) / 200
        g.save(); g.globalAlpha = clamp01((140 - c.d) / 30) * clamp01((c.d - 7) / 6) * 0.9 // fades out before it fills the screen
        g.setTransform(dpr * sx, 0, 0, dpr * sy, dpr * c.x, dpr * c.y)
        g.fillStyle = '#f2efe6'; g.font = "800 120px 'Plus Jakarta Sans', system-ui, sans-serif"; g.fillText(m.big, 0, -38)
        g.font = "700 54px 'Plus Jakarta Sans', system-ui, sans-serif"; g.fillText(m.small, 0, 58)
        g.restore()
      })
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      // haze toward the horizon, so the far road melts into the sky
      const hz = g.createLinearGradient(0, hy - 2, 0, hy + H * 0.08)
      hz.addColorStop(0, 'rgba(206,232,248,.85)'); hz.addColorStop(1, 'rgba(206,232,248,0)')
      g.fillStyle = hz; g.fillRect(0, hy - 2, W, H * 0.08 + 2)

      // ---- the far layer: the sky (sun and birds) at infinity, drifting a little with the camera ----
      // the far layers (at infinity) move exactly with the horizon, so the sky, sun and moon never slide against the mountains
      const skyDX = vx - W / 2, skyDY = hy - hy0
      sky.style.transform = `translate3d(${skyDX.toFixed(1)}px, ${(p * 26 + skyDY).toFixed(1)}px, 0)`
      // where the moon is on screen (it rides on the sky layer): the night tint leaves a crescent-shaped gap exactly there,
      // so the moon stays bright and clean with no round patch around it
      {
        const vmin = Math.min(window.innerWidth, H) / 100, ms = Math.min(26 * vmin, 230) // the same vmin the CSS uses (100vh = the scene)
        el.style.setProperty('--moon-x', `${(-0.04 * W + 0.5 * 1.08 * W + skyDX).toFixed(1)}px`)
        el.style.setProperty('--moon-y', `${(Math.min(13 * vmin, 115) + 14 + p * 26 + skyDY).toFixed(1)}px`)
        el.style.setProperty('--moon-d', `${(ms * 0.42 - 3).toFixed(1)}px`) // a hair smaller than the moon, so no untinted sky shows at its edge
      }
      // the mountain range on the horizon, kept at the picture's own proportions (4.09 : 1) and wide enough for the pointer drift;
      // its lower part (the near forest) sinks behind the ground, so the peaks and misty hills rise above the horizon
      {
        const rh = Math.max(H * 0.51, (W * 1.15) / 4.09), rw = rh * 4.09, sink = 0.45
        range.style.width = `${rw.toFixed(1)}px`; range.style.height = `${rh.toFixed(1)}px`
        range.style.transform = `translate3d(${(vx - rw / 2).toFixed(1)}px, ${(hy - rh * (1 - sink)).toFixed(1)}px, 0) scale(${(1 + p * 0.07).toFixed(4)})` // the mountains grow a little as you ride toward them
        // each cloud sits just above the highest peak beneath it (its lower third overlaps the mountains, in front of them),
        // whole and inside the screen: kept clear of the edges by its drift range, and never above the top
        const list = portrait ? CLOUDS_PORTRAIT : CLOUDS, drift = W * 0.015
        const vminC = Math.min(window.innerWidth, H) / 100
        // a soft mist along the mountains' foot blends them into the grass (it sits just above the horizon)
        if (mist) { mist.style.transform = `translate3d(0, ${(hy - H * 0.07).toFixed(1)}px, 0)`; mist.style.height = `${(H * 0.075).toFixed(1)}px` }
        cloudEls.forEach((c, i) => {
          const cd = list[i]
          if (!cd) { c.style.visibility = 'hidden'; return }
          const cw0 = Math.min(cd.w * W, 560), ch0 = cw0 * (402 / 1010)
          // Each cloud is laid out once in a resting frame (no scroll, pointer centred): its size, height and side of the sun are
          // fixed there, so nothing about it changes while you scroll or move the mouse. Then it only moves with the horizon
          // (the shared camera shift), a touch more for nearer clouds, and rises a little as you ride.
          const camRoomX = W * 0.012 + 4, camRoomY = H * 0.01 // the most the camera can move it either way
          const rx0 = W / 2 - rw / 2, ry0 = hy0 - rh * (1 - sink)
          let mid = Math.min(Math.max(cd.x * W, 8 + drift + camRoomX + cw0 / 2), W - 8 - drift - camRoomX - cw0 / 2)
          let peak = Infinity
          for (let k = 0; k < RANGE_TOP.length; k++) {
            const x0 = rx0 + (k / RANGE_TOP.length) * rw, x1 = rx0 + ((k + 1) / RANGE_TOP.length) * rw
            if (x1 > mid - cw0 / 2 && x0 < mid + cw0 / 2) peak = Math.min(peak, ry0 + RANGE_TOP[k] * rh)
          }
          if (!Number.isFinite(peak)) peak = hy0
          // the cloud rests just above the highest peak beneath it (its bottom only kisses the tops), with room above it for the
          // camera's movement and the rise during the ride; over a peak too tall for that, it is drawn a little smaller (never below 55%)
          // a cloud under the top-left label keeps clear of it (sits just below it), so the label never hides the cloud
          const chipEl = document.querySelector('.hello-chip:not(.away)'), chipR = chipEl ? chipEl.getBoundingClientRect() : null
          const underChip = chipR && mid - cw0 / 2 < chipR.right + 12
          const TOP_ROOM = Math.max(10 + 10 + camRoomY, underChip ? chipR.bottom + 14 + camRoomY : 0), KISS = 0.06
          const ch = Math.max(ch0 * 0.55, Math.min(ch0, (Math.min(peak, hy0) - TOP_ROOM) / (1 - KISS))), cw = ch * (1010 / 402)
          const top0 = Math.max(TOP_ROOM, Math.min(peak, hy0) + ch * KISS - ch)
          // never across the sun (decided in the resting frame too): a cloud that would reach into the sun's disc steps aside
          const sunX0 = W * 0.5, sunY0 = Math.min(13 * vminC, 115) + 14, sunR = Math.min(26 * vminC, 230) * 0.23 + 18
          if (Math.abs(mid - sunX0) < cw / 2 + sunR && top0 < sunY0 + sunR && top0 + ch > sunY0 - sunR) {
            mid = sunX0 + Math.sign(mid - sunX0 || 1) * (cw / 2 + sunR + drift)
            mid = Math.min(Math.max(mid, 8 + drift + camRoomX + cw / 2), W - 8 - drift - camRoomX - cw / 2)
          }
          const left = mid - cw / 2 + skyDX - mx * (4 / cd.depth), top = top0 + skyDY
          c.style.visibility = 'visible'
          c.style.width = `${cw.toFixed(1)}px`; c.style.height = `${ch.toFixed(1)}px`
          c.style.transform = `translate3d(${left.toFixed(1)}px, ${(top - p * 10).toFixed(1)}px, 0)` // drifts up slightly as you ride
          c.dataset.depth = cd.depth
        })
      }

      // ---- the buildings ----
      const rects = {}
      BUILDINGS.forEach((b, i) => {
        const e = bEls[i]
        const base = P(b.x, b.z)
        if (base.d < NEAR + 0.5) { e.style.visibility = 'hidden'; rects[b.key] = null; return }
        const w = b.w * base.s, h = b.h * base.s, x = base.x - w / 2, y = base.y - h
        e.style.visibility = 'visible'
        e.style.width = `${w.toFixed(1)}px`; e.style.height = `${h.toFixed(1)}px`
        e.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        e.style.zIndex = String(10 + Math.round(1000 - base.d))
        // distance haze: far buildings are paler and softer in contrast, near ones crisp
        const fog = clamp01((base.d - 20) / 90)
        e.style.filter = `saturate(${(1 - fog * 0.45).toFixed(3)}) contrast(${(1 - fog * 0.28).toFixed(3)}) brightness(${(1 + fog * 0.14).toFixed(3)})`
        rects[b.key] = { x, y, w, h, d: base.d, src: b.src }
      })
      // ---- trees and streetlights, recycled down both sides; a slot is skipped where a building stands ----
      const nearCut = portrait ? 9 : NEAR // on a phone, trees and lamps that would fill the narrow screen step out early
      const sprites = [] // the trees placed this frame: { x, y, w, h, d, img } (for the window lights' cut-outs)
      const place = (els, sp, off, xAbs, wM, hM, minD = nearCut, vary = false) => {
        const first = Math.floor((camZ + NEAR) / sp), half = els.length / 2
        // each tree (or lamp) along the road keeps the same element for as long as it is in view (element = its number modulo the
        // pool), so as you ride a tree never swaps its picture or re-fades with its neighbour's (that read as blinking)
        els.forEach((e, j) => {
          const side = j % 2 ? 1 : -1, slot = Math.floor(j / 2)
          const n = first + ((((slot - first) % half) + half) % half), z = n * sp + off
          // no tree where a building stands; on a phone also none in the short stretch just before it, so its pins read on the building
          const blocked = BUILDINGS.some((b) => b.side === side && (Math.abs(b.z - z) < b.w * 0.55 || (portrait && b.z - z > 0 && b.z - z < 26)))
          const pt = P(side * xAbs, z)
          if (blocked || z < FIRST_TREE_Z || z > ARRIVE_Z - 8 || pt.d < minD || pt.d > 160) { e.style.visibility = 'hidden'; return }
          // a varied sprite gets its own fixed size (86-110%) and, for about half, a mirror image, so the row doesn't repeat
          const hv = vary ? (((n * 2654435761) ^ (side > 0 ? 0x9e3779b9 : 0)) >>> 0) / 4294967296 : 0
          const sc = vary ? 0.86 + 0.24 * hv : 1, flip = vary && ((hv * 1000) | 0) % 2 === 1
          const w = wM * pt.s * sc, h = hM * pt.s * sc
          e.style.visibility = 'visible'
          e.style.width = `${w.toFixed(1)}px`; e.style.height = `${h.toFixed(1)}px`
          e.style.transform = flip
            ? `translate3d(${(pt.x + w / 2).toFixed(1)}px, ${(pt.y - h).toFixed(1)}px, 0) scale(-1, 1)`
            : `translate3d(${(pt.x - w / 2).toFixed(1)}px, ${(pt.y - h).toFixed(1)}px, 0)`
          e.style.zIndex = String(10 + Math.round(1000 - pt.d))
          if (vary) sprites.push({ x: pt.x - w / 2, y: pt.y - h, w, h, d: pt.d, img: `/fig/tree-${'abc'[Math.floor(j / 2) % 3]}${flip ? '-flip' : ''}.webp` })
          // far away a sprite fades in with distance; near the cut it is either on or off and the switch fades over time (CSS),
          // so a pole never stays stuck half-transparent when the scroll stops right at the cut
          e.style.opacity = String(pt.d < minD + 0.75 ? 0 : clamp01((160 - pt.d) / 40))
        })
      }
      const wide = W > 1600 ? 0.88 : 1 // very wide screens: smaller trees, so the nearest pair doesn't fill the corners
      place(treeEls, TREE_SP, FIRST_TREE_Z, ROAD + WALK + 2.4, 6.2 * wide, 5.77 * wide, portrait ? nearCut : W > 1600 ? 9 : 7, true) // the tree picture is a little wider than tall (1.075); the nearest step out sooner
      place(lampEls, LAMP_SP, FIRST_TREE_Z, ROAD + 0.5, 1.15, 6.3, Math.max(nearCut, 12)) // evenly spaced from the first tree on; a lamp steps out before it becomes a giant pole at the screen edge

      // ---- the arrival building at the end of the road; its door opens as you reach it ----
      {
        const a = P(0, ARRIVE_Z), w = 30 * a.s, h = 15 * a.s
        arrive.style.width = `${w.toFixed(1)}px`; arrive.style.height = `${h.toFixed(1)}px`
        arrive.style.transform = `translate3d(${(a.x - w / 2).toFixed(1)}px, ${(a.y - h).toFixed(1)}px, 0)`
        arrive.setAttribute('data-placed', '') // shown only once it stands in its place (no flash at the top-left on load)
        arrive.style.zIndex = String(10 + Math.round(1000 - a.d))
        arrive.style.setProperty('--door', clamp01((p - 0.8) / 0.12).toFixed(3))
        arrive.style.setProperty('--fs', `${(h * 0.07).toFixed(1)}px`) // sized so the sign badge fits inside the roof band
        const near = clamp01((p - 0.55) / 0.4)
        arrive.style.setProperty('--near', near.toFixed(3)); arrive.toggleAttribute('data-close', near > 0.75)
        arrive.toggleAttribute('data-near', p > 0.84)
      }
      // ---- night window lights: each building's lit-glass layer sits above the night tint (so the warm light keeps its colour)
      // at exactly the building's place; anything nearer standing in front of it (a tree, another building, the rider) is cut
      // out of the layer by its own shape, so the glow never paints over it. Off (and nothing measured) by day ----
      {
        const night = document.documentElement.dataset.theme === 'dark'
        const order = BUILDINGS.map((b, i) => ({ b, i, r: rects[b.key] })).filter((o) => o.r).sort((a, c) => c.r.d - a.r.d)
        litEls.forEach((e) => { e.style.visibility = 'hidden' })
        order.forEach(({ i, r }, rank) => {
          const e = litEls[i]
          e.style.visibility = 'visible'
          e.style.width = `${r.w.toFixed(1)}px`; e.style.height = `${r.h.toFixed(1)}px`
          e.style.transform = `translate3d(${r.x.toFixed(1)}px, ${r.y.toFixed(1)}px, 0)`
          e.style.zIndex = String(1501 + rank)
          e.style.setProperty('--fog', clamp01((r.d - 20) / 90).toFixed(3))
          if (!night) return
          const hit = (o) => o.x < r.x + r.w && o.x + o.w > r.x && o.y < r.y + r.h && o.y + o.h > r.y
          const cut = []
          sprites.forEach((t) => { if (t.d < r.d && hit(t)) cut.push(t) })
          order.forEach((o) => { if (o.r.d < r.d && hit(o.r)) cut.push({ ...o.r, img: o.b.src }) })
          if (riderBox && riderBox.d < r.d && hit(riderBox)) cut.push(riderBox)
          e.style.setProperty('--lit-mask', ['linear-gradient(#000, #000)', ...cut.map((c) => `url(${c.img})`)].join(', '))
          e.style.setProperty('--lit-size', ['100% 100%', ...cut.map((c) => `${c.w.toFixed(1)}px ${c.h.toFixed(1)}px`)].join(', '))
          e.style.setProperty('--lit-pos', ['0 0', ...cut.map((c) => `${(c.x - r.x).toFixed(1)}px ${(c.y - r.y).toFixed(1)}px`)].join(', '))
          e.style.setProperty('--lit-comp', ['subtract', ...cut.map(() => 'add')].join(', '))
        })
      }
      // ---- the cyclist: stays the same distance ahead, so it holds its place on screen while the world flows past ----
      if (rider) {
        const a = P(0, camZ + RIDER.ahead) // on the yellow centre line, always the same distance ahead
        const hpx = (RIDER.h * F) / RIDER.ahead, wpx = hpx * RIDER.ar
        rider.style.width = `${wpx.toFixed(1)}px`; rider.style.height = `${hpx.toFixed(1)}px`
        const lean = mx * 2
        rider.style.transform = `translate3d(${(a.x - wpx / 2).toFixed(1)}px, ${(a.y - hpx).toFixed(1)}px, 0) rotate(${lean.toFixed(2)}deg)`
        riderBox = { x: a.x - wpx / 2, y: a.y - hpx, w: wpx, h: hpx, d: RIDER.ahead, img: '/fig/rider.webp' }
        rider.style.zIndex = String(10 + Math.round(1000 - RIDER.ahead))
        // pedalling: the crank angle comes from the distance ridden, so scrolling back turns it back. The two feet (with the calf) rise and
        // fall in opposite phase; the rest of the picture stays put.
        const ang = (camZ - START) / RIDER.crank
        const sw = Math.sin(ang) * 1.5
        footL.style.transform = `translateY(${sw.toFixed(3)}%)`
        footR.style.transform = `translateY(${(-sw).toFixed(3)}%)`
      }
      // ---- the rider's speech bubble, beside her right shoulder (below the vanishing point, so My Projects stays in view): its tail
      // points back at her, the bubble kept inside the screen. As soon as the ride starts it fades out over a moment (CSS),
      // so it is never left half-transparent over the scene ----
      if (startEl && rider) {
        const on = camZ + RIDER.ahead < showFrom(MILESTONES[0]) - 0.5 // stays up until the first road card (2015) takes over
        startEl.toggleAttribute('data-off', !on)
        {
          const a = P(0, camZ + RIDER.ahead), hpx = RIDER.h * a.s, wpx = hpx * RIDER.ar // the rider rides on the centre line
          const bw = startEl.offsetWidth, bh = startEl.offsetHeight, TAIL = 24 // the tail hangs this far from the bubble
          startEl.toggleAttribute('data-below', portrait)
          if (portrait) {
            // a phone is too narrow to fit it beside her: it sits below her on the open road, its tail pointing up at her
            const tipX = a.x + wpx * 0.2, tipY = a.y + 6
            const left = Math.min(Math.max(tipX - bw * 0.3, 10), W - bw - 44)
            startEl.style.setProperty('--tail-x', `${(tipX - left).toFixed(1)}px`)
            startEl.style.transform = `translate3d(${left.toFixed(1)}px, ${(tipY + TAIL).toFixed(1)}px, 0)`
          } else {
            // the whole bubble stays to the right of her (clear of her hand and handlebar); the tail reaches back toward her shoulder
            // the bubble keeps its size in proportion to the rider: on a short screen (smaller rider) it is drawn smaller too
            const k = Math.min(1, Math.max(0.7, hpx / 230))
            const tipX = a.x + wpx * 0.5 + 6, tipY = a.y - hpx * 0.7
            const left = Math.min(Math.max(tipX + 2 * k, 10), W - bw * k - 44) // the tail's tip 2px out from the bubble's left edge
            startEl.style.setProperty('--tail-x', `${((tipX - left) / k).toFixed(1)}px`)
            let top = Math.max(tipY - (bh + TAIL) * k, hy + 10) // its top stays below the horizon
            // and below the My Projects building if they would meet (short, wide screens)
            if (arrive) { const ar = arrive.getBoundingClientRect(), host = el.getBoundingClientRect(), ax0 = ar.left - host.left, ax1 = ar.right - host.left, ab = ar.bottom - host.top
              if (left < ax1 && left + bw * k > ax0 && top < ab) top = ab + 8 }
            startEl.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0) scale(${k.toFixed(3)})`
          }
          startEl.style.zIndex = '2900'
          startEl.setAttribute('data-placed', '')
        }
      }
      // ---- the rail fills and marks the stop you are at ----
      if (rail) {
        rail.style.setProperty('--fill', p.toFixed(4))
        let cur = 0
        STOPS.forEach((st, i) => { if (camZ >= st.camZ - 6) cur = i })
        railDots.forEach((dt, i) => { dt.toggleAttribute('data-on', i === cur); dt.toggleAttribute('data-past', i < cur) })
      }
      // ---- the chapter cards follow the rider: a card shows while she rides toward its milestone line (from CARD_LEAD metres
      // before it) and hides the moment she crosses it. It depends only on where she is on the road, so scrolling back works the
      // same way in reverse; a small margin around each edge (hysteresis) stops a card flickering if the scroll rests on an edge ----
      {
        const riderZ = camZ + RIDER.ahead, HYST = 0.4
        capEls.forEach((c) => {
          const m = MILESTONES.find((mm) => mm.card === c.dataset.card)
          if (!m) { c.classList.remove('on'); return }
          const was = c.classList.contains('on')
          const from = showFrom(m) - (was ? HYST : -HYST), to = m.z + (was ? HYST : -HYST)
          c.classList.toggle('on', riderZ >= from && riderZ < to)
        })
      }
      // ---- pins ride on their building; the nearest building in view shows its labels, others show their icons ----
      pinEls.forEach((pin) => {
        const b = BUILDINGS.find((q2) => q2.key === pin.dataset.bld), r = b && rects[b.key]
        let off = !r || r.d < 7 || r.d > 140 || r.w < 26 // only a building too far or too small to read carries no pill
        let x = 0, y = 0
        if (!off) {
          x = r.x + +pin.dataset.fx * r.w; y = r.y + +pin.dataset.fy * r.h
          // when the building is close (or the screen narrow) its anchor can leave the screen while the building is still in view:
          // the pin then slides along its own building to the nearest point that is on screen, so the pill stays attached and readable
          const top = 138, side = 28 // room above the dot for the label, clear of the sound and theme buttons
          // a pin may name the block it belongs to (data-block = "x0 x1 y0 y1" as shares of the building): it only slides within it
          const [bx0, bx1, by0, by1] = (pin.dataset.block || '0.08 0.92 0 0.7').split(' ').map(Number)
          x = Math.min(Math.max(x, Math.max(side, r.x + r.w * bx0)), Math.min(W - side, r.x + r.w * bx1))
          y = Math.min(Math.max(y, Math.max(top, r.y + r.h * by0)), r.y + r.h * by1)
          if (x < r.x + r.w * bx0 - 1 || x > r.x + r.w * bx1 + 1 || y < r.y + r.h * by0 - 1) off = true // its block has left the screen
          if (x < side - 1 || x > W - side + 1 || y < top - 1 || y > H - 70) off = true
          // hidden when a nearer building stands in front of its anchor
          if (!off) for (const o of BUILDINGS) { const ro = rects[o.key]; if (ro && o.key !== b.key && ro.d < r.d && solidIn(ro.src, ro, x, y)) { off = true; break } }
        }
        pin.toggleAttribute('data-off', off)
        if (off) return
        pin.style.left = `${x.toFixed(1)}px`; pin.style.top = `${y.toFixed(1)}px`
        pin.style.zIndex = String(2000 + Math.round(1000 - r.d))
        const k = Math.max(0.62, Math.min(1, 62 / r.d)) // far pills are a little smaller, in perspective
        pin.style.scale = k.toFixed(3); pin.dataset.k = k.toFixed(3)
        pin.toggleAttribute('data-back', false) // the one pill on show is always the full label
      })
      // the building in focus: the nearest one ahead within reach (7–34 m, the same range as the chapter caption, so no pill shows on page load). Only its pill is visible, and only while it can show;
      // a farther building never steps in early just because the focused one's pill is out of view (scrolling back works the same way)
      const focusKey = (BUILDINGS.map((b) => ({ k: b.key, r: rects[b.key] })).filter(({ r }) => r && r.d > 7 && r.d < 34).sort((a, b) => a.r.d - b.r.d)[0] || {}).k
      pinEls.forEach((pin) => pin.toggleAttribute('data-dim', pin.dataset.bld !== focusKey || pin.hasAttribute('data-off')))
      // two pills on the same building (the skills building) never overlap: a later one steps down below an earlier one
      {
        const shown = pinEls.filter((pin) => !pin.hasAttribute('data-off') && !pin.hasAttribute('data-dim'))
        for (let i = 1; i < shown.length; i++) for (let j = 0; j < i; j++) {
          const a = shown[j].querySelector('.chip').getBoundingClientRect(), c = shown[i].querySelector('.chip').getBoundingClientRect()
          if (a.left < c.right + 8 && c.left < a.right + 8 && a.top < c.bottom + 6 && c.top < a.bottom + 6) {
            shown[i].style.top = `${(parseFloat(shown[i].style.top) + (a.bottom - c.top) + 10).toFixed(1)}px`
          }
        }
      }
      // keep the label of an open pin inside the screen (only the label slides; the stem stays on the anchor)
      pinEls.forEach((pin) => {
        const chip = pin.querySelector('.chip'); if (!chip || pin.hasAttribute('data-off')) return
        const cur = +(chip.dataset.nx || 0); let nx = 0
        if (!pin.hasAttribute('data-back') || pin.matches(':hover, :focus-within')) {
          const rc = chip.getBoundingClientRect(), m = 8, left = rc.left - cur, right = rc.right - cur
          if (left < m) nx = m - left; else if (right > window.innerWidth - m) nx = window.innerWidth - m - right
        }
        if (nx !== cur) { chip.dataset.nx = String(nx); chip.style.setProperty('--nx', nx.toFixed(1)) }
        // a marker (not open) that the screen edge would cut, or that a nearer building partly covers, steps out of view instead
        if (pin.hasAttribute('data-back') && !pin.matches(':hover, :focus-within')) {
          const rc = chip.getBoundingClientRect()
          let cut = rc.left < 0 || rc.right > window.innerWidth || rc.top < 0 || rc.bottom > window.innerHeight
          const own = rects[pin.dataset.bld]
          if (!cut && own) for (const o of BUILDINGS) {
            const ro = rects[o.key]
            if (!ro || o.key === pin.dataset.bld || ro.d >= own.d) continue
            for (let a2 = 1; a2 <= 4 && !cut; a2++) for (let c2 = 1; c2 <= 2 && !cut; c2++) if (solidIn(ro.src, ro, rc.left + (rc.width * a2) / 5, rc.top + (rc.height * c2) / 3)) cut = true
            const dd = pin.querySelector('.pd').getBoundingClientRect()
            if (!cut && solidIn(ro.src, ro, dd.left + dd.width / 2, dd.top + dd.height / 2)) cut = true // its dot too
            if (cut) break
          }
          if (cut) pin.toggleAttribute('data-off', true)
        }
      })
    }

    const frame = (now) => {
      raf = 0
      const dt = Math.min(0.1, (now - last) / 1000); last = now
      // frame-rate independent easing toward the targets (the same feel at 30, 60 or 144 frames per second)
      const k = reduced ? 1 : 1 - Math.exp(-dt / 0.11), kp = 1 - Math.exp(-dt / 0.25)
      p += (pT - p) * k; mx += (mxT - mx) * kp; my += (myT - my) * kp
      if (Math.abs(pT - p) < 0.0001) p = pT
      draw()
      if (Math.abs(pT - p) > 0.00005 || Math.abs(mxT - mx) + Math.abs(myT - my) > 0.0005) raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) } }
    const onScroll = () => { readScroll(); if (reduced) { p = pT; draw() } else kick() }
    let lastW = 0
    const onResize = () => {
      const widthChanged = el.clientWidth !== lastW; lastW = el.clientWidth
      resize(); readScroll()
      if (widthChanged || reduced) { p = pT; draw() } else kick()
    }
    const onMove = (e) => {
      if (reduced || !fine || e.pointerType !== 'mouse') return
      if (e.target.closest?.('.blvd .pin, .sheet, [role=dialog]')) { mxT = mx; myT = my; return } // the camera stops where it is while you aim at a pin, so the pin can't slide away
      mxT = (e.clientX / window.innerWidth) * 2 - 1; myT = (e.clientY / window.innerHeight) * 2 - 1
      kick()
    }
    // Night lights. The night look is a darkening layer over the whole scene, so anything bright in the sky would come out dull
    // under it. Each frame (at night only) that layer is told where the stars are, and leaves gaps shaped exactly
    // like them, so they keep their own colours. A star behind a mountain, cloud, building or tree gets no gap,
    // so whatever is in front of it stays dark. By day nothing is measured.
    const stageEl = el.querySelector('.fig-stage.blvd'), rangeEl = el.querySelector('.blv-range')
    const skyEl = el.querySelector('.blv-sky'), cloudInner = q('.blv-cl i'), solids = [...bEls, ...treeEls, arrive]
    const NONE = 'linear-gradient(transparent, transparent)'
    let rkRaf = 0, starKey = '', moonVis = null
    const moonEl = el.querySelector('.blv-moon')
    const flockEl = el.querySelector('.blv-flock'), sunEl = el.querySelector('.blv-sky .fig-sun')
    const nightLoop = () => {
      rkRaf = requestAnimationFrame(nightLoop)
      // the flock never crosses the sun's disc: it fades out while it would overlap it (the disc is the middle ~46% of the sun box)
      if (flockEl && sunEl) {
        const f = flockEl.getBoundingClientRect(), su = sunEl.getBoundingClientRect(), d = su.width * 0.3, cx = su.left + su.width / 2, cy = su.top + su.height / 2
        flockEl.toggleAttribute('data-hide', f.right > cx - d && f.left < cx + d && f.bottom > cy - d && f.top < cy + d)
      }
      if (document.documentElement.dataset.theme !== 'dark' || !stageEl) return
      const st = stageEl.getBoundingClientRect(), g = rangeEl.getBoundingClientRect()
      const blockers = [...cloudInner.filter((c) => c.parentElement.style.visibility !== 'hidden'), ...solids.filter((e) => e && e.style.visibility !== 'hidden')].map((e) => e.getBoundingClientRect())
      const behind = (r) => {
        if (blockers.some((o) => r.left < o.right && r.right > o.left && r.top < o.bottom && r.bottom > o.top)) return true
        for (let k = 0; k < RANGE_TOP.length; k++) {
          const x0 = g.left + (k / RANGE_TOP.length) * g.width, x1 = g.left + ((k + 1) / RANGE_TOP.length) * g.width
          if (x1 > r.left && x0 < r.right && r.bottom > g.top + RANGE_TOP[k] * g.height) return true
        }
        return false
      }
      // the moon: its bright gap is dropped while anything (My Projects, a building, a tree) stands in front of it, so that
      // building is not shown un-darkened in the moon's shape
      if (moonEl) {
        const mr = moonEl.getBoundingClientRect(), md = mr.width * 0.42
        const disc = { left: mr.left + mr.width / 2 - md / 2, right: mr.left + mr.width / 2 + md / 2, top: mr.top + mr.height / 2 - md / 2, bottom: mr.top + mr.height / 2 + md / 2 }
        const moonOn = !behind(disc)
        if (moonOn !== moonVis) { el.style.setProperty('--moon-img', moonOn ? 'url(/fig/moon.svg)' : NONE); moonVis = moonOn }
      }
      // the stars: one small picture of dots (only the stars in open sky), rebuilt only when that set or the sky's size changes
      const sk = skyEl.getBoundingClientRect(), sw = Math.round(sk.width), sh = Math.round(sk.height)
      const open = STARS.map(([x, y, d], i) => {
        const cx = (x / 100) * sk.width, cy = (y / 100) * sk.height
        return behind({ left: sk.left + cx - d, right: sk.left + cx + d, top: sk.top + cy - d, bottom: sk.top + cy + d }) ? null : [cx, cy, d, i]
      }).filter(Boolean)
      const key = `${sw}x${sh}:${open.map((o) => o[3]).join(',')}`
      if (key !== starKey) {
        starKey = key
        const dots = open.map(([cx, cy, d]) => `<circle cx='${cx.toFixed(1)}' cy='${cy.toFixed(1)}' r='${(d / 2).toFixed(2)}'/>`).join('')
        el.style.setProperty('--stars-img', open.length ? `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${sw}' height='${sh}' viewBox='0 0 ${sw} ${sh}'><g fill='#fff'>${dots}</g></svg>`)}")` : NONE)
        el.style.setProperty('--stars-w', `${sw}px`); el.style.setProperty('--stars-h', `${sh}px`)
      }
      el.style.setProperty('--stars-x', `${(sk.left - st.left).toFixed(1)}px`); el.style.setProperty('--stars-y', `${(sk.top - st.top).toFixed(1)}px`)
    }
    rkRaf = requestAnimationFrame(nightLoop) // also with reduced motion: the stars and moon still need their gaps 
    const onTransitionEnd = (e) => { if (e.target.closest?.('.blvd .pin')) draw() }
    resize(); readScroll(); p = pT; draw()
    Promise.all(BUILDINGS.map((b) => loadAlpha(b.src))).then(draw)
    const settle = window.setTimeout(draw, 2600)
    const themeWatch = new MutationObserver(() => draw()) // the window lights' cut-outs are only worked out at night
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    document.fonts?.ready.then(draw) // text-sized pieces (the speech bubble) are placed again once the fonts have loaded
    lastW = el.clientWidth
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', hold, { passive: false })
    window.addEventListener('touchmove', hold, { passive: false })
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('transitionend', onTransitionEnd)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', hold)
      window.removeEventListener('touchmove', hold)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('transitionend', onTransitionEnd)
      window.clearTimeout(settle)
      themeWatch.disconnect()
      document.documentElement.removeAttribute('data-riding')
      document.documentElement.removeAttribute('data-rode')
      document.removeEventListener('click', onLinkJump, true)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(rkRaf)
    }
  }, [])

  return (
    <div className="scene-wrap" ref={wrap}>
      <div className="scene">
        <div className="fig-stage blvd">
          <div className="blv-sky" aria-hidden="true">
            <div className="fig-sun" />
            {/* at night the sun gives way to a crescent moon in the same spot, and a few stars come out */}
            <div className="blv-moon" />
            <div className="blv-stars">{STARS.map(([x, y, r, d], i) => <i key={i} style={{ left: `${x}%`, top: `${y}%`, width: r, height: r, animationDelay: `${d}s` }} />)}</div>
            {/* a small flock in a loose V, gliding slowly across the sky */}
            <div className="blv-flock">
              {[0, 1, 2].map((n) => (
                <svg key={n} viewBox="0 0 40 16" style={{ '--n': n }}><path d="M2 12 Q10 0 20 10 Q30 0 38 12" /></svg>
              ))}
            </div>
          </div>
          <div className="blv-range" aria-hidden="true" />
          <div className="blv-mist" aria-hidden="true" />
          {/* the clouds float just above the mountain tops, in front of them */}
          <div className="blv-clouds" aria-hidden="true">
            {CLOUDS.map((c, i) => <div key={i} className="blv-cl" data-i={i}><i style={{ animationDelay: `${-i * 23}s`, scale: c.flip ? '-1 1' : undefined }} /></div>)}
          </div>
          <canvas className="blv-road" ref={canvas} aria-hidden="true" />
          {BUILDINGS.map((b) => (
            <div key={`lit-${b.key}`} className={`blv-lit${b.night ? ' full' : ''}`} aria-hidden="true" style={{ backgroundImage: `url(${b.lights})` }} />
          ))}
          {BUILDINGS.map((b) => (
            <div key={b.key} className={`blv-bld${b.night ? ' has-night' : ''}`} style={{ backgroundImage: `url(${b.src})` }} role={b.key === 'b1' ? 'img' : undefined} aria-label={b.key === 'b1' ? 'Illustrated city boulevard with four modern office buildings, mountains and sky' : undefined} aria-hidden={b.key === 'b1' ? undefined : 'true'} />
          ))}
          <div className="blv-arrive">
            <span className="blv-glow" aria-hidden="true" />
            <span className="blv-roof" aria-hidden="true" />
            <span className="blv-sign" aria-hidden="true">My Projects</span>
            <a className="blv-door" href="#work" aria-label="Arrive: go to My Projects"><i /><i /></a>
          </div>
          {Array.from({ length: POOL }, (_, j) => <div key={`t${j}`} className={`blv-tree t${Math.floor(j / 2) % 3}`} aria-hidden="true" />)}
          {Array.from({ length: POOL }, (_, j) => <div key={`l${j}`} className="blv-lamp" aria-hidden="true"><i /><b /></div>)}

          <div className="blv-rider" aria-hidden="true">
            <span className="rd-shadow" />
            <span className="rd-beam" />
            <span className="rd-glow" />
            <span className="rd-streak" />
            <span className="rd-img" />
            <span className="rd-img rd-foot rd-footL" />
            <span className="rd-img rd-foot rd-footR" />
            <span className="rd-tail" />
          </div>
          <div className="fig-light" aria-hidden="true" />
          <div className="blv-start">
            {/* a speech bubble from the rider: a greeting and how to start (text only; the About popup was removed) */}
            <span className="blv-bubble">
              <span className="blv-hey">Hey! I’m <b>{profile.name}</b> <span className="blv-wave" aria-hidden="true">👋</span></span>
              <span className="blv-role">{profile.role}</span>
              <span className="cue-desk">Scroll to drive through my journey.</span><span className="cue-touch">Swipe up to drive through my journey.</span>
            </span>
          </div>
          <nav className="blv-rail" aria-label="Journey">
            <span className="blv-rail-bg" aria-hidden="true" />
            {STOPS.map((st) => (
              <button key={st.key} type="button" aria-label={`Go to ${st.label}`} onClick={() => {
                const hero = wrap.current?.closest('.hero'); if (!hero) return
                const total = Math.max(1, hero.offsetHeight - window.innerHeight)
                const pp = Math.min(1, Math.max(0, (st.camZ - START) / (TRAVEL - START)))
                const top = hero.getBoundingClientRect().top + window.scrollY
                window.scrollTo({ top: top + pp * total, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
              }}><i /><span>{st.label}</span></button>
            ))}
          </nav>
          <div className="blv-caps" aria-live="polite">
            {Object.entries(CHAPTERS).map(([k, c]) => (
              <p key={k} className="blv-cap" data-card={k}>{c.when && <b>{c.when}</b>}<span>{c.text}</span>{c.more && (
                <small className="cap-more">
                  {c.more.title && <em className="cap-sub">{c.more.title}</em>}
                  {c.more.text && <small className="cap-note">{c.more.text}</small>}
                  {c.more.points?.map((pt) => typeof pt === 'string'
                    ? <small key={pt} className="cap-note cap-pt">{pt}</small>
                    // a step whose text already starts with its own name ("Understand the problem…") shows it once, in bold
                    : <small key={pt.title} className="cap-note cap-pt">{pt.text.startsWith(pt.title + ' ')
                      ? <><strong>{pt.title}</strong>{pt.text.slice(pt.title.length)}</>
                      : <><strong>{pt.title}</strong> {pt.text}</>}</small>)}
                </small>
              )}</p>
            ))}
          </div>

          {pins.map((p, i) => {
            const label = p.label
            const badge = (
              <span className="badge">
                {p.logo ? <img src={p.logo} alt="" /> : p.icon}
              </span>
            )
            const content = (
              <>
                {(p.logo || p.icon) && badge}
                <span className="lbl">{label}{p.tag && <em>{p.tag}</em>}</span>
              </>
            )
            return (
              <motion.div
                key={p.label}
                className={`pin${!p.href && !p.onClick ? ' static' : ''}`}
                data-bld={p.bld}
                data-fx={p.fx}
                data-fy={p.fy}
                data-block={p.block}
                data-off=""
                style={{ '--c': p.color || '#ff5a3c' }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.15, type: 'spring' }}
              >
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer" className="chip">{content}</a>
                ) : !p.onClick ? (
                  <span className="chip">{content}</span>
                ) : (
                  <motion.button
                    className="chip"
                    whileTap={{ scale: 0.96 }}
                    onClick={p.onClick}
                  >
                    {content}
                  </motion.button>
                )}
                <span className="pd" />
              </motion.div>
            )
          })}
        </div>
      </div>
      {children}
    </div>
  )
}
