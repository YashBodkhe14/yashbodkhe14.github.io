import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, Layers, Mail, Moon, ScrollText, SquareTerminal, Sun, UserRound } from 'lucide-react'
import { Dock, DockIcon } from '@/components/ui/dock'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Hero } from '@/sections/Hero'
import { About, Contact, Log, Tapes } from '@/sections/Sections'
import { Work } from '@/sections/Work'
import { Console } from '@/sections/Console'
import { site } from '@/data'
import { useClock, useTheme } from '@/lib/hooks'
import { useSyncExternalStore } from 'react'

const mq = '(min-width: 768px)'
const useWide = () => useSyncExternalStore((cb) => { const m = matchMedia(mq); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) }, () => matchMedia(mq).matches)

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
const go = (href: string) => (e: React.MouseEvent) => {
  if (!lenis) return
  e.preventDefault()
  lenis.scrollTo(href, { duration: 1.4 })
}

function NavItem({ href, label, children, external }: { href: string; label: string; children: ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      onClick={external ? undefined : go(href)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      className="hover:bg-surface-2 flex size-full items-center justify-center rounded-full transition-colors"
    >
      {children}
    </a>
  )
}

export default function App() {
  const [theme, toggle] = useTheme()
  const time = useClock(site.timezone)
  const wide = useWide()

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t: number) => lenis!.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  const icon = 'size-[18px]'
  return (
    <>
      <a href="#main" className="bg-amber text-on-accent fixed -top-16 left-3 z-[100] px-3 py-2 font-mono focus:top-3">
        Skip to content
      </a>
      <ScrollProgress className="top-0 z-[70] h-[3px] bg-gradient-to-r from-[var(--mint)] to-[var(--amber)]" />
      <div className="grain" aria-hidden="true" />

      <header className="eyebrow bg-background/75 border-border/60 fixed inset-x-0 top-0 z-[60] flex items-center justify-between border-b px-4 py-3 backdrop-blur-md md:px-10">
        <a href="#top" onClick={go('#top')} aria-label="Back to top" className="font-display stretch-62 text-2xl font-black tracking-tight normal-case">
          Y<span className="text-amber">B</span>
        </a>
        <span className="text-muted-foreground hidden md:inline">{time} · Pune</span>
      </header>

      <nav aria-label="Sections" className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4">
        <Dock iconSize={wide ? 40 : 32} iconMagnification={wide ? 58 : 32} className="border-border bg-surface/80 mt-0 gap-1 md:gap-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <DockIcon><NavItem href="#about" label="About"><UserRound className={icon} /></NavItem></DockIcon>
          <DockIcon><NavItem href="#log" label="Experience"><ScrollText className={icon} /></NavItem></DockIcon>
          <DockIcon><NavItem href="#work" label="Work"><Layers className={icon} /></NavItem></DockIcon>
          <DockIcon><NavItem href="#console" label="Console"><SquareTerminal className={icon} /></NavItem></DockIcon>
          <DockIcon><NavItem href="#contact" label="Contact"><Mail className={icon} /></NavItem></DockIcon>
          <span className="bg-border mx-1 h-6 w-px" aria-hidden="true" />
          <DockIcon><NavItem href={site.socials[0].url} label="LinkedIn" external><span className="font-display text-[15px] font-black">in</span></NavItem></DockIcon>
          <DockIcon><NavItem href={site.resumeUrl} label="Resume (PDF)" external><FileText className={icon} /></NavItem></DockIcon>
          <DockIcon>
            <button type="button" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} title="Invert" className="hover:bg-surface-2 flex size-full items-center justify-center rounded-full transition-colors">
              {theme === 'dark' ? <Sun className={icon} /> : <Moon className={icon} />}
            </button>
          </DockIcon>
        </Dock>
      </nav>

      <main id="main">
        <Hero />
        <Tapes />
        <About />
        <Log />
        <Work />
        <Console onInvert={toggle} />
        <Contact />
      </main>

      <footer className="eyebrow border-border text-muted-foreground flex flex-wrap justify-between gap-4 border-t px-4 pt-6 pb-28 md:px-10">
        <span>© {new Date().getFullYear()} Yash Bodkhe. Built by hand with React, Tailwind and Magic UI.</span>
        <a href="#top" onClick={go('#top')}>Back to top ↑</a>
      </footer>
    </>
  )
}
