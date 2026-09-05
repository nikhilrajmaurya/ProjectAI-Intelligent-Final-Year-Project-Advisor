import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  User,
  Sliders,
  Sparkles,
  CheckSquare,
  Layers,
  Compass,
  Bot,
  GraduationCap,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/common/GlassCard';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      number: 'STEP 01',
      title: 'Tell Us About Yourself',
      description: 'Input your current technical skills, programming languages you are confident in, and your experience level (Beginner, Intermediate, or Advanced).',
      detail: 'Avoids proposing complex C++ embedded kernels to teams specializing in modern TypeScript, ensuring you hit the ground running without wasted learning curves.',
      icon: User,
      color: 'text-blue-400',
    },
    {
      number: 'STEP 02',
      title: 'Define Your Interests and Constraints',
      description: 'Specify your target domain (AI/ML, Web3, Cybersecurity, IoT, etc.), team size, total available semester weeks, budget, and academic constraints.',
      detail: 'Accounts for whether you have access to physical microcontrollers, cloud GPU credits, or require a strictly free-tier software-only project.',
      icon: Sliders,
      color: 'text-cyan-400',
    },
    {
      number: 'STEP 03',
      title: 'Generate Personalized Project Ideas',
      description: 'Our system runs your profile through schema-validated AI generation, returning 3 to 5 realistic, high-impact final year project proposals.',
      detail: 'Every proposal includes a clear problem statement, why it matches your background, estimated duration, difficulty rating, and key risks.',
      icon: Sparkles,
      color: 'text-amber-400',
    },
    {
      number: 'STEP 04',
      title: 'Select Your Project',
      description: 'Compare candidate ideas, examine their technical feasibility, and select the project your team wants to build and defend.',
      detail: 'You can regenerate individual project ideas with a single click if you want a different variation without losing the rest of your options.',
      icon: CheckSquare,
      color: 'text-emerald-400',
    },
    {
      number: 'STEP 05',
      title: 'Generate the Project Blueprint',
      description: 'Synthesize a comprehensive architectural blueprint: frontend, backend, database schema, APIs, AI components, and authentication.',
      detail: 'Crucially separates core MVP features (required for initial university review) from advanced future features (to discuss during your viva defense).',
      icon: Layers,
      color: 'text-indigo-400',
    },
    {
      number: 'STEP 06',
      title: 'Follow the Development Roadmap',
      description: 'Receive a personalized development timeline mapped to your exact available weeks with interactive task checklists.',
      detail: 'From literature survey (Week 1) to final defense slide rehearsals (Week 8), every phase has clear objectives, dependencies, and hour estimates.',
      icon: Compass,
      color: 'text-teal-400',
    },
    {
      number: 'STEP 07',
      title: 'Ask the AI Mentor for Help',
      description: 'Access a dedicated project mentor workspace that maintains complete context of your project architecture and active milestone.',
      detail: 'Ask "What should I build first?", "Which database should I use?", "How do I fix this error?", or "How should I deploy it?" with instant actionable answers.',
      icon: Bot,
      color: 'text-rose-400',
    },
    {
      number: 'STEP 08',
      title: 'Improve and Prepare for Submission',
      description: 'Refine your project with performance optimizations, security hardening, IEEE report outlines, and viva defense question simulations.',
      detail: 'Stand out from other student projects by demonstrating verified unit test coverage, automated GitHub Actions CI, and zero-downtime deployment.',
      icon: GraduationCap,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative py-16 md:py-20 border-b border-white/[0.06] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] radial-glow-hero pointer-events-none -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase mb-2 block">
              Step-by-Step Student Journey
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              How ProjectMentor Works
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              From an initial vague idea to a fully defended, high-scoring capstone project. Follow the 8-stage methodology designed specifically for final-year engineering evaluations.
            </p>
          </div>
        </section>

        {/* 8-Step Interactive Journey Timeline */}
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 relative">
            {/* Subtle connecting vertical line on desktop */}
            <div className="hidden md:block absolute top-6 bottom-6 left-[2.85rem] w-[2px] bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-purple-500/50 -z-10" />

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative flex flex-col md:flex-row items-start gap-6 group">
                  {/* Step Badge / Icon Node */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/[0.1] flex items-center justify-center shrink-0 shadow-lg group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>

                  {/* Card Content */}
                  <GlassCard
                    hoverEffect
                    className="flex-1 p-6 sm:p-7 border-white/[0.08] bg-slate-900/50 backdrop-blur-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                      <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                        {step.number}
                      </span>
                      <span className="text-xs text-slate-500">Continuous Assessment Stage</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mt-3 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-200">Why this matters to examiners: </strong>
                      {step.detail}
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>

          {/* Action Footer Callout */}
          <div className="mt-16 text-center">
            <Link
              to="/create-project"
              className="btn-primary text-sm px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <span>Begin Step 01 Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-slate-400 mt-3">
              Takes less than 3 minutes &bull; Instant idea synthesis
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
