import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Compass,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Bot,
} from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { generateRoadmapForProject } from '../services/domainKnowledge';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';

export const RoadmapPage: React.FC = () => {
  const { activeProject, roadmap, setRoadmap, toggleTaskCompletion } = useProjectStore();

  const [selectedDuration, setSelectedDuration] = useState<number>(
    roadmap?.totalWeeks || activeProject?.estimatedDurationWeeks || 8
  );

  // If activeProject is present but roadmap duration needs regeneration
  const handleDurationChange = (weeks: number) => {
    setSelectedDuration(weeks);
    if (activeProject) {
      const newRoadmap = generateRoadmapForProject(activeProject, weeks);
      setRoadmap(newRoadmap);
    }
  };

  const handleTaskToggle = (milestoneId: string, taskId: string, currentlyCompleted: boolean) => {
    toggleTaskCompletion(milestoneId, taskId);

    // If task is becoming completed, trigger tiny celebration confetti
    if (!currentlyCompleted) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2563eb', '#06b6d4', '#10b981'],
      });
    }
  };

  if (!activeProject && !roadmap) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto py-12 text-center">
          <h2 className="text-xl font-bold text-white mb-2">No Active Project</h2>
          <p className="text-xs text-slate-400 mb-4">
            Select or generate a project first to synthesize your custom milestone roadmap.
          </p>
          <Link to="/ideas" className="btn-primary text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5">
            <ChevronLeft className="w-4 h-4" />
            <span>Select a Project</span>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate statistics
  const milestones = roadmap?.milestones || [];
  const allTasks = milestones.flatMap((m) => m.tasks);
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const progressPercent = allTasks.length > 0 ? (completedTasks / allTasks.length) * 100 : 0;
  const totalHours = allTasks.reduce((acc, t) => acc + t.estimatedHours, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>DYNAMIC DEVELOPMENT ROADMAP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Milestone Schedule & Deliverables
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {activeProject ? (
                <>
                  Paced development schedule for <span className="text-slate-200 font-semibold">{activeProject.title}</span>.
                </>
              ) : (
                'Standard capstone engineering milestones.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/mentor"
              className="btn-secondary text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Ask Mentor About Tasks</span>
            </Link>
          </div>
        </div>

        {/* Progress & Duration Customizer Card */}
        <GlassCard elevated className="p-6 sm:p-7 border-blue-500/30 bg-slate-900/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/[0.06]">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Roadmap Completion Status
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  {Math.round(progressPercent)}%
                </span>
                <span className="text-xs text-slate-400">
                  ({completedTasks} of {allTasks.length} tasks completed &bull; ~{totalHours} total dev hours)
                </span>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="flex flex-col sm:items-end">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Adapt Total Duration
              </span>
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-white/[0.08]">
                {[4, 8, 12, 16].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => handleDurationChange(w)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      selectedDuration === w
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {w} Weeks
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ProgressBar progress={progressPercent} showPercent={false} />
        </GlassCard>

        {/* Milestone Cards Timeline */}
        <div className="space-y-6">
          {milestones.map((milestone) => {
            const milestoneTasks = milestone.tasks;
            const completedCount = milestoneTasks.filter((t) => t.completed).length;
            const isMilestoneDone = completedCount === milestoneTasks.length;
            const milestoneHours = milestoneTasks.reduce((acc, t) => acc + t.estimatedHours, 0);

            return (
              <GlassCard
                key={milestone.id}
                className={`p-6 border-white/[0.08] transition-all ${
                  isMilestoneDone
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'bg-slate-900/40'
                }`}
              >
                {/* Milestone Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        isMilestoneDone
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-blue-500/10 text-cyan-400 border border-blue-500/20'
                      }`}
                    >
                      {milestone.weekNumber}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {milestone.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={isMilestoneDone ? 'green' : 'blue'}>
                      {isMilestoneDone ? 'Completed' : `${completedCount}/${milestoneTasks.length} Tasks`}
                    </Badge>
                    <Badge variant="slate">
                      <Clock className="w-3 h-3 mr-1" />
                      {milestoneHours} hrs
                    </Badge>
                  </div>
                </div>

                {/* Objective */}
                <div className="py-3">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    Week Objective
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {milestone.objective}
                  </p>
                </div>

                {/* Dependencies */}
                {milestone.dependencies && milestone.dependencies.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 pb-3">
                    <span className="font-mono text-[10px] uppercase">Prerequisites:</span>
                    <div className="flex gap-1.5">
                      {milestone.dependencies.map((dep, i) => (
                        <span key={i} className="px-2 py-0.2 rounded bg-white/[0.04] text-[10px] text-slate-400 font-mono">
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tasks Checklist */}
                <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                  {milestone.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskToggle(milestone.id, task.id, task.completed)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        task.completed
                          ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-400'
                          : 'bg-slate-950/60 border-white/[0.06] hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                          task.completed
                            ? 'bg-emerald-500 border-emerald-500 text-black'
                            : 'border-slate-600 bg-slate-900 hover:border-blue-400'
                        }`}
                        aria-label={`Mark task ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
                      >
                        {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-semibold ${
                              task.completed ? 'line-through text-slate-500' : 'text-slate-100'
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">
                            ~{task.estimatedHours} hrs
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};
