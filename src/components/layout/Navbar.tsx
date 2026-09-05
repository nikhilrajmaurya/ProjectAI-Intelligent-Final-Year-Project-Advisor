import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Sun, Moon, ArrowRight, UserCheck } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-1 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between nav-floating rounded-full px-4 sm:px-6 py-2 pointer-events-auto transition-all">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-blue-500 rounded-full p-1"
          aria-label="AI Project Idea Generator & Mentor Home"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="w-full h-full bg-[#03060c] rounded-full flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className="text-sm font-semibold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
            ProjectMentor<span className="text-cyan-400 font-light">.ai</span>
          </span>
        </Link>

        {/* Center: Nav links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-300" aria-label="Main Navigation">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-full transition-all ${
              isCurrent('/') && location.pathname === '/'
                ? 'text-white bg-white/[0.1] shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-white/[0.1]'
                : 'hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/create-project"
            className={`px-3 py-1.5 rounded-full transition-all ${
              isCurrent('/create-project')
                ? 'text-white bg-white/[0.1] shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-white/[0.1]'
                : 'hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Generate
          </Link>
          <Link
            to="/mentor"
            className={`px-3 py-1.5 rounded-full transition-all ${
              isCurrent('/mentor')
                ? 'text-white bg-white/[0.1] shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-white/[0.1]'
                : 'hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Mentor
          </Link>
          <Link
            to="/roadmap"
            className={`px-3 py-1.5 rounded-full transition-all ${
              isCurrent('/roadmap')
                ? 'text-white bg-white/[0.1] shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-white/[0.1]'
                : 'hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Roadmap
          </Link>
          <Link
            to="/how-it-works"
            className={`px-3 py-1.5 rounded-full transition-all ${
              isCurrent('/how-it-works')
                ? 'text-white bg-white/[0.1] shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-white/[0.1]'
                : 'hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Resources
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-full transition-all ${
              isCurrent('/dashboard')
                ? 'text-white bg-white/[0.1] shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-white/[0.1]'
                : 'hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Progress
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors border border-transparent hover:border-white/[0.1] cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-blue-600" />
            )}
          </button>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 hover:border-blue-400 text-slate-200 text-xs font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{user?.name || 'Profile'}</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/create-project"
                className="btn-primary text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5 font-medium"
              >
                <span>Generate</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-slate-400 hover:text-white cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-blue-600" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 border border-white/[0.08] bg-[#050810]/95 backdrop-blur-2xl rounded-2xl p-4 space-y-2.5 shadow-2xl pointer-events-auto">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/[0.05]"
          >
            Home
          </Link>
          <Link
            to="/create-project"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/[0.05]"
          >
            Generate
          </Link>
          <Link
            to="/mentor"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/[0.05]"
          >
            Mentor
          </Link>
          <Link
            to="/roadmap"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/[0.05]"
          >
            Roadmap
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/[0.05]"
          >
            Resources
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/[0.05]"
          >
            Progress
          </Link>
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 text-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-white text-xs font-medium"
              >
                Go to Workspace
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center rounded-xl btn-secondary text-xs font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/create-project"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center rounded-xl btn-primary text-xs font-medium"
                >
                  Generate My Project
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
