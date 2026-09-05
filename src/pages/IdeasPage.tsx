import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  Clock,
  Zap,
  Info,
  PlusCircle,
} from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { ProjectIdea } from '../types/project';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';

export const IdeasPage: React.FC = () => {
  const {
    generatedIdeas,
    activeProject,
    setActiveProject,
    saveIdea,
    removeSavedIdea,
    isSaved,
    regenerateIdea,
    ideasSource,
  } = useProjectStore();

  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [selectedModalIdea, setSelectedModalIdea] = useState<ProjectIdea | null>(null);
  const navigate = useNavigate();

  const handleSelectProject = (idea: ProjectIdea) => {
    setActiveProject(idea);
    navigate(`/project/${idea.id}`);
  };

  const handleRegenerateSingle = async (index: number) => {
    setRegeneratingIndex(index);
    try {
      await regenerateIdea(index);
    } finally {
      setRegeneratingIndex(null);
    }
  };

  if (!generatedIdeas || generatedIdeas.length === 0) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <div className="w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Generated Ideas Yet</h2>
          <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
            Answer a few quick questions about your skills, team size, and timeline to synthesize 3–5 high-caliber capstone project proposals.
          </p>
          <Link
            to="/create-project"
            className="btn-primary text-sm px-6 py-3 rounded-xl inline-flex items-center gap-2 font-semibold"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch 10-Step Generator</span>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SYNTHESIZED CAPSTONE CANDIDATES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personalized Project Ideas
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Carefully calibrated to your skills and timeline. Select a project to generate its architectural blueprint and roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{ideasSource === 'gemini-live' ? 'Live Google Gemini Flash' : 'Engineered Intelligence'}</span>
            </span>

            <Link
              to="/create-project"
              className="btn-secondary text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Adjust Inputs</span>
            </Link>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {generatedIdeas.map((idea, index) => {
            const isCurrentActive = activeProject?.id === idea.id;
            const isBookmarked = isSaved(idea.id);
            const isRegenerating = regeneratingIndex === index;

            return (
              <GlassCard
                key={idea.id}
                elevated
                className={`p-6 sm:p-7 border-white/[0.08] bg-slate-900/50 flex flex-col justify-between relative overflow-hidden transition-all ${
                  isCurrentActive ? 'ring-2 ring-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.2)]' : ''
                }`}
              >
                {/* Active Indicator Badge */}
                {isCurrentActive && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white font-mono text-[10px] px-3 py-0.5 rounded-bl-xl font-bold tracking-wider">
                    CURRENT SELECTION
                  </div>
                )}

                <div className="space-y-4">
                  {/* Metadata Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant={
                          idea.difficulty === 'Beginner-Friendly'
                            ? 'green'
                            : idea.difficulty === 'Advanced'
                            ? 'rose'
                            : 'blue'
                        }
                      >
                        {idea.difficulty}
                      </Badge>
                      <Badge variant="cyan">
                        <Clock className="w-3 h-3 mr-1" />
                        {idea.estimatedDurationWeeks} Weeks
                      </Badge>
                      <span className="text-[11px] font-mono text-slate-400">{idea.domain}</span>
                    </div>

                    <button
                      onClick={() => (isBookmarked ? removeSavedIdea(idea.id) : saveIdea(idea))}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
                      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark idea'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5 text-amber-400" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight hover:text-blue-200 transition-colors">
                    {idea.title}
                  </h3>

                  {/* Problem Statement */}
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-red-400 uppercase tracking-wider block mb-1">
                      Problem Addressed
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {idea.problemStatement}
                    </p>
                  </div>

                  {/* Why it matches student */}
                  <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300">
                    <span className="font-semibold text-cyan-300 block mb-0.5">
                      Why this fits your profile:
                    </span>
                    <p className="text-[11px] leading-relaxed text-slate-400">{idea.whyItMatches}</p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Required Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {idea.requiredTechnologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Innovation & Risks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Innovation Potential</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {idea.innovationPotential}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-1.5 text-rose-400 font-semibold mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Main Risk</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {idea.mainRisks[0] || 'Third-party API rate limits'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedModalIdea(idea)}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => handleRegenerateSingle(index)}
                      disabled={isRegenerating}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      title="Replace only this idea with a new variation"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-cyan-400' : ''}`}
                      />
                      <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
                    </button>
                  </div>

                  <Button
                    variant={isCurrentActive ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleSelectProject(idea)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    <span>{isCurrentActive ? 'Selected' : 'Select Project'}</span>
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Idea Quick Detail Modal */}
      {selectedModalIdea && (
        <Modal
          isOpen={Boolean(selectedModalIdea)}
          onClose={() => setSelectedModalIdea(null)}
          title={selectedModalIdea.title}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h4 className="font-semibold text-white mb-1">Executive Summary</h4>
              <p className="text-slate-300 leading-relaxed">{selectedModalIdea.shortDescription}</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-1">Formal Problem Statement</h4>
              <p className="text-slate-300 leading-relaxed">{selectedModalIdea.problemStatement}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.06]">
                <span className="font-mono text-cyan-400 text-xs uppercase block mb-1">Target Users</span>
                <p className="text-slate-200">{selectedModalIdea.targetUsers}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.06]">
                <span className="font-mono text-cyan-400 text-xs uppercase block mb-1">Expected Deliverable</span>
                <p className="text-slate-200">{selectedModalIdea.expectedOutcome}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-1">Initial MVP Features</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {selectedModalIdea.mvpFeatures.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex justify-end gap-3">
              <button
                onClick={() => setSelectedModalIdea(null)}
                className="btn-secondary text-xs px-4 py-2 rounded-xl"
              >
                Close
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleSelectProject(selectedModalIdea);
                  setSelectedModalIdea(null);
                }}
              >
                Select This Project & Continue
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};
