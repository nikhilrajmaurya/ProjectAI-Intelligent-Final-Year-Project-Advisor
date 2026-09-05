import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Lightbulb,
  Cpu,
  Layers,
  Compass,
  Bot,
  AlertTriangle,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { WorkflowVisual } from '../components/landing/WorkflowVisual';
import { GlassCard } from '../components/common/GlassCard';

export const LandingPage: React.FC = () => {
  const features = [
    {
      id: '01',
      title: 'Personalized Project Ideas',
      problem: 'Generic online project lists are either completely outdated, too trivial for university approval, or too convoluted to complete within a semester.',
      solution: 'Our AI analyzes your exact engineering discipline, technical stack, team size, and deadline to synthesize 3-5 academically rigorous, contemporary projects.',
      icon: Lightbulb,
      tag: 'Custom Synthesis',
    },
    {
      id: '02',
      title: 'Skill-Based Recommendations',
      problem: 'Students pick ideas outside their practical competency, getting trapped mid-semester trying to learn 4 new languages simultaneously.',
      solution: 'The platform anchors core features strictly around the skills you already know, carefully introducing at most 1-2 modern complementary tools to ensure on-time delivery.',
      icon: Cpu,
      tag: 'Competency Mapping',
    },
    {
      id: '03',
      title: 'Technology Guidance',
      problem: 'Choosing between SQL vs NoSQL, REST vs GraphQL, or PyTorch vs cloud APIs leads to architectural paralysis and unmaintainable glue code.',
      solution: 'Receive explicit, opinionated tech stack recommendations explaining exactly why each database, framework, and library was selected for your specific domain.',
      icon: Layers,
      tag: 'Stack Rationale',
    },
    {
      id: '04',
      title: 'Dynamic Development Roadmaps',
      problem: 'Most teams leave 70% of implementation to the final 3 weeks before project submission, leading to broken demos and panicky viva defenses.',
      solution: 'Automatically generates a week-by-week milestone schedule (from 4 to 24 weeks) with granular tasks, realistic hour estimates, and interactive completion tracking.',
      icon: Compass,
      tag: 'Milestone Tracking',
    },
    {
      id: '05',
      title: 'Context-Aware AI Project Mentor',
      problem: 'Academic guides are frequently busy with research papers, leaving students blocked for days on single bugs, architecture decisions, or library incompatibilities.',
      solution: 'A 24/7 dedicated mentor that maintains full memory of your project scope, code architecture, and current milestone to provide actionable, step-by-step unblocking.',
      icon: Bot,
      tag: 'Zero-Wait Unblocking',
    },
    {
      id: '06',
      title: 'Proactive Risk Detection',
      problem: 'Hidden bottlenecks—such as unexpected third-party API rate limits, heavy cloud costs, or missing datasets—derail projects late in the semester.',
      solution: 'Every generated project comes pre-audited with its Top 3 technical and operational risks, paired with concrete contingency plans and free-tier alternatives.',
      icon: AlertTriangle,
      tag: 'Early Mitigation',
    },
    {
      id: '07',
      title: 'Continuous Project Improvement',
      problem: 'Students build a rudimentary working prototype but do not know how to elevate it to a distinguished, publishable, or hackathon-winning tier.',
      solution: 'Get targeted recommendations for adding real-time telemetry, automated CI/CD pipelines, explainable AI traces, and formal verification tests to impress examiners.',
      icon: TrendingUp,
      tag: 'Examiner Edge',
    },
    {
      id: '08',
      title: 'Final-Year Submission Preparation',
      problem: 'Even brilliant projects fail to achieve top honors because students lack IEEE-format reports, clear architecture diagrams, and confident viva Q&A preparation.',
      solution: 'Generates structured SRS specifications, system architecture breakdowns, MVP boundaries, and anticipated examiner viva defense questions with sample answers.',
      icon: GraduationCap,
      tag: 'Viva Defense Ready',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden" aria-label="Introduction">
          {/* Large Radiant Ambient Glow with smooth keyframe pulse */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] radial-glow-hero pointer-events-none -z-10" />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Animated Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-cyan-300 text-xs font-medium mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-float-subtle transition-transform">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Built Specifically for Engineering Undergraduate Final Years</span>
            </div>

            {/* Main Headline with Smooth Shimmer Accent */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] sm:leading-[1.15]">
              Turn Your Skills Into Your{' '}
              <span className="shimmer-text">
                Final-Year Project.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Generate practical project ideas, discover the right technologies, build a development roadmap, and get AI mentorship from idea to implementation.
            </p>

            {/* Call to Actions with Enhanced Focus & Hover Effects */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/create-project"
                className="btn-primary text-sm sm:text-base px-7 py-3.5 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-blue-600/25 group focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/how-it-works"
                className="btn-secondary text-sm sm:text-base px-6 py-3.5 rounded-xl font-medium focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                See How It Works
              </Link>
            </div>

            {/* Interactive Hero Visual Pipeline */}
            <div className="mt-14 sm:mt-16">
              <WorkflowVisual />
            </div>
          </div>
        </section>

      {/* Trust & Performance Metrics Banner */}
      <section className="border-y border-white/[0.06] bg-slate-950/40 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">100%</div>
            <div className="text-xs text-slate-400 mt-1">Schema Validated Output</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-tight">15+</div>
            <div className="text-xs text-slate-400 mt-1">Engineering Domains</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">4 to 24</div>
            <div className="text-xs text-slate-400 mt-1">Adaptive Weeks Timeline</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight">0%</div>
            <div className="text-xs text-slate-400 mt-1">Hallucinated Dependencies</div>
          </div>
        </div>
      </section>

      {/* 8 Core Problem-Solving Features */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] radial-glow-center pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
              <span>Engineered for Real Student Challenges</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Everything Needed to Complete and Defend Your Capstone Project
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              University final-year projects have unique grading rubrics. Each feature addresses the exact academic bottlenecks that cause projects to stall or lose marks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard
                  key={item.id}
                  hoverEffect
                  className="p-6 flex flex-col justify-between border-white/[0.07] bg-slate-900/40 backdrop-blur-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>

                    <div className="space-y-2.5 text-xs text-slate-400">
                      <div>
                        <span className="font-semibold text-red-400/90 block mb-0.5">The Bottleneck:</span>
                        <p className="leading-relaxed text-slate-400">{item.problem}</p>
                      </div>
                      <div className="pt-2 border-t border-white/[0.04]">
                        <span className="font-semibold text-emerald-400/90 block mb-0.5">Our Solution:</span>
                        <p className="leading-relaxed text-slate-300">{item.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                    <span>Feature {item.id}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Code & Architecture Teaser */}
      <section className="py-20 border-t border-white/[0.06] bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                <Terminal className="w-3 h-3" />
                <span>Production Architecture Ready</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Not Just Ideas. Complete Engineering Blueprints.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Most students get an idea approved and then waste months attempting to assemble incompatible tutorials. ProjectMentor provides concrete API specs, relational schemas, and separated MVP boundaries before you write a single line of code.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Separates initial MVP features from post-graduation future work</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Includes normalized PostgreSQL schemas and API endpoint contracts</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero-cost deployment guides for Vercel, Cloud Run, and Supabase</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link to="/create-project" className="btn-primary text-sm px-5 py-2.5 rounded-xl inline-flex items-center gap-2">
                  <span>Generate Your Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl glass-panel border border-white/[0.1] p-5 shadow-2xl overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-slate-300 font-semibold">project-blueprint.json</span>
                  </div>
                  <span className="text-[10px] text-cyan-400">SCHEMA VERIFIED</span>
                </div>
                <div className="pt-4 text-slate-300 space-y-1 overflow-x-auto">
                  <p className="text-slate-500">// Example Blueprint synthesized for student profile</p>
                  <p><span className="text-blue-400">"project"</span>: <span className="text-amber-300">"VeriScan: Medical Report Triage Engine"</span>,</p>
                  <p><span className="text-blue-400">"architecture"</span>: <span className="text-emerald-300">"Asynchronous AI Inference Pipeline"</span>,</p>
                  <p><span className="text-blue-400">"stack"</span>: &#123;</p>
                  <p className="pl-4"><span className="text-cyan-400">"frontend"</span>: <span className="text-slate-200">"React 19 + TypeScript + Tailwind CSS"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-400">"backend"</span>: <span className="text-slate-200">"FastAPI with Background Worker Queue"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-400">"database"</span>: <span className="text-slate-200">"PostgreSQL 16 + Redis Caching"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-400">"aiEngine"</span>: <span className="text-slate-200">"Google Gemini 2.5 Flash (@google/genai)"</span></p>
                  <p>&#125;,</p>
                  <p><span className="text-blue-400">"mvpScope"</span>: [</p>
                  <p className="pl-4 text-slate-400">"1. Client-side PII redaction (Zero-Leakage)",</p>
                  <p className="pl-4 text-slate-400">"2. Structured blood report biomarker extraction",</p>
                  <p className="pl-4 text-slate-400">"3. Doctor review workspace with triage flags"</p>
                  <p>],</p>
                  <p><span className="text-blue-400">"deployment"</span>: <span className="text-amber-300">"Vercel (Edge) + Google Cloud Run (Docker)"</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Pre-Footer Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-blue-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.15)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl -z-10" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to Formulate Your Final-Year Project?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Take the 10-step wizard, discover vetted engineering ideas tailored to your exact skills, and start building with your AI mentor today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/create-project"
                className="btn-primary text-sm px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
              >
                <span>Launch Project Generator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-sm px-6 py-3 rounded-xl font-medium"
              >
                Sign In to Workspace
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};
