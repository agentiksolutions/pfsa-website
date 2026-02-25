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

## SESSION RULES

### Session Start
At the start of every session, create a session log at `E:/Cortex/philip-brain/PFSA/Sessions/YYYY-MM-DD - [brief topic].md` using this format:

```
---
date: [today's date]
project: PFSA Website
tags: []
---

# Session Log â€” [date]

## What We Worked On

## Decisions Made

## Ideas / Feature Requests

## Bugs / Issues Found

## Questions for Next Session

## Notes
```

### Session End
At the end of every session, update this CLAUDE.md:
1. Update **Last Session** with today's date and work done
2. Update **Current State** if changed
3. Check off completed **What's Next** items
4. Add new items discovered during the session
5. Also update the vault Running Doc at `E:/Cortex/philip-brain/PFSA/PFSA - Running Doc.md`
6. Fill in **What We Worked On** and **Decisions Made** in the session log created at session start
