import React from 'react';
import { User, Cpu, Lightbulb, FileSpreadsheet, Bot, ArrowRight } from 'lucide-react';

export const WorkflowVisual: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Student Profile',
      desc: 'Skills, interests, team & time',
      icon: User,
      glow: 'from-blue-500/20 to-blue-600/10',
      iconColor: 'text-blue-400',
    },
    {
      step: '02',
      title: 'AI Analysis',
      desc: 'Feasibility & academic rigor check',
      icon: Cpu,
      glow: 'from-cyan-500/20 to-blue-500/10',
      iconColor: 'text-cyan-400',
    },
    {
      step: '03',
      title: 'Project Ideas',
      desc: 'Tailored 3-5 high-impact topics',
      icon: Lightbulb,
      glow: 'from-amber-500/20 to-yellow-500/10',
      iconColor: 'text-amber-400',
    },
    {
      step: '04',
      title: 'Project Blueprint',
      desc: 'Full-stack & database architecture',
      icon: FileSpreadsheet,
      glow: 'from-indigo-500/20 to-purple-500/10',
      iconColor: 'text-indigo-400',
    },
    {
      step: '05',
      title: 'AI Mentor',
      desc: 'Interactive guidance & viva prep',
      icon: Bot,
      glow: 'from-emerald-500/20 to-teal-500/10',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Background ambient glow behind workflow cards */}
      <div className="absolute inset-0 bg-blue-600/10 blur-3xl -z-10 rounded-full" />

      {/* Grid of connected cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="relative group">
              <div className="h-full p-4 rounded-2xl glass-card border border-white/[0.08] hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_8px_25px_rgba(37,99,235,0.18)]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.glow} border border-white/[0.08] flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}
                    >
                      <Icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold tracking-wider">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-medium">Verified Stage</span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-400 lg:hidden" />
                  )}
                </div>
              </div>

              {/* Glowing animated connection line on desktop */}
              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-2 w-4 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 -translate-y-1/2 z-10 animate-pulse-flow shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
