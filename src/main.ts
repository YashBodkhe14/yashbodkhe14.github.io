import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { site, log, projects, stack } from './data'

gsap.registerPlugin(ScrollTrigger)

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll(s)] as T[]
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
const pad = (n: number, l = 2) => String(n).padStart(l, '0')

/* ───────────────────────── render ───────────────────────── */

function render() {
  $('[data-role]').textContent = site.role
  $('[data-location]').textContent = site.location
  $('[data-status]').textContent = site.status
  $('[data-year]').textContent = String(new Date().getFullYear())

  const name = $('[data-name]')
  name.setAttribute('aria-label', site.first)
  name.innerHTML = [...site.first]
    .map((c, i) => `<span class="ch${i === site.first.length - 1 ? ' is-signal' : ''}" aria-hidden="true">${esc(c)}</span>`)
    .join('')

  const [l1, l2, l3] = site.lede
  $('[data-lede]').innerHTML = `${esc(l1)}<em>${esc(l2)}</em>${esc(l3)}`

  $('[data-stats]').innerHTML = site.stats
    .map((s) => `<li><b data-n="${s.n}">${s.n}</b><i>${esc(s.suffix)}</i><span>${esc(s.label)}</span></li>`)
    .join('')

  const words = Object.values(stack).flat()
  for (const t of $$('[data-tape]')) {
    const list = t.dataset.tape === 'rev' ? [...words].reverse() : words
    const html = list.map((w) => `<span>${esc(w)}</span>`).join('')
    t.innerHTML = html + html
  }

  $('[data-manifesto]').innerHTML = site.manifesto
    .split(' ')
    .map((w) => `<span class="w">${esc(w)}</span>`)
    .join(' ')

  $('[data-log]').innerHTML = log
    .map(
      (e, i) => `
    <li class="log__item">
      <button class="log__row" type="button" aria-expanded="false" aria-controls="log-${i}" data-cursor="open">
        <span class="log__when">${esc(e.from)}${e.to ? ` — ${esc(e.to)}` : ''}</span>
        <span class="log__org">${esc(e.org)}${e.kind !== 'work' ? `<span class="log__kind">${e.kind === 'edu' ? 'EDU' : 'AWARD'}</span>` : ''}</span>
        <span class="log__role">${esc(e.role)}${e.where ? `<br>${esc(e.where)}` : ''}</span>
        <span class="log__plus" aria-hidden="true">+</span>
      </button>
      <div class="log__body" id="log-${i}"><ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
    </li>`,
    )
    .join('')

  $('[data-work]').innerHTML =
    projects
      .map(
        (p, i) => `
    <article class="card" data-cursor="view">
      ${art(i)}
      <div class="card__top"><span>${p.year ? esc(p.year) + " · " : ""}${esc(p.context)}</span><span>${pad(i + 1)} / ${pad(projects.length)}</span></div>
      <div>
        <div class="card__idx" aria-hidden="true">${pad(i + 1)}</div>
      </div>
      <div class="card__body">
        <h3 class="card__name">${esc(p.name)}</h3>
        <p class="card__blurb">${esc(p.blurb)}</p>
        <ul class="card__tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="card__links">
          ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">Live ↗<span class="sr-only"> ${esc(p.name)}</span></a>` : ''}
          ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Code ↗</a>` : ''}
        </div>
      </div>
    </article>`,
      )
      .join('') + `<div class="card card--end"><p>More in<br>the console<br>↓</p></div>`

  const mail = $<HTMLAnchorElement>('[data-mail]')
  mail.href = `mailto:${site.email}`
  mail.textContent = site.email
  mail.dataset.cursor = 'say hi'

  $('[data-socials]').innerHTML =
    site.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>`).join('') +
    `<li><a href="${esc(site.resumeUrl)}" target="_blank" rel="noopener">Resume ↗</a></li>`
}

/** Generative cover art per project, so there is no stock imagery. */
function art(i: number): string {
  const W = 400
  const H = 500
  let s = ''
  const k = i % 4
  if (k === 0) {
    for (let y = 0; y < 14; y++)
      for (let x = 0; x < 11; x++) {
        const d = Math.hypot(x - 7, y - 4) / 9
        const r = Math.max(0.5, 14 * (1 - d))
        s += `<circle cx="${x * 40 + 10}" cy="${y * 40 + 10}" r="${r.toFixed(1)}" fill="var(--signal)" opacity=".85"/>`
      }
  } else if (k === 1) {
    for (let n = 0; n < 16; n++)
      s += `<circle cx="${280 - n * 6}" cy="${150 + n * 4}" r="${30 + n * 14}" fill="none" stroke="var(--fg)" stroke-opacity="${(0.12 + n * 0.02).toFixed(2)}"/>`
    s += `<circle cx="280" cy="150" r="46" fill="var(--hot)"/>`
  } else if (k === 2) {
    for (let n = 0; n < 22; n++)
      s += `<rect x="${n * 22 - 60}" y="-40" width="10" height="${H + 120}" fill="var(--fg)" opacity=".1" transform="rotate(24 200 250)"/>`
    s += `<rect x="190" y="70" width="170" height="170" fill="var(--signal)" transform="rotate(12 275 155)"/>`
  } else {
    for (let y = 0; y < 10; y++)
      for (let x = 0; x < 8; x++) {
        const a = Math.sin(x * 0.9 + y * 0.6) * 45
        s += `<rect x="${x * 50 + 12}" y="${y * 50 + 12}" width="26" height="26" fill="none" stroke="${(x + y) % 7 === 0 ? 'var(--signal)' : 'var(--fg)'}" stroke-opacity="${(x + y) % 7 === 0 ? 1 : 0.25}" transform="rotate(${a.toFixed(0)} ${x * 50 + 25} ${y * 50 + 25})"/>`
      }
  }
  return `<svg class="card__art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${s}</svg>`
}

/* ───────────────────────── boot ───────────────────────── */

function boot(): Promise<void> {
  const el = $('.boot')
  const count = $('[data-count]')
  if (reduced) {
    el.remove()
    return Promise.resolve()
  }
  document.body.classList.add('booting')
  return new Promise((res) => {
    const o = { v: 0 }
    gsap
      .timeline({
        onComplete: () => {
          el.remove()
          document.body.classList.remove('booting')
          res()
        },
      })
      .to(o, { v: 100, duration: 1.4, ease: 'power3.inOut', onUpdate: () => (count.textContent = pad(Math.round(o.v), 3)) })
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '+=0.1')
  })
}

/* ───────────────────────── hero name ───────────────────────── */

function heroName() {
  const chars = $$('.hero__name .ch')
  const state = chars.map(() => ({ w: 100, g: 800 }))
  const apply = () =>
    chars.forEach((c, i) => (c.style.fontVariationSettings = `'wdth' ${state[i].w.toFixed(1)}, 'wght' ${state[i].g.toFixed(0)}`))

  gsap.from(chars, { yPercent: 110, opacity: 0, stagger: 0.07, duration: 1.1, ease: 'expo.out' })
  if (reduced) return

  let mx = -1
  let my = -1
  let idle = true
  addEventListener('pointermove', (e) => {
    mx = e.clientX
    my = e.clientY
    idle = false
  })
  document.addEventListener('pointerleave', () => (idle = true))

  let t = 0
  gsap.ticker.add(() => {
    t += 0.016
    const tw = chars.map((c, i) => {
      if (idle || !fine) {
        // slow breathing wave when nobody is pointing at it
        const p = Math.sin(t * 1.4 - i * 0.9)
        return { w: 88 + p * 26, g: 600 + p * 250 }
      }
      const r = c.getBoundingClientRect()
      const d = Math.hypot(mx - (r.left + r.width / 2), (my - (r.top + r.height / 2)) * 0.6)
      const f = Math.max(0, 1 - d / (innerWidth * 0.35))
      return { w: 66 + f * 59, g: 300 + f * 600 }
    })
    tw.forEach((v, i) => {
      state[i].w += (v.w - state[i].w) * 0.12
      state[i].g += (v.g - state[i].g) * 0.12
    })
    apply()
  })
}

/* ───────────────────────── scroll scenes ───────────────────────── */

function scenes(lenis: Lenis | null) {
  // progress bar
  gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } })

  // tapes: constant drift + scroll velocity kick
  const tracks = $$('[data-tape]')
  const loops = tracks.map((t) =>
    gsap.fromTo(
      t,
      { xPercent: t.dataset.tape === 'rev' ? -50 : 0 },
      { xPercent: t.dataset.tape === 'rev' ? 0 : -50, duration: 70, ease: 'none', repeat: -1 },
    ),
  )
  if (reduced) loops.forEach((l) => l.pause())
  else if (lenis)
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      const s = 1 + Math.min(Math.abs(velocity) * 0.25, 6)
      loops.forEach((l) => gsap.to(l, { timeScale: s, duration: 0.2, overwrite: true }))
      gsap.delayedCall(0.25, () => loops.forEach((l) => gsap.to(l, { timeScale: 1, duration: 0.8, overwrite: true })))
    })

  if (reduced) return

  // manifesto words light up as you read
  gsap.to('.about__text .w', {
    opacity: 1,
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: { trigger: '.about__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
  })

  // stats count up once
  for (const b of $$('[data-n]')) {
    const o = { v: 0 }
    const end = Number(b.dataset.n)
    gsap.to(o, {
      v: end,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: b, start: 'top 90%' },
      onUpdate: () => (b.textContent = String(Math.round(o.v))),
    })
  }

  // labels slide in
  for (const l of $$('.label'))
    gsap.from(l, { x: -40, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 90%' } })

  gsap.from('.log__item', {
    y: 60,
    opacity: 0,
    stagger: 0.08,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.log__list', start: 'top 85%' },
  })

  // horizontal work rail on wide screens
  const mm = gsap.matchMedia()
  mm.add('(min-width: 761px)', () => {
    const rail = $('.work__rail')
    const dist = () => rail.scrollWidth - innerWidth
    gsap.to(rail, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: { trigger: '.work__pin', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
    })
  })

  gsap.from('.term', { y: 80, rotate: -2, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.term', start: 'top 90%' } })
}

/* ───────────────────────── small stuff ───────────────────────── */

function logAccordion() {
  for (const b of $$<HTMLButtonElement>('.log__row'))
    b.addEventListener('click', () => {
      const li = b.parentElement!
      const open = li.classList.toggle('is-open')
      b.setAttribute('aria-expanded', String(open))
      setTimeout(() => ScrollTrigger.refresh(), 550)
    })
}

function cursor() {
  if (!fine || reduced) return
  const c = $('.cursor')
  const label = $('.cursor__label')
  const xTo = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3' })
  const yTo = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3' })
  addEventListener('pointermove', (e) => {
    xTo(e.clientX)
    yTo(e.clientY)
    const t = (e.target as Element).closest?.('[data-cursor], a, button')
    c.classList.toggle('is-big', !!t)
    label.textContent = t instanceof HTMLElement ? t.dataset.cursor ?? '' : ''
  })
}

function clock() {
  const el = $('[data-clock]')
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: site.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const tick = () => (el.textContent = `${f.format(new Date())} local`)
  tick()
  setInterval(tick, 1000)
}

function invert() {
  const btn = $<HTMLButtonElement>('[data-invert]')
  const set = (light: boolean) => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark'
    btn.setAttribute('aria-pressed', String(light))
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark')
    } catch {}
  }
  let saved: string | null = null
  try {
    saved = localStorage.getItem('theme')
  } catch {}
  if (saved) set(saved === 'light')
  btn.addEventListener('click', () => set(document.documentElement.dataset.theme !== 'light'))
  return set
}

function scramble() {
  const el = $('[data-mail]')
  const glyphs = '!<>-_\\/[]{}—=+*^?#░▒▓'
  let running = false
  el.addEventListener('pointerenter', () => {
    if (running || reduced) return
    running = true
    const final = site.email
    let frame = 0
    const id = setInterval(() => {
      el.textContent = [...final]
        .map((ch, i) => (i < frame / 2 ? ch : glyphs[(Math.random() * glyphs.length) | 0]))
        .join('')
      if (++frame > final.length * 2) {
        clearInterval(id)
        el.textContent = final
        running = false
      }
    }, 28)
  })
}

function navSpy() {
  const links = $$<HTMLAnchorElement>('.bar__nav a')
  for (const a of links) {
    const sec = $(a.getAttribute('href')!)
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (s) => a.classList.toggle('is-active', s.isActive),
    })
  }
}

/* ───────────────────────── terminal ───────────────────────── */

function terminal(setTheme: (light: boolean) => void) {
  const out = $('[data-term-out]')
  const form = $<HTMLFormElement>('[data-term-form]')
  const input = $<HTMLInputElement>('[data-term-in]')
  const history: string[] = []
  let hi = 0

  const print = (html: string) => {
    out.insertAdjacentHTML('beforeend', html + '\n')
    out.scrollTop = out.scrollHeight
  }

  const cmds: Record<string, (args: string[]) => string> = {
    help: () =>
      [
        '<span class="c">available commands</span>',
        '  whoami          who is this',
        '  skills [group]  the stack (' + Object.keys(stack).join(', ') + ')',
        '  experience      where I have been',
        '  projects        things I made',
        '  contact         how to reach me',
        '  resume          open the PDF',
        '  invert          flip the colours',
        '  clear           wipe the screen',
        '  <span class="d">…and a few hidden ones</span>',
      ].join('\n'),
    whoami: () => `${esc(site.first)} ${esc(site.last)}\n${esc(site.role)} @ ${esc(site.company)} · ${esc(site.location)}`,
    skills: ([g]) => {
      if (g && !stack[g]) return `<span class="h">no group "${esc(g)}".</span> try: ${Object.keys(stack).join(', ')}`
      const groups = g ? [g] : Object.keys(stack)
      return groups.map((k) => `<span class="c">${k.padEnd(10)}</span> ${stack[k].map(esc).join(' · ')}`).join('\n')
    },
    experience: () => log.map((e) => `<span class="c">${(e.from + (e.to ? '–' + e.to : '')).padEnd(18)}</span>${esc(e.role)} @ ${esc(e.org)}`).join('\n'),
    projects: () => projects.map((p, i) => `<span class="c">${pad(i + 1)}</span>  ${esc(p.name).padEnd(18)} <span class="d">${p.tags.map(esc).join(', ')}</span>`).join('\n'),
    contact: () =>
      [`email   <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`, ...site.socials.map((s) => `${s.label.toLowerCase().padEnd(8)}<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a>`)].join('\n'),
    resume: () => {
      open(site.resumeUrl, '_blank', 'noopener')
      return 'opening resume…'
    },
    invert: () => {
      setTheme(document.documentElement.dataset.theme !== 'light')
      return 'colours flipped.'
    },
    clear: () => {
      out.innerHTML = ''
      return ''
    },
    ls: () => 'about.txt  experience/  projects/  secrets/  <span class="d">(try cat secrets)</span>',
    cat: ([f]) => (f?.startsWith('secrets') ? 'permission denied. nice try though.' : f === 'about.txt' ? esc(site.manifesto) : `cat: ${esc(f ?? '')}: no such file`),
    sudo: (a) =>
      a.join(' ') === 'hire yash'
        ? '<span class="c">[sudo] access granted.</span>\nexcellent decision. drafting an email for you…'
        : '<span class="h">yash is not in the sudoers file. this incident will be reported.</span>',
    echo: (a) => esc(a.join(' ')),
    date: () => new Date().toString(),
    exit: () => 'there is no escape. (scroll down instead)',
  }

  const run = (raw: string) => {
    const line = raw.trim()
    print(`<span class="d">$</span> ${esc(line)}`)
    if (!line) return
    history.push(line)
    hi = history.length
    const [name, ...args] = line.split(/\s+/)
    const fn = cmds[name.toLowerCase()]
    const res = fn ? fn(args) : `<span class="h">command not found:</span> ${esc(name)}. type <span class="c">help</span>.`
    if (res) print(res)
    if (line === 'sudo hire yash') setTimeout(() => (location.href = `mailto:${site.email}?subject=Let%27s%20work%20together`), 900)
  }

  print('<span class="c">yash-os 1.0</span> <span class="d">— type "help" and press enter</span>')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    run(input.value)
    input.value = ''
  })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && hi > 0) input.value = history[--hi]
    else if (e.key === 'ArrowDown') input.value = history[++hi] ?? ((hi = history.length), '')
    else return
    e.preventDefault()
  })
  $('.term').addEventListener('click', () => input.focus({ preventScroll: true }))

  // the first time the terminal shows up, it types a demo command by itself
  const demo = 'skills'
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (reduced) return run(demo)
      let i = 0
      const id = setInterval(() => {
        if (input.value && i === 0) return clearInterval(id) // visitor is already typing
        input.value = demo.slice(0, ++i)
        if (i === demo.length) {
          clearInterval(id)
          setTimeout(() => {
            run(demo)
            input.value = ''
          }, 350)
        }
      }, 110)
    },
    { threshold: 0.6 },
  )
  io.observe($('.term'))
}

/* ───────────────────────── go ───────────────────────── */

render()
const setTheme = invert()
logAccordion()
cursor()
clock()
scramble()
terminal(setTheme)

let lenis: Lenis | null = null
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis!.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  for (const a of $$<HTMLAnchorElement>('a[href^="#"]'))
    a.addEventListener('click', (e) => {
      e.preventDefault()
      lenis!.scrollTo(a.getAttribute('href')!, { offset: 0, duration: 1.4 })
    })
}

boot().then(() => {
  heroName()
  scenes(lenis)
  navSpy()
})
