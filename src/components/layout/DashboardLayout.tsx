import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Bookmark,
  FileCode2,
  Bot,
  Compass,
  Settings,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
  LogOut,
  FolderKanban,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { useProjectStore } from '../../store/projectStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const { activeProject } = useProjectStore();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Project', path: '/create-project', icon: PlusCircle },
    { name: 'My Ideas', path: '/ideas/saved', icon: Bookmark },
    {
      name: 'Project Blueprint',
      path: activeProject ? `/project/${activeProject.id}/blueprint` : '/dashboard',
      icon: FileCode2,
      disabled: !activeProject,
      badge: activeProject ? undefined : 'Select Idea',
    },
    { name: 'AI Mentor', path: '/mentor', icon: Bot },
    { name: 'Roadmap', path: '/roadmap', icon: Compass },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-slate-950/90 backdrop-blur-md sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-bold text-sm text-white">MentorAI</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-slate-400 hover:text-white cursor-pointer rounded-lg"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:text-white"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Backdrop for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-64 bg-slate-950 border-r border-white/[0.06] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-white">MentorAI</span>
                <span className="text-[10px] text-cyan-400 font-mono">WORKSPACE</span>
              </div>
            </Link>
          </div>

          {/* Active Project Banner if any */}
          {activeProject && (
            <div className="mx-3 my-3 p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs">
              <div className="flex items-center justify-between text-[11px] text-blue-300 font-medium mb-1">
                <span className="flex items-center gap-1">
                  <FolderKanban className="w-3 h-3 text-cyan-400" />
                  Active Project
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-mono">
                  {activeProject.difficulty}
                </span>
              </div>
              <p className="font-semibold text-slate-200 truncate">{activeProject.title}</p>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              if (item.disabled) {
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 cursor-not-allowed opacity-60"
                    title="Select a project first to unlock blueprint"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-blue-600/15 text-white border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.15)] font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        active ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom user profile & actions */}
          <div className="p-4 border-t border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400 shrink-0">
                  {user?.name ? user.name.charAt(0) : 'S'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-medium text-slate-200 truncate">
                    {user?.name || 'Guest Student'}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {user?.email || 'demo@student.edu'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-600 hover:-rotate-12 transition-transform" />
                )}
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col bg-slate-950/60 overflow-y-auto">
        <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};
