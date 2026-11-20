import { useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Marquee } from '@/components/ui/marquee'
import { MagicCard } from '@/components/ui/magic-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BlurFade } from '@/components/ui/blur-fade'
import { HyperText } from '@/components/ui/hyper-text'
import { site, log, stack } from '@/data'
import { cn } from '@/lib/utils'

export function Label({ n, children }: { n: string; children: ReactNode }) {
  return (
    <BlurFade inView direction="right" offset={30}>
      <h2 className="eyebrow text-muted-foreground mb-10 flex items-center gap-3 font-normal md:mb-16">
        <i className="bg-foreground text-background px-1.5 py-0.5 not-italic">{n}</i>
        {children}
        <span className="bg-border h-px flex-1" />
      </h2>
    </BlurFade>
  )
}

/* ───── crossing skill tapes ───── */

export function Tapes() {
  const words = Object.values(stack).flat()
  const Band = ({ reverse, className }: { reverse?: boolean; className: string }) => (
    <div className={cn('absolute top-1/2 -left-[5%] w-[110%] py-2', className)}>
      <Marquee reverse={reverse} className="[--duration:80s] [--gap:2rem] p-0" repeat={3}>
        {(reverse ? [...words].reverse() : words).map((w) => (
          <span key={w} className="font-display stretch-62 flex items-center gap-8 text-[clamp(1.6rem,4vw,3.2rem)] font-black whitespace-nowrap uppercase">
            {w}
            <span aria-hidden="true">✺</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
  return (
    <div aria-hidden="true" className="relative -my-8 h-[clamp(9rem,18vw,14rem)] overflow-hidden">
      <Band className="bg-surface-2 text-foreground translate-y-[-50%] rotate-3" reverse />
      <Band className="bg-accent text-on-accent z-10 translate-y-[-50%] -rotate-[4deg]" />
    </div>
  )
}

/* ───── about: manifesto lights up as you read, stats tick up ───── */

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = site.manifesto.split(' ')
  return (
    <section id="about" className="px-4 py-24 md:px-10 md:py-40">
      <Label n="00">About</Label>
      <p ref={ref} className="font-display stretch-75 max-w-[22ch] text-[clamp(1.9rem,5.4vw,5.2rem)] leading-[1.02] font-bold text-balance">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>

      <div role="list" className="mt-16 grid grid-cols-2 gap-3 md:mt-28 md:grid-cols-4">
        {site.stats.map((s, i) => (
          <BlurFade key={s.label} inView delay={i * 0.08}>
            <MagicCard
              className="h-full rounded-2xl"
              gradientFrom="var(--accent)"
              gradientTo="var(--accent-2)"
              gradientColor="var(--surface-2)"
              gradientOpacity={0.9}
            >
              <div role="listitem" className="flex h-full flex-col justify-between gap-6 p-5 md:p-6">
                <span className="eyebrow text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-display stretch-62 flex items-baseline leading-[0.85] font-black">
                    <NumberTicker value={s.n} className="text-foreground text-[clamp(3.4rem,8vw,7.5rem)] tracking-tight tabular-nums" />
                    <span className="text-accent text-[clamp(1.6rem,3.6vw,3.2rem)]">{s.suffix}</span>
                  </p>
                  <p className="eyebrow text-muted-foreground mt-3 max-w-[18ch]">{s.label}</p>
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </section>
  )
}

/* ───── log: a ledger that opens ───── */

export function Log() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="log" className="px-4 py-24 md:px-10 md:py-40">
      <Label n="01">Log</Label>
      <div role="list" className="border-border border-t">
        {log.map((e, i) => {
          const isOpen = open === i
          return (
            <BlurFade key={i} inView delay={i * 0.06} className="border-border group relative overflow-hidden border-b">
              <div role="listitem">
                <span className="bg-accent pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:origin-top group-hover:scale-y-100" />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`log-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group-hover:text-on-accent relative z-10 grid w-full grid-cols-[1fr_2rem] items-center gap-x-6 gap-y-1 px-2 py-6 text-left transition-[color,padding] duration-500 group-hover:pl-6 md:grid-cols-[11rem_1fr_auto_2.5rem]"
                >
                  <span className="eyebrow">
                    {e.from}
                    {e.to && ` — ${e.to}`}
                  </span>
                  <span className="font-display stretch-75 col-start-1 text-[clamp(1.6rem,4.4vw,3.8rem)] leading-none font-extrabold uppercase md:col-start-auto">
                    {e.org}
                    {e.kind !== 'work' && (
                      <span className="eyebrow ml-3 inline-block rounded-full border border-current px-2 py-0.5 align-middle text-[0.6rem]">
                        {e.kind === 'edu' ? 'EDU' : 'AWARD'}
                      </span>
                    )}
                  </span>
                  <span className="eyebrow col-start-1 md:col-start-auto md:text-right">
                    {e.role}
                    {e.where && (
                      <>
                        <br />
                        {e.where}
                      </>
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn('col-start-2 row-span-3 row-start-1 justify-self-end font-mono text-2xl transition-transform duration-300 md:col-start-auto md:row-span-1', isOpen && 'rotate-45')}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`log-${i}`}
                  className={cn('group-hover:text-on-accent relative z-10 grid transition-[grid-template-rows] duration-500', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
                >
                  <ul className="stretch-90 max-w-[70rem] overflow-hidden px-2 text-[1.05rem] leading-relaxed md:pl-[13rem]">
                    {e.points.map((p) => (
                      <li key={p} className="relative py-1 pl-6 last:pb-7 before:absolute before:left-0 before:font-mono before:content-['→']">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </BlurFade>
          )
        })}
      </div>
    </section>
  )
}

/* ───── contact ───── */

export function Contact() {
  return (
    <section id="contact" className="flex min-h-[85vh] flex-col px-4 py-24 md:px-10 md:py-40">
      <Label n="04">Contact</Label>
      <p className="eyebrow text-muted-foreground">Got a platform that needs taming?</p>
      <a href={`mailto:${site.email}`} className="hover:text-accent my-6 block break-all transition-colors md:mb-12">
        <HyperText
          as="span"
          animateOnHover
          startOnView
          className="font-display stretch-62 py-0 text-[clamp(2.2rem,8.5vw,9rem)] leading-[0.9] font-black uppercase [&_span]:[font-family:inherit]"
        >
          {site.email}
        </HyperText>
      </a>
      <ul className="eyebrow mt-auto flex flex-wrap gap-3">
        {[...site.socials, { label: 'Resume', url: site.resumeUrl }].map((s) => (
          <li key={s.label}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener"
              className="border-foreground hover:bg-foreground hover:text-background inline-block rounded-full border px-5 py-2.5 transition-colors"
            >
              {s.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
