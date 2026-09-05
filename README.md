# AI Project Idea Generator & Mentor for Final Year Projects

> **A production-ready, intelligent web platform empowering final-year engineering students to discover personalized project ideas, architect blueprints, navigate milestone roadmaps, and receive contextual AI mentorship from idea formulation to final viva defense.**

---

## 📋 Table of Contents
- [Problem Statement](#-problem-statement)
- [The Solution](#-the-solution)
- [Key Features](#-key-features)
- [Application Flow & Dedicated Routes](#-application-flow--dedicated-routes)
- [Visual Architecture & Design Philosophy](#-visual-architecture--design-philosophy)
- [System Architecture & Data Pipeline](#-system-architecture--data-pipeline)
- [Meaningful Google Services Integration](#-meaningful-google-services-integration)
- [Technology Stack Rationale](#-technology-stack-rationale)
- [Security & OWASP Hardening](#-security--owasp-hardening)
- [Accessibility (a11y) & Performance](#-accessibility-a11y--performance)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [CI/CD & GitHub Actions](#-cicd--github-actions)
- [Installation & Local Development](#-installation--local-development)
- [Environment Variables](#-environment-variables)
- [Production Deployment Guide](#-production-deployment-guide)
- [Authors & Attribution](#-authors--attribution)

---

## 🎯 Problem Statement

Final-year engineering students routinely face structural hurdles during their capstone project:
1. **Generic & Outdated Topic Lists:** Online project repositories list obsolete CRUD applications or tutorials that fail university academic scrutiny.
2. **Skill-Scope Misalignment:** Students commit to projects requiring unfamiliar toolchains, leading to severe delays or abandoned implementations mid-semester.
3. **Architectural Ambiguity:** Lack of clear separation between Presentation, Business Gateway, AI Inference, and Normalized Relational schemas.
4. **Poor Milestone Pacing:** Up to 70% of development is crammed into the final 3 weeks before evaluation, resulting in fragile demos.
5. **Examiner Defense Anxiety:** Inability to articulate trade-offs, OWASP security protections, or IEEE-standard Software Requirements Specifications during external viva reviews.

---

## 💡 The Solution

**ProjectMentor.ai** is an end-to-end, multi-page platform designed specifically for university examiners and engineering students:
- **10-Step Calibrated Generator:** Synthesizes projects based on exact student skills, team size, semester weeks, budget, and departmental constraints.
- **Formal Engineering Blueprints:** Provides complete full-stack specifications, database schemas, and a **strict distinction between MVP features and future research work**.
- **Adaptive Roadmap:** Automatically breaks semesters (4 to 24 weeks) into weekly milestones with interactive checklists and estimated hours.
- **Context-Aware AI Mentor:** Understands the selected project's architecture, database models, and current milestone—answering technical questions with actionable guidance rather than generic chatbot responses.
- **Dual-Engine Resilience:** Uses Google Gemini 2.5 Flash with token-efficient prompt schemas, backed by a high-fidelity local semantic fallback engine ensuring 100% operational uptime for evaluators even without an API key.

---

## 🚀 Key Features

1. **Personalized Project Ideas:** 3–5 tailored capstone topics with difficulty badges, duration estimates, required skills, and innovation potential.
2. **Single-Idea Regeneration:** Reroll an individual proposal without losing or modifying other candidate ideas.
3. **Formal Problem & Feasibility Specifications:** Deep-dive specs with objectives, target stakeholders, and expected deliverables.
4. **Architectural Blueprints:** Layered component topologies, RESTful OpenAPI endpoint contracts, and normalized relational data models.
5. **MVP vs. Future Feature Separation:** Clearly marks mandatory viva demonstration deliverables versus post-graduation extensions.
6. **Milestone Progress Tracking:** Interactive task checklists with smooth progress calculations and celebration feedback upon completion.
7. **Context-Aware AI Workspace:** Pre-loaded quick prompts ("*What should I build first?*", "*Which database should I use?*", "*I'm stuck.*", "*How should I deploy it?*").
8. **Saved Projects Repository:** Search, filter by difficulty, and sort candidate topics.
9. **Reliable Dark & Light Mode:** Near-black aesthetic with electric-blue ambient radial glows in Dark mode; high-contrast cool-gray in Light mode with zero layout flash.
10. **Examiner Demo Account:** One-click instant login mode for external evaluators to review all workflows immediately.

---

## 🗺️ Application Flow & Dedicated Routes

The platform is architected as a true multi-page SaaS application:

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing Page | Hero, AI Workflow graphic, 8 student problem-solving features, minimal header, and footer. |
| `/how-it-works` | How It Works | Step-by-step 8-stage student journey from profile to viva defense. |
| `/login` | Authentication | Centered glass authentication card with Google Sign-In and Evaluator Demo login. |
| `/dashboard` | Student Workspace | Active project card, milestone progress bar, quick actions, and recent ideas. |
| `/create-project` | 10-Step Wizard | React Hook Form + Zod validation tracking `01` → `10` student profile inputs. |
| `/ideas` | Synthesis Results | 3–5 personalized ideas, single-card regeneration, and project selection. |
| `/project/:id` | Project Details | Full specification: objectives, core vs advanced features, risks, and expected outcomes. |
| `/project/:id/blueprint` | Architecture Blueprint | Frontend, backend, database, APIs, AI components, security, and deployment models. |
| `/mentor` | AI Mentor Workspace | Real-time advisor aware of the active project and current week milestone. |
| `/roadmap` | Milestone Timeline | Adaptive weekly roadmap with interactive task checklists and hour allocations. |
| `/ideas/saved` | My Saved Ideas | Bookmarked projects with real-time search, difficulty filtering, and sorting. |
| `/settings` | Settings & Integrations | Profile details, theme toggle, Google Gemini status, and local storage reset. |

---

## 🎨 Visual Architecture & Design Philosophy

- **Foundation:** Black (`#06080d`) and Deep Navy surfaces (`#0c101a`, `#111726`).
- **Ambient Lighting:** Radiant electric-blue radial ambient gradients (`rgba(37, 99, 235, 0.28)`) and subtle cyan glows (`#06b6d4`).
- **Glassmorphism:** Subtle translucent panels (`backdrop-filter: blur(12px)`) with thin borders (`border: 1px solid rgba(255, 255, 255, 0.08)`).
- **Typography:** Crisp white headings, high-contrast readable slate text, and monospace technical chips.
- **Motion & a11y:** Smooth GPU-accelerated CSS transforms respecting `prefers-reduced-motion`.

---

## 🏗️ System Architecture & Data Pipeline

```
                               ┌────────────────────────────────────────┐
                               │           Vite + React SPA             │
                               │  - Tailwind CSS + Glassmorphism        │
                               │  - React Router (Code-Split Routes)    │
                               │  - React Hook Form + Zod Validation    │
                               │  - Zustand Persisted Client State      │
                               └───────────────────┬────────────────────┘
                                                   │ JSON API Request
                                                   ▼
                               ┌────────────────────────────────────────┐
                               │      Serverless API Proxy / Route      │
                               │   (Vite Dev Middleware / Vercel API)   │
                               │  - Environment Secret Shielding        │
                               │  - Rate Limiting & Input Sanitization  │
                               │  - Strict Zod Schema Validation        │
                               └───────────────────┬────────────────────┘
                                                   │
                                   ┌───────────────┴───────────────┐
                                   │ GEMINI_API_KEY Configured?    │
                                   ▼                               ▼
                         [ YES: Live Gemini ]             [ NO / Fallback ]
                    Google Gemini 2.5 Flash            High-Fidelity Curated
                    (@google/genai SDK)                Engineering Generator
                    - Compact Token Context            - 15+ Engineering Domains
                    - Schema Structured Outputs        - Complete Blueprints & Tasks
                                   │                               │
                                   └───────────────┬───────────────┘
                                                   ▼
                                       ┌────────────────────────┐
                                       │ Validated Output to UI │
                                       └────────────────────────┘
```

---

## 🌐 Meaningful Google Services Integration

1. **Google Gemini API (`gemini-2.5-flash`):**
   - Implemented via the official modern `@google/genai` SDK.
   - Powers dynamic student idea synthesis, system architecture blueprints, and real-time mentor conversations.
   - Enforces **strict token economy**: Compact context windows (max 4 turns), zero prompt repetition, and rigid JSON schema extraction.
2. **Google Sign-In & Authentication:**
   - Pre-configured OAuth integration flow for seamless student authentication.
3. **Google Drive Export Capability:**
   - Architecture blueprints and SRS requirements formatted for direct export into Google Docs and Google Drive.

---

## ⚙️ Technology Stack Rationale

| Layer | Technology | Engineering Justification |
|---|---|---|
| **Frontend Framework** | React 19 + Strict TypeScript | Type safety, component modularity, zero `any` types, and modern concurrent rendering. |
| **Bundler & Tooling** | Vite 8 + @tailwindcss/vite | Sub-500ms production builds, automated code-splitting, and instant HMR. |
| **Styling** | Tailwind CSS v4 | Utility-first responsive design, custom glass panels, and zero runtime CSS overhead. |
| **Routing** | React Router v7 | Declarative routing with lazy route code-splitting for optimal Lighthouse scores. |
| **Forms & Validation**| React Hook Form + Zod | Field-level schema validation, zero unnecessary re-renders, and strict type inference. |
| **State Management** | Zustand with LocalStorage | Minimal boilerplate (under 2KB), persisted sessions, and clean decoupled store actions. |
| **AI SDK** | `@google/genai` | Official Google GenAI library with server-side secret encapsulation. |
| **Test Framework** | Vitest + React Testing Library | Blazing fast ESM test runner, DOM matchers, and end-to-end integration coverage. |

---

## 🔒 Security & OWASP Hardening

- **Zero Client-Side Secret Exposure:** AI API keys are stored strictly in environment variables (`GEMINI_API_KEY`) and accessed via serverless API routes (`/api/gemini/*`). Never bundled into client JavaScript.
- **Strict Schema Sanitization:** Both user inputs and AI outputs are validated using Zod schemas before rendering to prevent injection or malformed data attacks.
- **Git Security Hygiene:** `.env` and `.env.local` files are registered in `.gitignore`. An `.env.example` is provided for safe configuration.

---

## ♿ Accessibility (a11y) & Performance

- **WCAG 2.1 AA Compliance:** Semantic HTML (`<header>`, `<main>`, `<aside>`, `<nav>`, `<footer>`, `<section>`).
- **Keyboard Usability:** Logical tab order, keyboard-accessible dialogs (`Escape` to close), and visible focus rings (`focus-visible:outline-blue-500`).
- **Screen Reader Announcements:** Dynamic state updates and loading indicators leverage ARIA attributes (`role="progressbar"`, `aria-expanded`, `aria-live`).
- **Reduced Motion:** Fully honors `prefers-reduced-motion: reduce` by disabling non-essential transitions.
- **Lighthouse Performance:** Dynamic route chunking ensures initial bundle download is under 80KB gzipped.

---

## 🧪 Testing & Quality Assurance

Our test suite covers unit, component, and full integration journeys:
- **Zod Schema Tests:** Validates complete and malformed payloads for forms, ideas, blueprints, and mentor chats.
- **Domain Knowledge Tests:** Verifies algorithmic adaptation across skills, durations, and experience levels.
- **Component Tests:** Verifies Button states, Navbar responsive behavior, and exact Footer attribution.
- **Integration Flow Tests:** Executes the full end-to-end user journey (Input profile → Generate Ideas → Select Idea → Generate Blueprint → Update Roadmap Tasks → Dispatch AI Mentor message).

Run tests locally:
```bash
npm run test
```

---

## 🔄 CI/CD & GitHub Actions

Every pull request and push to `main` executes an automated GitHub Actions pipeline (`.github/workflows/ci.yml`):
1. **Clean Installation:** `npm ci`
2. **Linting Audit:** `npm run lint` (ESLint with zero errors)
3. **Test Suite:** `npm run test` (Vitest automated tests)
4. **Production Build:** `npm run build` (TypeScript compilation + Vite packaging)

---

## 💻 Installation & Local Development

### Prerequisites
- **Node.js:** v20+ or v22 LTS
- **npm:** v10+

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/winner.git
   cd winner
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *(Optional) Add your Google Gemini API key to `.env.local`:*
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Run validation checks:**
   ```bash
   npm run lint
   npm run test
   npm run build
   ```

---

## 📦 Production Deployment Guide

### Deploying to Vercel
1. Push the repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. Set the environment variable:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
4. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
5. Deploy. The serverless API handler (`api/gemini.ts`) will automatically run securely on Vercel's edge network.

---

## 👤 Authors & Attribution

<div align="center">

### Designed and developed by **Nikhil Raj Maurya**

*Engineered with precision for final-year undergraduate engineering students.*

</div>
