import { describe, it, expect } from 'vitest';
import { handleGeminiApiRequest } from '../../src/server/geminiHandler';
import { MentorChatRequest } from '../../src/types/mentor';

describe('AI Mentor Senior Response System', () => {
  const sampleRequest: MentorChatRequest = {
    message: 'What should I build first?',
    projectContext: {
      projectId: 'p-1',
      projectTitle: 'SmartCampus AI Vision',
      domain: 'Computer Vision & IoT',
      difficulty: 'Intermediate',
      technologies: ['FastAPI', 'React', 'OpenCV', 'PostgreSQL'],
      currentMilestone: 'Phase 1: Architecture',
      problemStatement: 'Automate student campus access tracking using edge computer vision.',
    },
    conversationHistory: [],
  };

  it('produces ONE direct mentor reply without reasoning traces, evaluator rubrics, or followups', async () => {
    const result = await handleGeminiApiRequest('mentor-chat', sampleRequest as unknown as Record<string, unknown>);
    expect(result.status).toBe(200);

    const data = result.data as { reply: string; suggestedFollowUps: string[]; source: string };
    expect(data.reply).toBeDefined();
    expect(typeof data.reply).toBe('string');
    expect(data.reply.length).toBeGreaterThan(20);

    // Rule: Never expose internal reasoning / evaluator instructions
    expect(data.reply.toLowerCase()).not.toContain('chain-of-thought');
    expect(data.reply.toLowerCase()).not.toContain('rubric');
    expect(data.reply.toLowerCase()).not.toContain('evaluator instructions');
    expect(data.reply.toLowerCase()).not.toContain('system instructions');

    // Rule: Do not generate suggested followups automatically
    expect(data.suggestedFollowUps).toEqual([]);

    // Rule: ONE direct response
    expect(data.reply).not.toContain('Answer 1:');
  }, 30000);

  it('answers How do I secure my API keys? with server-side proxy best practice and zero secrets exposed', async () => {
    const req: MentorChatRequest = {
      ...sampleRequest,
      message: 'How do I secure my API keys?',
    };

    const result = await handleGeminiApiRequest('mentor-chat', req as unknown as Record<string, unknown>);
    expect(result.status).toBe(200);
    const data = result.data as { reply: string };

    expect(data.reply.toLowerCase()).toContain('.env');
    // Ensure actual secret key is NEVER exposed in the reply text
    const currentKey = process.env.GEMINI_API_KEY || '';
    if (currentKey && currentKey.length > 5) {
      expect(data.reply).not.toContain(currentKey);
    }
  }, 30000);

  it('answers How can I improve this project? directly without huge rubric sections', async () => {
    const req: MentorChatRequest = {
      ...sampleRequest,
      message: 'How can I improve this project?',
    };

    const result = await handleGeminiApiRequest('mentor-chat', req as unknown as Record<string, unknown>);
    expect(result.status).toBe(200);
    const data = result.data as { reply: string };

    // Should give direct practical guidance without evaluator score chatter
    expect(data.reply.toLowerCase()).not.toContain('rubric scoring');
    expect(data.reply.toLowerCase()).not.toContain('grading scale');
  }, 30000);

  it('answers "I am stuck." with actionable troubleshooting steps', async () => {
    const req: MentorChatRequest = {
      ...sampleRequest,
      message: "I'm stuck.",
    };

    const result = await handleGeminiApiRequest('mentor-chat', req as unknown as Record<string, unknown>);
    expect(result.status).toBe(200);
    const data = result.data as { reply: string };

    expect(data.reply.length).toBeGreaterThan(20);
  }, 30000);
});
