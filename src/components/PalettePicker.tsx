import { useState } from 'react'

export const PALETTES = [
  { id: 'lilac', name: 'Ink & Lilac', swatch: ['#0f0e17', '#c4b0ff', '#ffb599'] },
  { id: 'arctic', name: 'Arctic', swatch: ['#f3f5f8', '#2f5bff', '#e5483c'] },
  { id: 'oxblood', name: 'Oxblood', swatch: ['#1a0c10', '#ff8a5b', '#f2c14e'] },
  { id: 'forest', name: 'Forest & Gold', swatch: ['#0e1611', '#e9c46a', '#8fd3a8'] },
]

export function setPalette(id: string) {
  document.documentElement.dataset.palette = id
  try {
    localStorage.setItem('palette', id)
  } catch {}
}

/** Preview-only bar for trying palettes. Not shown in the production build. */
export function PalettePicker() {
  const [cur, setCur] = useState(() => document.documentElement.dataset.palette || 'lilac')
  return (
    <div className="eyebrow border-border bg-surface/90 fixed top-16 right-4 z-[70] flex flex-col gap-1 rounded-2xl border p-2 shadow-xl backdrop-blur-md">
      <span className="text-muted-foreground px-2 pt-1 pb-1.5">Try a palette</span>
      {PALETTES.map((p, i) => (
        <button
          key={p.id}
          type="button"
          aria-pressed={cur === p.id}
          onClick={() => {
            setPalette(p.id)
            setCur(p.id)
          }}
          className={'flex items-center gap-2 rounded-xl px-2 py-1.5 text-left ' + (cur === p.id ? 'bg-surface-2 text-foreground' : 'text-muted-foreground hover:text-foreground')}
        >
          <span className="flex">
            {p.swatch.map((c) => (
              <span key={c} className="border-border -mr-1 size-4 rounded-full border" style={{ background: c }} />
            ))}
          </span>
          <span className="ml-1">
            {i + 1}. {p.name}
          </span>
        </button>
      ))}
      <span className="text-muted-foreground px-2 pt-1.5">Sun icon flips light/dark</span>
    </div>
  )
}
