# Yash — portfolio

A one-page portfolio built with React, Tailwind CSS v4, Vite, motion, GSAP and Lenis. UI pieces come from [Magic UI](https://magicui.design), one of the libraries on [21st.dev](https://21st.dev).

- **All content is in [`src/data.ts`](src/data.ts).** Edit that file to change text, jobs, projects and skills.
- Drop your resume PDF at `public/resume.pdf`.
- `npm install`, then `npm run dev` to work on it and `npm run build` to produce `dist/`.

## Adding more components from 21st.dev

The repo is set up the way 21st.dev and shadcn expect (`components.json`, `@/lib/utils` with `cn`, Tailwind v4 tokens in `src/index.css`). On any 21st.dev component page, copy its install command and run it here, for example:

```
npx shadcn@latest add "<the registry URL 21st.dev shows>"
```

The component lands in `src/components/ui/`. It picks up the site colours through the `background`, `foreground`, `border`, `muted`, `amber` and `mint` tokens.

Vendored so far (MIT, see `src/components/ui/MAGICUI_LICENSE.md`): marquee, number-ticker, magic-card, dock, flickering-grid, border-beam, hyper-text, spinning-text, blur-fade, scroll-progress.

## What's in it

- A "night shift" palette: deep teal control-room ground, amber for attention and mint for healthy, the two colours an on-call engineer watches. A variable-width display face (Archivo). The name in the hero stretches and thickens toward your cursor, and breathes on its own on touch screens.
- Two crossing skill tapes that speed up when you scroll fast.
- A manifesto that lights up word by word as you read.
- A log of jobs and education that opens like a ledger.
- Projects on a pinned horizontal rail, each with generated cover art, so there is no stock imagery.
- A working terminal (`help`, `skills`, `projects`, `sudo hire yash`, …).
- A floating dock nav that magnifies on hover, and a light theme toggle in it, plus `prefers-reduced-motion` support and keyboard focus styles.

## Deploying

The build uses relative paths, so `dist/` works on Vercel, Netlify, Cloudflare Pages or GitHub Pages without changes. On Vercel, import the repo and keep the defaults (framework: Vite).

## Claude skills

`.claude/skills/` holds skills vendored from five public repos so Claude Code picks them up in this project. See [`.claude/THIRD_PARTY_SKILLS.md`](.claude/THIRD_PARTY_SKILLS.md) for sources, commits and licenses.
