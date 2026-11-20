import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagicCard } from '@/components/ui/magic-card'
import { BorderBeam } from '@/components/ui/border-beam'
import { projects } from '@/data'
import { Label } from './Sections'
import { GlassFx } from '@/components/Glass'

gsap.registerPlugin(ScrollTrigger)

const pad = (n: number) => String(n).padStart(2, '0')

/** Generated cover art per project, so there is no stock imagery. */
function Art({ i }: { i: number }) {
  const k = i % 4
  const els: React.ReactNode[] = []
  if (k === 0) {
    for (let y = 0; y < 14; y++)
      for (let x = 0; x < 11; x++) {
        const d = Math.hypot(x - 7, y - 4) / 9
        els.push(<circle key={`${x}-${y}`} cx={x * 40 + 10} cy={y * 40 + 10} r={Math.max(0.5, 13 * (1 - d))} fill="var(--accent-2)" opacity={0.75} />)
      }
  } else if (k === 1) {
    for (let n = 0; n < 16; n++)
      els.push(<circle key={n} cx={280 - n * 6} cy={150 + n * 4} r={30 + n * 14} fill="none" stroke="var(--foreground)" strokeOpacity={0.08 + n * 0.015} />)
    els.push(<circle key="sun" cx={280} cy={150} r={46} fill="var(--accent)" />)
  } else if (k === 2) {
    for (let n = 0; n < 22; n++)
      els.push(<rect key={n} x={n * 22 - 60} y={-40} width={10} height={620} fill="var(--foreground)" opacity={0.07} transform="rotate(24 200 250)" />)
    els.push(<rect key="sq" x={190} y={70} width={170} height={170} fill="var(--accent-2)" transform="rotate(12 275 155)" />)
  } else {
    for (let y = 0; y < 10; y++)
      for (let x = 0; x < 8; x++) {
        const hot = (x + y) % 7 === 0
        els.push(
          <rect
            key={`${x}-${y}`}
            x={x * 50 + 12}
            y={y * 50 + 12}
            width={26}
            height={26}
            fill="none"
            stroke={hot ? 'var(--accent)' : 'var(--foreground)'}
            strokeOpacity={hot ? 1 : 0.2}
            transform={`rotate(${(Math.sin(x * 0.9 + y * 0.6) * 45).toFixed(0)} ${x * 50 + 25} ${y * 50 + 25})`}
          />,
        )
      }
  }
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-[1.08] group-hover:-rotate-2"
    >
      {els}
    </svg>
  )
}

export function Work() {
  const pin = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const r = rail.current!
        const dist = () => r.scrollWidth - innerWidth
        gsap.to(r, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="pb-24 md:pb-40">
      <div ref={pin} className="overflow-hidden pt-20">
        <div className="px-4 md:px-10">
          <Label n="02">Selected work</Label>
        </div>
        <div ref={rail} className="flex flex-col gap-4 px-4 md:w-max md:flex-row md:gap-6 md:px-10">
          {projects.map((p, i) => (
            <MagicCard
              key={p.name}
              mode="orb"
              glowFrom="var(--accent)"
              glowTo="var(--accent-2)"
              className="glass-card group bg-surface relative min-h-[420px] [&>.z-40]:h-full w-full overflow-hidden rounded-3xl md:aspect-[4/5] md:max-h-[calc(100svh-210px)] md:w-[clamp(300px,33vw,480px)]"
            >
              <article className="relative flex h-full min-h-[420px] flex-col justify-between p-6">
                <Art i={i} />
                <div className="eyebrow relative flex justify-between">
                  <span>
                    {p.year && `${p.year} · `}
                    {p.context}
                  </span>
                  <span>
                    {pad(i + 1)} / {pad(projects.length)}
                  </span>
                </div>
                <div className="font-display stretch-62 text-outline relative text-[clamp(3rem,6vw,5.5rem)] leading-[0.8] font-black" aria-hidden="true">
                  {pad(i + 1)}
                </div>
                <div className="glass-panel relative -mx-6 -mb-6 bg-gradient-to-b from-transparent to-[var(--surface)] to-40% px-6 pt-12 pb-6">
                  <h3 className="glass-text-soft font-display stretch-62 mb-2 text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.9] font-extrabold uppercase">{p.name}</h3>
                  <p className="stretch-90 mb-4 max-w-[36ch] leading-snug">{p.blurb}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t} className="pill eyebrow border-foreground/40 bg-surface rounded-full border px-2.5 py-1 text-[0.62rem]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              {i === 0 && <BorderBeam size={140} duration={9} colorFrom="var(--accent)" colorTo="var(--accent-2)" borderWidth={1.5} />}
            </MagicCard>
          ))}
          <div className="more-card bg-accent2 text-on-accent flex min-h-[260px] items-center rounded-3xl p-8 md:aspect-[4/5] md:max-h-[calc(100svh-210px)] md:w-[clamp(300px,33vw,480px)]">
            <p className="glass-text font-display stretch-62 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.9] font-black uppercase">
              More in
              <br />
              the console
              <br />↓
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
