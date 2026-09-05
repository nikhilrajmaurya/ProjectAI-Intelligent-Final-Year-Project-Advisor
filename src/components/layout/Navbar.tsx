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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-slate-950/70 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg p-1"
          aria-label="AI Project Idea Generator & Mentor Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
              ProjectMentor<span className="text-cyan-400 font-normal">.ai</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">
              Final Year Projects
            </span>
          </div>
        </Link>

        {/* Center: Nav links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              isCurrent('/') && location.pathname === '/'
                ? 'text-white bg-white/[0.08] shadow-sm'
                : 'hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              isCurrent('/how-it-works')
                ? 'text-white bg-white/[0.08] shadow-sm'
                : 'hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            How It Works
          </Link>
          <a
            href="/#features"
            className="px-3 py-1.5 rounded-lg transition-colors hover:text-white hover:bg-white/[0.04]"
          >
            Features
          </a>
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              isCurrent('/dashboard')
                ? 'text-white bg-white/[0.08] shadow-sm'
                : 'hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/[0.08] cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/60 hover:border-blue-500/50 text-slate-200 text-sm font-medium transition-all"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>{user?.name || 'My Workspace'}</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/create-project"
                className="btn-primary text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 font-medium"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            How It Works
          </Link>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Features
          </a>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Dashboard
          </Link>
          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl bg-slate-900 text-white font-medium border border-slate-700"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl btn-secondary text-sm font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/create-project"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl btn-primary text-sm font-medium"
                >
                  Start Building
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
