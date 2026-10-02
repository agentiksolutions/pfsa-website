---
title: config
purpose: Non-secret configuration for the PFSA public website
last_updated: 2026-10-01
status: active
---

# config

## What goes in

Configuration files that are safe to commit. Empty so far. Build configs stay at the root, where Vite, TypeScript and ESLint look for them.

## What comes out

Nothing reads this folder yet.

## What stays out

Secrets and keys, which are Vercel environment variables or a gitignored `.env`. Framework configs, which stay at the root.
