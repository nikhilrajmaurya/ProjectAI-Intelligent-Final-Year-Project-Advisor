import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Trash2,
  PlusCircle,
  Clock,
} from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { ProjectIdea } from '../types/project';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const SavedIdeasPage: React.FC = () => {
  const { savedIdeas, removeSavedIdea, setActiveProject, activeProject } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'duration' | 'difficulty'>('date');
  const navigate = useNavigate();

  const filteredIdeas = savedIdeas
    .filter((idea) => {
      const matchSearch =
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.problemStatement.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDifficulty = difficultyFilter === 'All' || idea.difficulty === difficultyFilter;
      return matchSearch && matchDifficulty;
    })
    .sort((a, b) => {
      if (sortBy === 'duration') {
        return a.estimatedDurationWeeks - b.estimatedDurationWeeks;
      }
      if (sortBy === 'difficulty') {
        return a.difficulty.localeCompare(b.difficulty);
      }
      return 0; // default order
    });

  const handleOpenProject = (idea: ProjectIdea) => {
    setActiveProject(idea);
    navigate(`/project/${idea.id}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-1">
              <Bookmark className="w-3.5 h-3.5" />
              <span>SAVED PROJECT VAULT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Saved Ideas
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Bookmark and compare candidate project ideas before making your final topic submission.
            </p>
          </div>

          <Link
            to="/create-project"
            className="btn-primary text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Generate More Ideas</span>
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-2xl glass-panel border-white/[0.08] flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search saved ideas by title, domain, or problem..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-slate-900 border border-white/[0.08] text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer w-full sm:w-auto"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner-Friendly">Beginner-Friendly</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'duration' | 'difficulty')}
              className="bg-slate-900 border border-white/[0.08] text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer w-full sm:w-auto"
            >
              <option value="date">Date Saved</option>
              <option value="duration">Duration (Weeks)</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>
        </div>

        {/* Ideas Grid */}
        {filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredIdeas.map((idea) => {
              const isCurrent = activeProject?.id === idea.id;
              return (
                <GlassCard
                  key={idea.id}
                  hoverEffect
                  className={`p-6 border-white/[0.08] bg-slate-900/50 flex flex-col justify-between ${
                    isCurrent ? 'ring-1 ring-blue-500' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="blue">{idea.difficulty}</Badge>
                        <Badge variant="cyan">
                          <Clock className="w-3 h-3 mr-1" />
                          {idea.estimatedDurationWeeks}w
                        </Badge>
                      </div>

                      <button
                        onClick={() => removeSavedIdea(idea.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Remove from saved"
                        aria-label="Remove saved idea"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">{idea.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {idea.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {idea.requiredTechnologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      Saved {idea.savedAt || 'Recently'}
                    </span>

                    <Button
                      variant={isCurrent ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => handleOpenProject(idea)}
                      rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      <span>{isCurrent ? 'Active Project' : 'Open Project'}</span>
                    </Button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center glass-card rounded-3xl border-white/[0.06]">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3 text-amber-400">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No Saved Projects Match</h3>
            <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
              {savedIdeas.length === 0
                ? 'You haven’t bookmarked any ideas yet. Explore synthesized proposals and save your favorites.'
                : 'Try clearing your search or difficulty filter.'}
            </p>
            <Link
              to="/create-project"
              className="btn-primary text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Generate Ideas</span>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
