import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { useTheme } from '../../src/hooks/useTheme';

function TestThemeConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe('Theme Context & Dark/Light Switching', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('initializes with default dark theme when no stored preference exists and system prefers dark', () => {
    render(
      <ThemeProvider>
        <TestThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('switches smoothly from Dark to Light mode and updates DOM and localStorage', async () => {
    render(
      <ThemeProvider>
        <TestThemeConsumer />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    await userEvent.click(toggleBtn);

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('app-theme')).toBe('light');
  });

  it('switches smoothly from Light to Dark mode and updates DOM and localStorage', async () => {
    localStorage.setItem('app-theme', 'light');

    render(
      <ThemeProvider>
        <TestThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);

    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    await userEvent.click(toggleBtn);

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('app-theme')).toBe('dark');
  });
});
