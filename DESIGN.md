# Firedocs

## Mission
Create implementation-ready, token-driven UI guidance for Firedocs that is optimized for consistency, accessibility, and fast delivery across the developer documentation workspace.

## Brand
- Product/brand: Firedocs
- URL: https://firedocs.dev/
- Audience: developers and technical teams
- Product surface: AI-powered documentation workspace

## Style Foundations
- Visual style: dark-first, cinematic, flat, clean, editorial
- Main font style: `font.family.headings=syne`, `font.family.body=inter`, `font.family.code=jetbrains-mono`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=13px`, `font.size.md=14px`, `font.size.lg=15px`, `font.size.xl=16px`, `font.size.2xl=40px`, `font.size.3xl=52px`, `font.size.4xl=60px`
- Color palette: `color.text.primary=#f0ede6`, `color.text.secondary=#6b6d7e`, `color.text.accent=#c9a84c`, `color.surface.base=#06070d`, `color.surface.muted=#0e0f1a`, `color.surface.raised=#1a1b2e`, `color.border.default=#1a1b2e`, `color.border.muted=#2a2b3e`
- Spacing scale: `space.1=1px`, `space.2=4px`, `space.3=6px`, `space.4=8px`, `space.5=10px`, `space.6=12px`, `space.7=16px`, `space.8=20px`
- Radius/shadow/motion tokens: `radius.xs=6px`, `radius.sm=8px`, `radius.md=10px`, `radius.lg=20px`, `radius.xl=999px` | `shadow.1=0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2)` | `motion.duration.instant=50ms`, `motion.duration.fast=150ms`, `motion.duration.normal=200ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (94), buttons (73), navigation (3), inputs (1).


## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
