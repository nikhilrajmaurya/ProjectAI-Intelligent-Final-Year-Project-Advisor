import { describe, it, expect } from 'vitest';
import { getLocalMentorResponse } from '../../src/services/mentorKnowledge';

describe('AI Mentor Knowledge & Response Engine', () => {
  const sampleContext = {
    projectId: 'p1',
    projectTitle: 'VeriScan Medical Triage',
    domain: 'Healthcare AI',
    difficulty: 'Intermediate',
    technologies: ['FastAPI', 'React', 'PostgreSQL'],
    currentMilestone: 'Week 1: Requirements',
  };

  it('provides structured advice when asked "What should I build first?"', () => {
    const res = getLocalMentorResponse('What should I build first?', sampleContext);
    expect(res.reply).toContain('Walking Skeleton');
    expect(res.reply).toContain('VeriScan Medical Triage');
    expect(res.suggestedFollowUps.length).toBeGreaterThan(0);
  });

  it('recommends PostgreSQL and relational rigor for "Which database should I use?"', () => {
    const res = getLocalMentorResponse('Which database should I use?', sampleContext);
    expect(res.reply).toContain('PostgreSQL');
    expect(res.reply).toContain('Relational Rigor');
  });

  it('provides step-by-step debugging drill when asked "I am stuck"', () => {
    const res = getLocalMentorResponse("I'm stuck with an error", sampleContext);
    expect(res.reply).toContain('Network Tab');
    expect(res.reply).toContain('Isolation Drill');
  });

  it('explains zero-cost production hosting when asked "How should I deploy it?"', () => {
    const res = getLocalMentorResponse('How should I deploy it?', sampleContext);
    expect(res.reply).toContain('Vercel');
    expect(res.reply).toContain('Cloud Run');
  });
});
