---
name: web-design-guidelines
description: Review UI code against Vercel's Web Interface Guidelines (100+ rules on accessibility, performance, UX). Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or before shipping significant UI changes.
---

# Web Interface Guidelines review

Vendored from `vercel-labs/agent-skills` (the upstream skill is a thin wrapper
around a live rules document).

## Process

1. Fetch the current rules from
   `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
   (always fetch fresh — the rules evolve upstream).
2. Read the files the user named; if none were named, ask which files or globs
   to review.
3. Check the code systematically against every fetched rule.
4. Report findings in concise `file:line` format as the fetched document
   specifies, ordered by severity.

## Waypoint note

Run this alongside the local `brand-review` skill: this skill covers generic
web-quality rules (a11y, performance, UX); `brand-review` covers the firm's
own doctrine. A finding from either blocks shipping.
