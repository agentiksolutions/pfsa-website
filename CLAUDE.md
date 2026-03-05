# PFSA Website

## What This Project Is
The public-facing website for The Public Foundation for Stewardship Advancement, Inc. (PFSA) â€” a 501(c)(3) nonprofit based in Lexington, KY. This is the informational site at www.thepfsa.org, separate from the donor management app at app.thepfsa.org. Single-commit complete build.

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

## Last Session
**Date:** 2026-02-25
**What we did:** Updated CLAUDE.md (corrected stale state info, confirmed Vercel deployment).

## What's Next
- [ ] Content updates as needed
- [ ] Ensure consistency with PFSA Board Portal branding

## Key Decisions
- Separate project from PFSA Board Portal â€” different repo, different Vercel project
- Public-facing only â€” no auth, no database
- Same brand identity as PFSA Board Portal (PFSA brand colors)

## Rules
- Keep branding consistent with the PFSA Board Portal app
- Do not add any auth or database functionality â€” this is a static informational site
- Deploy via GitHub push â†’ Vercel auto-deploy

## SESSION RULES (Two-Tier)

**Light Session** (< 30 min, single project, no architectural changes):
1. Update PIPELINE.json if tasks changed
2. Git commit and push affected repos

**Heavy Session** (multi-project, architectural changes, new workflows/agents):
1. Update PIPELINE.json
2. Write handoff file to `Maverick/Log/handoffs/YYYY-MM-DD-HHMM-{slug}.md`
3. Update SESSION-HANDOFF.md
4. Update this CLAUDE.md if architecture changed
5. Update Running Doc (E:/Cortex/philip-brain/PFSA/PFSA - Running Doc.md) if project state changed
6. Append to daily roll-up `_Sessions/YYYY-MM-DD.md`
7. Git commit and push all affected repos

**Rule:** Claude Code self-determines which tier applies. Default to Light unless the session touches multiple projects or changes system architecture.
