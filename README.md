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

- Midnight chrome with liquid glass: a near-black ground with slow silver and blue light drifting behind it. The header, dock, cards, panels and terminal are glass that blurs and bends what's behind it, and the big lettering is clear glass with a bright rim. All of it lives in `src/index.css` and `src/components/Glass.tsx`. A variable-width display face (Archivo). The name in the hero stretches and thickens toward your cursor, and breathes on its own on touch screens.
- A glass skill tape that scrolls past.
- A manifesto that lights up word by word as you read.
- A log of jobs and education that opens like a ledger.
- Projects on a pinned horizontal rail, each with generated cover art, so there is no stock imagery.
- A working terminal (`help`, `skills`, `projects`, `sudo hire yash`, …).
- A floating glass dock nav that magnifies on hover, plus `prefers-reduced-motion` support and keyboard focus styles.

## Deploying

Every push to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`. In the repo settings, under Pages, set Source to "GitHub Actions" once.

The build uses relative paths, so `dist/` also works on Vercel, Netlify or Cloudflare Pages without changes.

## Claude skills

`.claude/skills/` holds skills vendored from five public repos so Claude Code picks them up in this project. See [`.claude/THIRD_PARTY_SKILLS.md`](.claude/THIRD_PARTY_SKILLS.md) for sources, commits and licenses.
