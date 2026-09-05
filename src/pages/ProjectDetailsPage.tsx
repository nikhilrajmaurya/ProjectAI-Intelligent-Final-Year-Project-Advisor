import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  FileCode2,
  Bot,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Target,
  Users,
  Award,
  ChevronLeft,
  Zap,
} from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    activeProject,
    generatedIdeas,
    savedIdeas,
    setActiveProject,
    generateProjectBlueprint,
    isGeneratingBlueprint,
  } = useProjectStore();

  // Find project by ID
  const project =
    activeProject?.id === id
      ? activeProject
      : generatedIdeas.find((p) => p.id === id) || savedIdeas.find((p) => p.id === id);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto py-12 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Project Not Found</h2>
          <p className="text-xs text-slate-400 mb-4">
            The requested project specification could not be located in your active session.
          </p>
          <Link to="/ideas" className="btn-primary text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Ideas</span>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleGenerateBlueprint = async () => {
    setActiveProject(project);
    await generateProjectBlueprint(project);
    navigate(`/project/${project.id}/blueprint`);
  };

  const handleAskMentor = () => {
    setActiveProject(project);
    navigate('/mentor');
  };

  const handleStartRoadmap = () => {
    setActiveProject(project);
    navigate('/roadmap');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/ideas"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Idea Candidates</span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="blue">{project.difficulty}</Badge>
            <Badge variant="cyan">{project.estimatedDurationWeeks} Weeks</Badge>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-blue-500/30 bg-slate-900/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-3xl pointer-events-none" />

          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase block mb-1">
            {project.domain}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              isLoading={isGeneratingBlueprint}
              onClick={handleGenerateBlueprint}
              leftIcon={<FileCode2 className="w-4 h-4" />}
            >
              <span>Generate Blueprint</span>
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={handleAskMentor}
              leftIcon={<Bot className="w-4 h-4 text-cyan-400" />}
            >
              <span>Ask Mentor</span>
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={handleStartRoadmap}
              leftIcon={<Compass className="w-4 h-4 text-blue-400" />}
            >
              <span>Start Roadmap</span>
            </Button>
          </div>
        </div>

        {/* Core Project Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem Statement */}
          <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </GlassCard>

          {/* Solution & Novelty */}
          <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-3">
              <Zap className="w-4 h-4" />
              <span>Proposed Solution & Novelty</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.whyItMatches}
            </p>
          </GlassCard>

          {/* Target Users */}
          <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-3">
              <Users className="w-4 h-4" />
              <span>Target Stakeholders & Users</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.targetUsers}
            </p>
          </GlassCard>

          {/* Expected Outcome */}
          <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
              <Award className="w-4 h-4" />
              <span>Final Expected Outcome</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.expectedOutcome}
            </p>
          </GlassCard>
        </div>

        {/* Project Objectives */}
        <GlassCard className="p-6 sm:p-7 border-white/[0.08] bg-slate-900/40">
          <div className="flex items-center gap-2 text-white font-bold text-base mb-4">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Formal Project Objectives</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.objectives.map((obj, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Core Features vs Advanced Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Features (MVP) */}
          <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Core MVP Features</span>
              </h3>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                REQUIRED FOR VIVA
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {project.mvpFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-emerald-400 shrink-0 font-bold">&bull;</span>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Advanced Features */}
          <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Advanced & Future Features</span>
              </h3>
              <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20">
                EXTENSIONS
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {project.futureFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-purple-400 shrink-0 font-bold">&bull;</span>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Technologies & Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-4">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.requiredTechnologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.08] text-xs font-mono text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
              <FileCode2 className="w-4 h-4 text-blue-400" />
              <span>Architecture Summary</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.architectureSummary}
            </p>
          </GlassCard>
        </div>

        {/* Main Risks */}
        <GlassCard className="p-6 border-red-500/20 bg-red-950/10">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Identified Technical Risks & Mitigation Contingencies</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {project.mainRisks.map((risk, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-red-500/20 text-slate-300">
                <span className="text-red-400 font-semibold block mb-0.5">Risk #{i + 1}</span>
                <p className="leading-relaxed text-slate-400">{risk}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};
