---
name: software-testing-learning-site
description: Use when working on this repository's software testing learning route navigation website, including requirements, product scope, information architecture, beginner-friendly learning content, React frontend features, local progress, and topic data.
---

# Software Testing Learning Site

Use this skill whenever the task touches the software testing learning website.

## Core Intent

Build a beginner-friendly learning route navigation site for software testing.

The learner should always be able to answer:

- Where am I in the learning route?
- What should I learn next?
- What does this topic mean in plain language?
- What small practice can I do now?
- How do I know I can move on?

## Read First

Before changing product scope, content structure, or frontend behavior, read:

- `AGENTS.md`
- `docs/requirements.md`

Treat `docs/requirements.md` as a living document. Update it when the product direction changes in a meaningful way.

## Product Guardrails

Prioritize:

- learning route clarity
- beginner-friendly explanations
- small practical exercises
- local progress tracking
- simple navigation

Defer unless explicitly requested:

- login
- backend services
- cloud sync
- admin dashboards
- paid course flows
- online code execution

## Content Pattern

Every topic should follow this teaching pattern:

1. `这是什么` - plain-language explanation.
2. `为什么要学` - why it matters for software testing.
3. `工作里怎么用` - realistic work scenario.
4. `小练习` - one small action the learner can complete.
5. `过关标准` - simple completion criteria.

Use concrete examples before abstract definitions.

Bad:

> HTTP 是一种超文本传输协议。

Better:

> 当浏览器打开网页、Postman 调接口、手机 App 加载数据时，很多时候都是通过 HTTP 和服务器说话。接口测试要先知道这种“说话”的基本规则。

## Learning Route Order

Default route order:

1. 测试基础
2. 计算机和工具基础
3. Python 编程基础
4. 接口测试
5. Web 自动化测试
6. APP 自动化测试
7. 性能测试
8. 持续集成和测试开发

Do not jump directly into automation, CI, or performance testing without preserving the beginner path.

## Topic Data Guidance

Prefer structured data over hardcoded page content.

Suggested topic fields:

- `id`
- `title`
- `stage`
- `level`
- `summary`
- `beginnerExplanation`
- `whyItMatters`
- `workScenario`
- `prerequisites`
- `practice`
- `doneCriteria`
- `resources`

Use stable ids because progress will be stored locally.

## Frontend Guidance

Default stack:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- lucide-react
- localStorage

Implementation preferences:

- Keep the first screen focused on the learning route.
- Use route-level pages for overview, stage detail, topic detail, and progress.
- Keep reusable UI in `src/components/`.
- Keep learning data in `src/data/`.
- Keep localStorage helpers in `src/lib/`.
- Avoid large all-in-one components.

## Branch Discipline

Use one feature per branch.

Examples:

- `codex/chore-project-bootstrap`
- `codex/feature-learning-map`
- `codex/feature-topic-detail`
- `codex/feature-local-progress`
- `codex/feature-search-filter`

Do not mix unrelated features into one branch.

## Validation Checklist

For content work:

- Is it understandable to a zero-background learner?
- Are necessary terms explained?
- Does the topic include a practice task?
- Does it include a clear completion standard?

For frontend work:

- Can the app run locally?
- Can the learner navigate from route overview to topic detail?
- Is progress behavior predictable?
- Does the UI avoid unnecessary visual clutter?

