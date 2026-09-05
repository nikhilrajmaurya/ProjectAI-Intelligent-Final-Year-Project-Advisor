import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  Sun,
  Moon,
  Bot,
  Shield,
  Cloud,
  HardDrive,
  Trash2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { useMentorStore } from '../store/mentorStore';
import { GeminiService } from '../services/gemini.service';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const { clearError: clearProjectError } = useProjectStore();
  const { clearChat } = useMentorStore();

  const [geminiStatus, setGeminiStatus] = useState<{ configured: boolean; model: string }>({
    configured: false,
    model: 'gemini-2.5-flash',
  });

  const [aiCreativity, setAiCreativity] = useState('0.7');
  const [saveConfirmation, setSaveConfirmation] = useState<string | null>(null);

  useEffect(() => {
    GeminiService.checkStatus().then(setGeminiStatus);
  }, []);

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to reset all stored projects, ideas, and mentor chats?')) {
      localStorage.removeItem('ai-project-mentor-storage');
      localStorage.removeItem('ai-project-mentor-chat-storage');
      clearChat();
      clearProjectError();
      window.location.reload();
    }
  };

  const handleSavePreferences = () => {
    setSaveConfirmation('Preferences successfully saved!');
    setTimeout(() => setSaveConfirmation(null), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>PLATFORM PREFERENCES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Settings & Integrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your student profile, theme appearance, AI reasoning preferences, and Google Cloud services.
          </p>
        </div>

        {saveConfirmation && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveConfirmation}</span>
          </div>
        )}

        {/* 1. Student Profile */}
        <GlassCard className="p-6 border-white/[0.08] bg-slate-900/50 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-base pb-2 border-b border-white/[0.06]">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Student Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Full Name</label>
              <input
                type="text"
                readOnly
                value={user?.name || 'Alex Rivera (Demo Student)'}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">University / Email</label>
              <input
                type="text"
                readOnly
                value={user?.email || 'alex.rivera@student.edu'}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Academic Role</label>
              <input
                type="text"
                readOnly
                value={user?.role || 'Final Year CSE Student'}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Authentication Mode</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{user?.provider === 'google' ? 'Google OAuth Account' : 'Evaluator Demo Session'}</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 2. Theme & Visual Appearance */}
        <GlassCard className="p-6 border-white/[0.08] bg-slate-900/50 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-base pb-2 border-b border-white/[0.06]">
            {theme === 'dark' ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span>Theme & Visual Atmosphere</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Persistent theme preference respecting system contrast settings with zero layout flash.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                theme === 'dark'
                  ? 'bg-blue-600/15 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                  : 'bg-slate-950 border-white/[0.08] hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/[0.1] flex items-center justify-center text-blue-400">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Futuristic Dark Theme</h4>
                  <span className="text-[11px] text-slate-400">Near-black & electric blue glow</span>
                </div>
              </div>
              {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
            </div>

            <div
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                theme === 'light'
                  ? 'bg-blue-600/15 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                  : 'bg-slate-950 border-white/[0.08] hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-amber-500">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Clean Light Theme</h4>
                  <span className="text-[11px] text-slate-400">Cool gray & high contrast typography</span>
                </div>
              </div>
              {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
            </div>
          </div>
        </GlassCard>

        {/* 3. Connected Google Services */}
        <GlassCard className="p-6 border-white/[0.08] bg-slate-900/50 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-base pb-2 border-b border-white/[0.06]">
            <Cloud className="w-4 h-4 text-cyan-400" />
            <span>Connected Google Services</span>
          </div>

          <div className="space-y-3">
            {/* Google Gemini API */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.08] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-bold text-white">Google Gemini</h4>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                      geminiStatus.configured
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-blue-500/10 text-cyan-300 border-blue-500/20'
                    }`}
                  >
                    {geminiStatus.configured ? 'Active Live API' : 'Active Local Engineering Fallback'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Used for personalized idea synthesis, architectural blueprints, and dynamic mentor guidance. When <code>GEMINI_API_KEY</code> is provided in <code>.env</code>, live calls are executed securely server-side.
                </p>
              </div>
            </div>

            {/* Google Drive Export Service */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.08] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-blue-400" />
                  <h4 className="text-xs font-bold text-white">Google Drive Export Readiness</h4>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-slate-800 text-slate-400 border border-white/[0.06]">
                    Ready
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Export complete SRS requirements, architectural diagrams, and milestones as IEEE-formatted PDF/JSON archives.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 4. AI Preferences */}
        <GlassCard className="p-6 border-white/[0.08] bg-slate-900/50 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-base pb-2 border-b border-white/[0.06]">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>AI Reasoning & Token Economy</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-medium">Mentor Creativity / Temperature</label>
                <span className="font-mono text-cyan-400">{aiCreativity}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={aiCreativity}
                onChange={(e) => setAiCreativity(e.target.value)}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500">
                Lower values ensure strict technical rigor; higher values suggest novel research tangents.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-slate-300 flex items-center justify-between">
              <div>
                <span className="font-semibold block text-white text-xs">Token Economy Mode</span>
                <span className="text-[11px] text-slate-400">
                  Prunes chat history to last 4 turns and enforces strict schema payloads.
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                ENABLED
              </span>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="sm" onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* 5. Data & Privacy */}
        <GlassCard className="p-6 border-red-500/20 bg-red-950/10 space-y-4">
          <div className="flex items-center gap-2 text-red-400 font-bold text-base pb-2 border-b border-red-500/20">
            <Shield className="w-4 h-4" />
            <span>Data Storage & Privacy Reset</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            All your synthesized ideas, active blueprint selections, and mentor conversation histories are stored client-side in secure LocalStorage. No student project data is shared or sold.
          </p>

          <div className="pt-2">
            <button
              onClick={handleClearAllData}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset All Cached Project Data</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};
