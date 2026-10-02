---
title: src
purpose: Application code for the PFSA public website
last_updated: 2026-10-01
status: active
---

# src

## What goes in

The React and TypeScript app: `main.tsx`, `App.tsx`, `index.css`, one component per page section in `components/`, and the Supabase client in `lib/supabase.ts`.

## What comes out

`npm run build` type checks this folder and bundles it into `dist/`, which Vercel deploys.

## What stays out

Server code that needs a secret goes in `api/`. Files served at a fixed URL go in `public/`. Keys never go in code.
