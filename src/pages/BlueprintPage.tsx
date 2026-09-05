import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Server,
  Database,
  Globe,
  Cpu,
  Shield,
  Cloud,
  CheckCircle2,
  Layers,
  ChevronLeft,
  Bot,
  Compass,
  Copy,
  Check,
  Download,
} from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';

export const BlueprintPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    activeProject,
    blueprint,
    generateProjectBlueprint,
    isGeneratingBlueprint,
    generatedIdeas,
    savedIdeas,
  } = useProjectStore();

  const [copied, setCopied] = useState(false);

  // Identify current project
  const project =
    activeProject?.id === id
      ? activeProject
      : generatedIdeas.find((p) => p.id === id) || savedIdeas.find((p) => p.id === id) || activeProject;

  useEffect(() => {
    if (project && (!blueprint || blueprint.projectId !== project.id)) {
      generateProjectBlueprint(project);
    }
  }, [project, blueprint, generateProjectBlueprint]);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto py-12 text-center">
          <h2 className="text-xl font-bold text-white mb-2">No Project Selected</h2>
          <p className="text-xs text-slate-400 mb-4">
            Select a project idea to view its full architectural blueprint.
          </p>
          <Link to="/ideas" className="btn-primary text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5">
            <ChevronLeft className="w-4 h-4" />
            <span>Select a Project</span>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleCopyJson = () => {
    if (blueprint) {
      navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadJson = () => {
    if (blueprint) {
      const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.id}-blueprint.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <Link
              to={`/project/${project.id}`}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 mb-1 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Project Specification</span>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Architectural Blueprint
              </h1>
              <Badge variant="blue">Production Grade</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              System architecture, component contracts, database schemas, and scoped feature boundaries for <span className="text-slate-200 font-semibold">{project.title}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="btn-secondary text-xs px-3 py-2 rounded-xl flex items-center gap-1.5"
              title="Copy raw JSON"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="btn-secondary text-xs px-3 py-2 rounded-xl flex items-center gap-1.5"
              title="Download Blueprint JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export</span>
            </button>
            <Link
              to="/mentor"
              className="btn-primary text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 font-semibold"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Review with Mentor</span>
            </Link>
          </div>
        </div>

        {isGeneratingBlueprint || !blueprint ? (
          <div className="py-20 text-center glass-card rounded-3xl border-white/[0.08]">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 animate-spin text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Synthesizing Architectural Blueprint...</h3>
            <p className="text-xs text-slate-400">
              Analyzing component topologies, normalized relational models, and API boundaries.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* High-Level Architecture Overview Card */}
            <GlassCard elevated className="p-6 sm:p-8 border-blue-500/30 bg-slate-900/60 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/[0.06]">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase block">
                    PATTERN: {blueprint.architecture.pattern}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">System Architecture Topology</h2>
                </div>
                <Badge variant="cyan">Zero-Trust & Stateless</Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {blueprint.architecture.diagramDescription}
              </p>

              {/* Sub-Components Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {blueprint.architecture.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.08] hover:border-blue-500/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">
                          LAYER 0{idx + 1}
                        </span>
                        <Layers className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{comp.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{comp.purpose}</p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.06] flex flex-wrap gap-1">
                      {comp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded bg-blue-500/10 text-cyan-300 text-[10px] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Core Tech Breakdown Grid: Frontend, Backend, Database */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend Card */}
              <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm pb-2 border-b border-white/[0.06]">
                  <Globe className="w-4 h-4" />
                  <span>Frontend Architecture</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">FRAMEWORK</span>
                    <span className="text-slate-200 font-medium">{blueprint.frontend.framework}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">STYLING</span>
                    <span className="text-slate-200 font-medium">{blueprint.frontend.styling}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">STATE STORE</span>
                    <span className="text-slate-200 font-medium">{blueprint.frontend.stateManagement}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">KEY LIBRARIES</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {blueprint.frontend.keyLibraries.map((lib) => (
                        <span key={lib} className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 font-mono text-[10px]">
                          {lib}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Backend Card */}
              <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm pb-2 border-b border-white/[0.06]">
                  <Server className="w-4 h-4" />
                  <span>Backend & API Runtime</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">RUNTIME & ENV</span>
                    <span className="text-slate-200 font-medium">{blueprint.backend.runtime}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">FRAMEWORK</span>
                    <span className="text-slate-200 font-medium">{blueprint.backend.framework}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">API PROTOCOL</span>
                    <span className="text-slate-200 font-medium">{blueprint.backend.apiType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">DESIGN PATTERN</span>
                    <span className="text-slate-200 font-medium">{blueprint.backend.architectureStyle}</span>
                  </div>
                </div>
              </GlassCard>

              {/* Database Card */}
              <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm pb-2 border-b border-white/[0.06]">
                  <Database className="w-4 h-4" />
                  <span>Database & Persistence</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">PRIMARY STORAGE</span>
                    <span className="text-slate-200 font-medium">{blueprint.database.primary}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">CACHE & BROKER</span>
                    <span className="text-slate-200 font-medium">{blueprint.database.caching}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">ORM / QUERY ENGINE</span>
                    <span className="text-slate-200 font-medium">{blueprint.database.orm}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">SCHEMA HIGHLIGHTS</span>
                    <p className="text-slate-300 leading-relaxed text-[11px] mt-0.5">
                      {blueprint.database.dataModelSummary}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* AI Components, Authentication & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Components */}
              <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Cpu className="w-4 h-4" />
                    <span>AI Component Pipeline</span>
                  </div>
                  <Badge variant="amber">{blueprint.aiComponents.model}</Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">ROLE IN SYSTEM</span>
                    <p className="text-slate-200 leading-relaxed">{blueprint.aiComponents.role}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">INFERENCE PIPELINE</span>
                    <p className="text-slate-300 leading-relaxed">{blueprint.aiComponents.pipelineDescription}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">PROMPT STRATEGY</span>
                    <p className="text-slate-300 leading-relaxed">{blueprint.aiComponents.promptStrategy}</p>
                  </div>
                </div>
              </GlassCard>

              {/* Authentication & Security */}
              <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Authentication & Security Hardening</span>
                  </div>
                  <Badge variant="cyan">{blueprint.authentication.provider}</Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">AUTH MECHANISM</span>
                    <span className="text-slate-200 font-medium">{blueprint.authentication.method}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px]">SECURITY SAFEGUARDS</span>
                    <ul className="space-y-1 mt-1 text-slate-300">
                      {blueprint.authentication.securityMeasures.map((sec, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* REST API Endpoints Specification */}
            <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>Key API Endpoint Contracts</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">REST / JSON OpenAPI 3.0</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-slate-400 font-mono text-[11px]">
                      <th className="pb-2 font-medium">METHOD</th>
                      <th className="pb-2 font-medium">ENDPOINT</th>
                      <th className="pb-2 font-medium">ACTION NAME</th>
                      <th className="pb-2 font-medium">PURPOSE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-slate-300">
                    {blueprint.apis.map((api, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 font-mono">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              api.method === 'GET'
                                ? 'bg-blue-500/20 text-blue-400'
                                : api.method === 'POST'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : api.method === 'DELETE'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {api.method}
                          </span>
                        </td>
                        <td className="py-2.5 font-mono text-cyan-300">{api.endpoint}</td>
                        <td className="py-2.5 font-medium text-white">{api.name}</td>
                        <td className="py-2.5 text-slate-400">{api.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* Cloud Deployment Architecture */}
            <GlassCard className="p-6 border-white/[0.08] bg-slate-900/40">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-4 pb-2 border-b border-white/[0.06]">
                <Cloud className="w-4 h-4" />
                <span>Zero-Cost Production Deployment Topology</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06]">
                  <span className="text-slate-500 font-mono block text-[10px]">FRONTEND HOSTING</span>
                  <span className="font-semibold text-white">{blueprint.deploymentArchitecture.hostingFrontend}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06]">
                  <span className="text-slate-500 font-mono block text-[10px]">BACKEND CONTAINER</span>
                  <span className="font-semibold text-white">{blueprint.deploymentArchitecture.hostingBackend}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06]">
                  <span className="text-slate-500 font-mono block text-[10px]">CI/CD AUTOMATION</span>
                  <span className="font-semibold text-white">{blueprint.deploymentArchitecture.ciCd}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06]">
                  <span className="text-slate-500 font-mono block text-[10px]">MONITORING & LOGS</span>
                  <span className="font-semibold text-white">{blueprint.deploymentArchitecture.monitoring}</span>
                </div>
              </div>
            </GlassCard>

            {/* CRITICAL DISTINCTION: MVP Features vs Future Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* MVP Features */}
              <GlassCard className="p-6 sm:p-7 border-emerald-500/30 bg-emerald-950/10">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="text-base font-bold text-white">MVP Features (Core Demonstration)</h3>
                      <p className="text-[11px] text-emerald-300">Mandatory for semester viva evaluation</p>
                    </div>
                  </div>
                  <Badge variant="green">SEMESTER SCOPE</Badge>
                </div>

                <div className="space-y-3">
                  {blueprint.mvpFeatures.map((feat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                        <div className="flex items-center gap-1.5">
                          {feat.priority && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                              {feat.priority}
                            </span>
                          )}
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.05] text-slate-400">
                            {feat.complexity} Complexity
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Future Features */}
              <GlassCard className="p-6 sm:p-7 border-purple-500/30 bg-purple-950/10">
                <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <div>
                      <h3 className="text-base font-bold text-white">Future Features (Post-Graduation)</h3>
                      <p className="text-[11px] text-purple-300">Discuss during viva as future research directions</p>
                    </div>
                  </div>
                  <Badge variant="purple">FUTURE EXPANSION</Badge>
                </div>

                <div className="space-y-3">
                  {blueprint.futureFeatures.map((feat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                        <div className="flex items-center gap-1.5">
                          {feat.impact && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                              {feat.impact} Impact
                            </span>
                          )}
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.05] text-slate-400">
                            {feat.complexity} Complexity
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Footer Navigation CTAs */}
            <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Architecture Approved?</h4>
                <p className="text-xs text-slate-400">
                  Proceed to your milestone roadmap or consult your AI mentor regarding implementation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/mentor"
                  className="btn-secondary text-xs px-4 py-2.5 rounded-xl flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Ask AI Mentor</span>
                </Link>
                <Link
                  to="/roadmap"
                  className="btn-primary text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2"
                >
                  <span>Open Roadmap</span>
                  <Compass className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
