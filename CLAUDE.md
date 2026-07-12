# PFSA Website

## What This Project Is
The public-facing website for The Public Foundation for Stewardship Advancement, Inc. (PFSA) — a 501(c)(3) nonprofit based in Lexington, KY. This is the informational site at www.thepfsa.org, separate from the donor management app at app.thepfsa.org. Single-commit complete build.

Also read E:/Cortex/philip-brain/PHIL-OPERATOR-PROFILE.md for operating rules and communication style.

## Tech Stack & Location
- **Stack:** React 19 + Vite 7 + TypeScript + Tailwind CSS 4 + Lucide React
- **Local path:** E:\Cortex\pfsa-website\
- **Live URL:** https://www.thepfsa.org
- **GitHub:** https://github.com/agentiksolutions/pfsa-website.git
- **Vercel project:** prj_mPqw2lyrtVE8eCN8FKlptRLoq18h (team: agentiksolutions-projects)
- **Domain:** thepfsa.org (third-party registrar, nameservers pointed to Vercel)

## Current State
- **Live and deployed** at www.thepfsa.org
- GitHub remote configured — agentiksolutions/pfsa-website
- Deploys via GitHub push → Vercel auto-deploy

## What's Next
- [ ] Content updates as needed
- [ ] Ensure consistency with PFSA Board Portal branding

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — typecheck + production build (`tsc -b && vite build`)
- `npm run preview` — preview the production build
- `npm run lint` — ESLint
- Deploy: `git push` to main → Vercel auto-deploy

## Rules
See @.claude/rules/core-rules.md

## Session Rules
Two-tier session protocol (Light vs Heavy) lives in the global CLAUDE.md at `~/.claude/CLAUDE.md`. Running Doc for this project: `E:/Cortex/philip-brain/PFSA/PFSA - Running Doc.md`.

*Last updated: 2026-03-22 (restructured — rules extracted to .claude/rules/)*
