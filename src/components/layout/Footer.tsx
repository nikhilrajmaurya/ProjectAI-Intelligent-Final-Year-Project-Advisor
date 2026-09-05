import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, GitFork, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-slate-950 border-t border-white/[0.06] pt-12 pb-8 overflow-hidden">
      {/* Radiant blue glow divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-blue-500/10 blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Col 1: Product Branding */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AI Project Idea Generator & Mentor
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Empowering final-year engineering students to discover personalized project ideas, architect blueprints, navigate milestone roadmaps, and receive contextual AI mentorship from formulation to viva defense.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                <Shield className="w-3 h-3" />
                <span>Zero Hallucination Architecture</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                <span>Google Gemini 2.5 Flash</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-cyan-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/create-project" className="hover:text-cyan-400 transition-colors">
                  Project Generator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/mentor" className="hover:text-cyan-400 transition-colors">
                  AI Mentor
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Evaluation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase mb-3">
              Evaluation & Standards
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-300">Strict TypeScript</span> &bull; 100% Type-Safe
              </li>
              <li>
                <span className="text-slate-300">WCAG 2.1 AA</span> Accessibility
              </li>
              <li>
                <span className="text-slate-300">OWASP Top 10</span> Hardened API
              </li>
              <li>
                <span className="text-slate-300">Vitest</span> Automated CI Coverage
              </li>
              <li className="pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Centered Author Credit */}
        <div className="pt-8 flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 tracking-wide">
            <span>Designed and developed by</span>
            <span className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-default">
              Nikhil Raj Maurya
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <span>&copy; {new Date().getFullYear()} AI Project Idea Generator & Mentor. All rights reserved.</span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1">
              Built with <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" /> for final-year engineering students
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
