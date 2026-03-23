# PFSA Website — Initial Learnings (2026-03-23)

## Architecture Decisions Made Tonight

### CLAUDE.md Restructuring
- CLAUDE.md kept concise: identity, stack, run commands, doc pointers only
- Reference content in `.claude/docs/` — loaded on demand
- Token efficiency matters — lean context = faster sessions

### Rules Extraction
- Rules in `.claude/rules/` as separate .md files, auto-loaded by Claude Code
- One file per concern: accessibility rules, SEO rules, content guidelines

### Hooks & Quality
- Pre-commit hooks enforce standards before code merges
- Keep hooks fast — fix root causes, never bypass

### Session Protocol
- Light/Heavy two-tier system — self-determine based on scope
- Always update PIPELINE.json on close

### PFSA Website-Specific Patterns
- Public-facing website for the Phil Fifield Scholarship Association
- Must be accessible (WCAG 2.1 AA minimum) — it's a nonprofit
- SEO matters for donor discovery — proper meta tags, structured data
- Static site / Vercel deployment — keep it fast and simple
- Content changes should be easy for non-technical board members
- Branding: professional but warm — reflects scholarship mission
