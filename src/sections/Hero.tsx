import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { HyperText } from '@/components/ui/hyper-text'
import { SpinningText } from '@/components/ui/spinning-text'
import { site } from '@/data'
import { useCssVar, useReducedMotion, useFinePointer } from '@/lib/hooks'

/** Name letters stretch (font width axis) and thicken toward the cursor. */
function StretchName({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const chars = [...el.querySelectorAll<HTMLSpanElement>('[data-ch]')]
    const state = chars.map(() => ({ w: 100, g: 800 }))
    let mx = 0
    let my = 0
    let idle = true
    let t = 0
    let raf = 0
    const move = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      idle = false
    }
    const leave = () => (idle = true)
    addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    const tick = () => {
      t += 0.016
      chars.forEach((c, i) => {
        let w: number
        let g: number
        if (idle || !fine) {
          const p = Math.sin(t * 1.4 - i * 0.9)
          w = 88 + p * 26
          g = 600 + p * 250
        } else {
          const r = c.getBoundingClientRect()
          const d = Math.hypot(mx - (r.left + r.width / 2), (my - (r.top + r.height / 2)) * 0.6)
          const f = Math.max(0, 1 - d / (innerWidth * 0.35))
          w = 66 + f * 59
          g = 300 + f * 600
        }
        state[i].w += (w - state[i].w) * 0.12
        state[i].g += (g - state[i].g) * 0.12
        c.style.fontVariationSettings = `'wdth' ${state[i].w.toFixed(1)}, 'wght' ${state[i].g.toFixed(0)}`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [reduced, fine])

  return (
    <h1
      ref={ref}
      aria-label={`${site.first} ${site.last}`}
      className="font-display flex select-none justify-center whitespace-nowrap text-[40vw] leading-[0.78] font-extrabold tracking-[-0.02em] md:text-[min(34vw,40rem)]"
    >
      {[...text].map((c, i) => (
        <motion.span
          key={i}
          data-ch
          aria-hidden="true"
          className={i === text.length - 1 ? 'text-amber inline-block' : 'inline-block'}
          initial={reduced ? false : { y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.07, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {c}
        </motion.span>
      ))}
    </h1>
  )
}

export function Hero() {
  const grid = useCssVar('--grid')
  return (
    <section id="top" className="relative isolate grid min-h-svh grid-rows-[auto_1fr_auto] overflow-hidden px-4 pt-24 pb-28 md:px-10 md:pb-10">
      <FlickeringGrid
        key={grid}
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        squareSize={4}
        gridGap={7}
        color={grid || '#5cf2c4'}
        maxOpacity={0.35}
        flickerChance={0.12}
      />

      <div className="eyebrow text-muted-foreground flex flex-wrap items-center gap-x-8 gap-y-3">
        <HyperText as="span" className="py-0 text-[0.72rem] font-normal tracking-[0.06em] uppercase" duration={900}>
          {site.role}
        </HyperText>
        <span>{site.location}</span>
        <span className="border-border bg-surface/70 text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur">
          <b className="bg-mint size-2 rounded-full shadow-[0_0_0_0_var(--mint)] [animation:ping-soft_1.8s_infinite]" />
          All systems operational · {site.company}
        </span>
      </div>

      <div className="self-center">
        <StretchName text={site.first} />
      </div>

      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <p className="stretch-75 max-w-[34ch] text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.15] font-medium">
          {site.lede[0]}
          <em className="text-amber not-italic">{site.lede[1]}</em>
          {site.lede[2]}
        </p>
        <a
          href="#about"
          aria-label="Scroll to about"
          className="group relative grid size-[clamp(120px,13vw,170px)] shrink-0 place-items-center self-end"
        >
          <SpinningText className="eyebrow text-foreground absolute inset-0 m-auto" radius={8.2} duration={16}>
            {site.orbit}
          </SpinningText>
          <span className="bg-amber text-on-accent grid size-[42%] place-items-center rounded-full text-2xl transition-transform group-hover:translate-y-1.5">
            ↓
          </span>
        </a>
      </div>
    </section>
  )
}
