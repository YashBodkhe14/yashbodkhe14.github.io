import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { BorderBeam } from '@/components/ui/border-beam'
import { site, log, projects, stack } from '@/data'
import { Label } from './Sections'
import { GlassFx } from '@/components/Glass'

type Line = { id: number; node: ReactNode }

const C = ({ children }: { children: ReactNode }) => <span className="text-accent2">{children}</span>
const D = ({ children }: { children: ReactNode }) => <span className="text-[var(--term-dim)]">{children}</span>
const H = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>
const pad = (n: number) => String(n).padStart(2, '0')

export function Console() {
  const [lines, setLines] = useState<Line[]>([{ id: 0, node: <><C>yash-os 1.0</C> <D>— type "help" and press enter</D></> }])
  const [value, setValue] = useState('')
  const history = useRef<string[]>([])
  const hi = useRef(0)
  const out = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  const print = (...nodes: ReactNode[]) => setLines((l) => [...l, ...nodes.map((node) => ({ id: nextId.current++, node }))])

  const cmds: Record<string, (args: string[]) => ReactNode | null> = {
    help: () => (
      <>
        <C>available commands</C>
        {'\n  whoami          who is this\n  skills [group]  the stack (' + Object.keys(stack).join(', ') + ')\n  experience      where I have been\n  projects        things I built\n  contact         how to reach me\n  resume          open the PDF\n  clear           wipe the screen\n  '}
        <D>…and a few hidden ones</D>
      </>
    ),
    whoami: () => `${site.first} ${site.last}\n${site.role} @ ${site.company} · ${site.location}`,
    skills: ([g]) => {
      if (g && !stack[g]) return <><H>no group "{g}".</H> try: {Object.keys(stack).join(', ')}</>
      return (g ? [g] : Object.keys(stack)).map((k) => (
        <span key={k} className="block">
          <C>{k.padEnd(10)}</C> {stack[k].join(' · ')}
        </span>
      ))
    },
    experience: () => log.map((e) => (
      <span key={e.org + e.role} className="block">
        <C>{(e.from + (e.to ? '–' + e.to : '')).padEnd(20)}</C>
        {e.role} @ {e.org}
      </span>
    )),
    projects: () => projects.map((p, i) => (
      <span key={p.name} className="block">
        <C>{pad(i + 1)}</C> {p.name.padEnd(28)} <D>{p.tags.join(', ')}</D>
      </span>
    )),
    contact: () => (
      <>
        email    <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
        {site.socials.map((s) => (
          <span key={s.label} className="block">
            {s.label.toLowerCase().padEnd(9)}
            <a className="underline" href={s.url} target="_blank" rel="noopener">{s.url}</a>
          </span>
        ))}
      </>
    ),
    resume: () => {
      window.open(site.resumeUrl, '_blank', 'noopener')
      return 'opening resume…'
    },
    clear: () => {
      setLines([])
      return null
    },
    ls: () => <>about.txt  experience/  projects/  secrets/  <D>(try cat secrets)</D></>,
    cat: ([f]) => (f?.startsWith('secrets') ? 'permission denied. nice try though.' : f === 'about.txt' ? site.manifesto : `cat: ${f ?? ''}: no such file`),
    kubectl: (a) =>
      a[0] === 'get' && a[1]?.startsWith('pod')
        ? <>NAME              READY   STATUS    RESTARTS{'\n'}yash-0            1/1     <C>Running</C>   0{'\n'}<D>(no restarts since Jul 2024)</D></>
        : <>try <C>kubectl get pods</C></>,
    sudo: (a) =>
      a.join(' ') === 'hire yash'
        ? <><C>[sudo] access granted.</C>{'\n'}excellent decision. opening your mail app…</>
        : <H>yash is not in the sudoers file. this incident will be reported.</H>,
    echo: (a) => a.join(' '),
    date: () => new Date().toString(),
    exit: () => 'there is no escape. (scroll down instead)',
  }

  const run = (raw: string) => {
    const line = raw.trim()
    print(<><D>$</D> {line}</>)
    if (!line) return
    history.current.push(line)
    hi.current = history.current.length
    const [name, ...args] = line.split(/\s+/)
    const fn = cmds[name.toLowerCase()]
    const res = fn ? fn(args) : <><H>command not found:</H> {name}. type <C>help</C>.</>
    if (res !== null) print(res)
    if (line === 'sudo hire yash') setTimeout(() => (location.href = `mailto:${site.email}?subject=Let%27s%20work%20together`), 900)
  }

  useEffect(() => {
    out.current?.scrollTo({ top: out.current.scrollHeight })
  }, [lines])

  // the first time the terminal shows up, it types a demo command by itself
  useEffect(() => {
    const el = box.current
    if (!el) return
    let timer = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const demo = 'kubectl get pods'
        let i = 0
        timer = window.setInterval(() => {
          if (i === 0 && input.current?.value) return clearInterval(timer)
          setValue(demo.slice(0, ++i))
          if (i === demo.length) {
            clearInterval(timer)
            setTimeout(() => {
              run(demo)
              setValue('')
            }, 350)
          }
        }, 80)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(value)
    setValue('')
  }
  const keys = (e: KeyboardEvent<HTMLInputElement>) => {
    const h = history.current
    if (e.key === 'ArrowUp' && hi.current > 0) setValue(h[--hi.current])
    else if (e.key === 'ArrowDown') setValue(h[++hi.current] ?? ((hi.current = h.length), ''))
    else return
    e.preventDefault()
  }

  return (
    <section id="console" className="px-4 py-24 md:px-10 md:py-40">
      <Label n="03">Console</Label>
      <p className="glass-text-soft font-display stretch-75 mb-8 max-w-[24ch] text-[clamp(1.4rem,3vw,2.4rem)] font-bold">
        The skills section is a terminal. Type <kbd className="kbd-chip bg-accent text-on-accent px-1.5 font-mono text-[0.8em]">help</kbd>.
      </p>
      <div
        ref={box}
        onClick={() => input.current?.focus({ preventScroll: true })}
        className="glass glass-term relative max-w-[62rem] overflow-hidden rounded-2xl border border-[var(--term-line)] bg-[var(--term-bg)] text-[var(--term-fg)] shadow-[0_40px_120px_-40px_var(--glow)]"
      >
        <GlassFx />
        <div className="flex items-center gap-1.5 border-b border-[var(--term-line)] px-4 py-3 font-mono text-xs">
          <span className="size-3 rounded-full bg-[var(--term-dim)]" />
          <span className="size-3 rounded-full bg-[var(--term-a1)]" />
          <span className="size-3 rounded-full bg-[var(--term-a2)]" />
          <em className="ml-auto text-[var(--term-dim)] not-italic">yash@bajaj-aks: ~</em>
        </div>
        <div ref={out} role="log" aria-live="polite" className="h-[340px] overflow-y-auto p-4 font-mono text-[0.85rem] leading-relaxed whitespace-pre-wrap [&_.text-accent2]:text-[var(--term-a2)] [&_.text-accent]:text-[var(--term-a1)]">
          {lines.map((l) => (
            <div key={l.id}>{l.node}</div>
          ))}
        </div>
        <form onSubmit={submit} className="flex gap-2 px-4 pt-2 pb-4 font-mono text-[0.85rem]">
          <label htmlFor="term-in" className="text-[var(--term-a2)]">
            yash@portfolio:~$
          </label>
          <input
            id="term-in"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={keys}
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="off"
            className="flex-1 bg-transparent caret-[var(--term-a2)] outline-none"
          />
        </form>
        <BorderBeam size={220} duration={12} colorFrom="var(--accent)" colorTo="var(--accent-2)" />
      </div>
    </section>
  )
}
