import { useEffect, useState, useSyncExternalStore } from 'react'

function media(q: string) {
  return (cb: () => void) => {
    const m = matchMedia(q)
    m.addEventListener('change', cb)
    return () => m.removeEventListener('change', cb)
  }
}

export const useReducedMotion = () =>
  useSyncExternalStore(media('(prefers-reduced-motion: reduce)'), () => matchMedia('(prefers-reduced-motion: reduce)').matches)

export const useFinePointer = () =>
  useSyncExternalStore(media('(hover: hover) and (pointer: fine)'), () => matchMedia('(hover: hover) and (pointer: fine)').matches)

/** Reads a CSS custom property from :root and re-reads it when the theme flips. */
export function useCssVar(name: string) {
  const read = () => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const [v, setV] = useState(read)
  useEffect(() => {
    const mo = new MutationObserver(() => setV(read()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-palette'] })
    return () => mo.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  return v
}

export type Theme = 'dark' | 'light'

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('theme') as Theme) || 'dark'
    } catch {
      return 'dark'
    }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

export function useClock(timeZone: string) {
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const [now, setNow] = useState(() => fmt.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone])
  return now
}
