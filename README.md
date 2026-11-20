# Yash — portfolio

A one-page portfolio built with Vite, TypeScript, GSAP and Lenis. No framework.

- **All content is in [`src/data.ts`](src/data.ts).** Edit that file to change text, jobs, projects and skills.
- Drop your resume PDF at `public/resume.pdf`.
- `npm install`, then `npm run dev` to work on it and `npm run build` to produce `dist/`.

## What's in it

- A cobalt poster look with a variable-width display face (Archivo). The name in the hero stretches and thickens toward your cursor, and breathes on its own on touch screens.
- Two crossing skill tapes that speed up when you scroll fast.
- A manifesto that lights up word by word as you read.
- A log of jobs and education that opens like a ledger.
- Projects on a pinned horizontal rail, each with generated cover art, so there is no stock imagery.
- A working terminal (`help`, `skills`, `projects`, `sudo hire yash`, …).
- An Invert button for a light version, plus `prefers-reduced-motion` support and keyboard focus styles.

## Deploying

The build uses relative paths, so `dist/` works on Vercel, Netlify, Cloudflare Pages or GitHub Pages without changes. On Vercel, import the repo and keep the defaults (framework: Vite).

## Claude skills

`.claude/skills/` holds skills vendored from five public repos so Claude Code picks them up in this project. See [`.claude/THIRD_PARTY_SKILLS.md`](.claude/THIRD_PARTY_SKILLS.md) for sources, commits and licenses.
