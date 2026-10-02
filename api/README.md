---
title: api
purpose: Vercel serverless functions for the PFSA public website
last_updated: 2026-10-01
status: active
---

# api

## What goes in

One TypeScript file per endpoint. `create-checkout-session.ts` starts a Stripe checkout for a donation. `stripe-webhook.ts` receives Stripe events after payment.

## What comes out

Vercel deploys each file as an endpoint under `/api/`. The donation form calls the checkout endpoint, and Stripe calls the webhook, so renaming either breaks donations.

## What stays out

Keys and secrets, which are Vercel environment variables. Front-end code, which goes in `src/`.
