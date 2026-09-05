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

  it('provides direct practical advice when asked "What should I build first?"', () => {
    const res = getLocalMentorResponse('What should I build first?', sampleContext);
    expect(res.reply.toLowerCase()).toContain('walking skeleton');
    expect(res.reply).toContain('VeriScan Medical Triage');
    expect(res.suggestedFollowUps).toEqual([]);
  });

  it('recommends PostgreSQL and explains relational rigor for "Which database should I use?"', () => {
    const res = getLocalMentorResponse('Which database should I use?', sampleContext);
    expect(res.reply).toContain('PostgreSQL');
    expect(res.reply.toLowerCase()).toContain('relational rigor');
  });

  it('provides direct troubleshooting steps when asked "I am stuck"', () => {
    const res = getLocalMentorResponse("I'm stuck with an error", sampleContext);
    expect(res.reply).toContain('Network Tab');
    expect(res.reply).toContain('Server Terminal Logs');
  });

  it('explains production hosting when asked "How should I deploy it?"', () => {
    const res = getLocalMentorResponse('How should I deploy it?', sampleContext);
    expect(res.reply).toContain('Vercel');
    expect(res.reply).toContain('Cloud Run');
  });

  it('explains how to secure API keys with server-side proxy', () => {
    const res = getLocalMentorResponse('How do I secure my API keys?', sampleContext);
    expect(res.reply.toLowerCase()).toContain('.env');
    expect(res.reply.toLowerCase()).toContain('backend proxy');
  });
});
