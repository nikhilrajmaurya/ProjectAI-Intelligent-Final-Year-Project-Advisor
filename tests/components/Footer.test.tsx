import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Footer } from '../../src/components/layout/Footer';

describe('Footer Component', () => {
  it('renders the mandatory centered author attribution: Designed and developed by Nikhil Raj Maurya', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    // Exact spelling check
    expect(screen.getByText('Designed and developed by')).toBeInTheDocument();
    expect(screen.getByText('Nikhil Raj Maurya')).toBeInTheDocument();
  });

  it('renders application brand and resource links', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(
      screen.getByText('AI Project Idea Generator & Mentor')
    ).toBeInTheDocument();
    expect(screen.getByText('Google Gemini 2.5 Flash')).toBeInTheDocument();
  });
});
