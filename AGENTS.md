# AGENTS.md for study_ws

## Repository Intent

This repository is the learning workspace for a software testing study website.

The product should help a beginner learn software testing through a clear route map, small knowledge units, friendly explanations, and practical checkpoints.

Current project direction:

- Product type: software testing learning route navigation website
- Primary learner: zero-background or near-zero-background beginner
- First technical stack: React + Vite + TypeScript + Tailwind CSS
- First persistence layer: browser localStorage
- First delivery target: locally runnable web app

## Product Priorities

1. Make the learning route clear before adding advanced features.
2. Explain concepts in beginner-friendly language.
3. Keep every topic small enough to learn and practice.
4. Preserve room for iteration; requirements are allowed to evolve.
5. Avoid overbuilding backend, login, or platform features before the route map works.

## Stable First Scope

The first version should focus on:

- learning route overview
- stage cards
- topic detail pages
- local learning status
- simple progress view
- clear navigation back to the route

Do not add these unless explicitly requested for a later iteration:

- user login
- remote database
- paid course features
- complex admin dashboard
- online code execution
- multiplayer or community features

## Working Rules

- Treat `docs/requirements.md` as a living document, not a frozen contract.
- Update requirements when a product decision changes meaningfully.
- Prefer one feature per branch.
- Keep changes small and reviewable.
- Do not mix project bootstrap, UI feature work, content expansion, and refactors in one branch unless the user asks for it.
- Before adding a dependency, confirm it supports the current learning-site goal.
- Keep explanations, UI labels, and learning content friendly to beginners.
- Avoid unexplained testing jargon in visible content.
- If a term is necessary, explain it near first use.

## Branch Naming

Use `codex/` branches by default.

Suggested branch types:

- `codex/chore-project-bootstrap`
- `codex/docs-learning-site-requirements`
- `codex/feature-learning-map`
- `codex/feature-topic-detail`
- `codex/feature-local-progress`
- `codex/feature-search-filter`
- `codex/feature-quiz`

## Expected Directories

Expected project layout after bootstrap:

- `src/` application source
- `src/components/` reusable UI components
- `src/pages/` route-level pages
- `src/data/` learning route and topic data
- `src/lib/` local helpers
- `src/styles/` global styles if needed
- `docs/` requirements, plans, and learning design notes
- `.agents/skills/` repo-local skills for Codex guidance

## Learning Content Rules

Each knowledge topic should answer:

1. What is it?
2. Why should I learn it?
3. How is it used at work?
4. What small practice can I do?
5. How do I know I have learned enough for now?

Each topic should also declare:

- stage
- level
- prerequisites
- practical exercise
- completion criteria

## UI Rules

- Build the actual learning route as the first screen, not a marketing landing page.
- Make the next learning step obvious.
- Keep navigation simple.
- Prefer clear buttons such as `开始学习`, `继续学习`, `标记完成`, and `返回路线`.
- Use progress indicators only when they help the learner understand where they are.
- Avoid decorative complexity that distracts from learning.

## Validation Expectation

For documentation changes:

- Confirm files render as readable Markdown.
- Confirm terminology still matches the beginner positioning.

For frontend changes:

- Run the available build or lint command.
- Open the app locally when practical.
- Check that core navigation works.
- Check that beginner-facing text is readable and not too dense.

## Repo-Local Skill

When working on requirements, content design, learning routes, topic pages, or frontend implementation for this project, consult:

- `.agents/skills/software-testing-learning-site/SKILL.md`

