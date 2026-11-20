/**
 * Liquid glass, in the spirit of Apple's 2025 material: a refracting, blurred
 * backdrop, a faint tint, and a bright specular rim. Everything here only shows
 * when the palette turns glass on (see `.glass` rules in index.css).
 */

/** One SVG filter shared by every glass surface. Bends what is behind the glass. */
export function GlassDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
      <filter id="liquid-glass" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="3" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

/** Drop inside any `.glass` element (which must be relative + rounded). */
export function GlassFx() {
  return (
    <>
      <span aria-hidden="true" className="glass-fx glass-fx-refract" />
      <span aria-hidden="true" className="glass-fx glass-fx-tint" />
      <span aria-hidden="true" className="glass-fx glass-fx-shine" />
    </>
  )
}

/** Slow-moving silver light behind the page, so the glass has something to bend. */
export function ChromeOrbs() {
  return (
    <div aria-hidden="true" className="chrome-orbs">
      <span />
      <span />
      <span />
    </div>
  )
}
