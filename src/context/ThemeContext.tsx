import React, { useEffect, useState, useCallback } from 'react';
import { ThemeContext, Theme } from './ThemeContextDefinition';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-theme') as Theme;
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  const applyThemeToDOM = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(newTheme);
    root.setAttribute('data-theme', newTheme);
  }, []);

  useEffect(() => {
    applyThemeToDOM(theme);
    try {
      localStorage.setItem('app-theme', theme);
    } catch {
      // Ignore local storage error
    }
  }, [theme, applyThemeToDOM]);

  // Listen to OS-level preference changes if user hasn't explicitly set one
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e: MediaQueryListEvent) => {
      const hasSavedTheme = localStorage.getItem('app-theme');
      if (!hasSavedTheme) {
        const sysTheme = e.matches ? 'light' : 'dark';
        setThemeState(sysTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyThemeToDOM(next);
      try {
        localStorage.setItem('app-theme', next);
      } catch {
        // Ignore
      }
      return next;
    });
  }, [applyThemeToDOM]);

  const setTheme = useCallback((newTheme: Theme) => {
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem('app-theme', newTheme);
    } catch {
      // Ignore
    }
    setThemeState(newTheme);
  }, [applyThemeToDOM]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
