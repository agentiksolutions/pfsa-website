# pfsa-website

The public website for PFSA (The Public Foundation for Stewardship Advancement, a 501(c)(3)
nonprofit in Lexington, KY), live at https://www.thepfsa.org. It is the informational site,
separate from the donor management app at app.thepfsa.org.

It is a React and TypeScript app built with Vite, started from the Vite React TypeScript
template, and hosted on Vercel. A push to `main` deploys to production. Two serverless
functions handle online donations through Stripe. `CLAUDE.md` holds the project context Claude
Code loads.

## Getting started

```bash
npm install
npm run dev      # Vite dev server
npm run build    # type check, then production build into dist/
npm run lint     # ESLint
```

## Layout

```
src/          application code: the page sections in components/, the Supabase client in lib/
public/       static files Vite copies into the build as-is
api/          Vercel serverless functions for Stripe checkout and its webhook
docs/         internal working documents (empty so far)
scripts/      command-line tools (empty so far)
config/       non-secret configuration (empty so far)
_archive/     retired material kept for the record
.claude/      Claude Code settings and project rules
.git.corrupt-backup-2026-06-10/   leftover from the June 2026 repository corruption (see below)
```

Each folder has a README that says what goes in, what comes out and what stays out, except
`public/`, `.claude/` and the corrupt-repo backup (see below) and `_archive/`, which needs none.

## What stays at the root and why

- `package.json`, `package-lock.json`, `vite.config.ts`, `eslint.config.js`, `tsconfig.json`,
  `tsconfig.app.json`, `tsconfig.node.json` and `index.html`: Vite, TypeScript and ESLint look
  for them at the root.
- `vercel.json`: Vercel reads the rewrites from it.
- `CONTEXT_PINS.md`: the post-compact hook (`~/.claude/hooks/post-compact-restore.js`) reads
  it from the project root to restore context after a compaction. It must not move.
- `DECISION-LOG.md`: the old decision record. New decisions would go in `decisions/`. It
  stays at the root until Phil decides whether to convert it.
- `.cursorrules`: settings for the Cursor editor. Whether to retire it is Phil's call.
- `.git.corrupt-backup-2026-06-10/`: a copy of the git folder from the June 2026 repository
  corruption. Unlike in the other PFSA repos, this one is committed: a nightly sync added it
  on 2026-06-12, and this repo's `.gitignore` has no rule for it. Deleting it is Phil's call.

## Folders without their own README

`public/` has no README because Vite copies every file in it into the live site, so a
`README.md` there would be served publicly. Its contract:

- **What goes in:** files served at a fixed URL: `favicon.svg` and the PayPal and Venmo QR
  codes used on the donate section.
- **What comes out:** `vite build` copies them unchanged into `dist/`, which Vercel serves.
- **What stays out:** anything private, and images the app imports from `src/`.

`.claude/` holds `settings.json`, project rules in `rules/` (`pfsa-site-constraints.md`), and
empty `agents/`, `hooks/` and `skills/` folders. Every `.md` in `rules/` loads into every
session and every `.md` in `agents/` is parsed as an agent, so neither folder gets a README.

## Open work

Tracked in `philip-brain/PIPELINE.json`.
