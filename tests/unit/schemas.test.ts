import { describe, it, expect } from 'vitest';
import {
  projectCreationSchema,
  projectIdeaZodSchema,
  blueprintZodSchema,
  mentorChatZodSchema,
} from '../../src/lib/schemas';

describe('Zod Schema Validations', () => {
  it('validates a correct project creation form payload', () => {
    const validData = {
      interests: ['AI', 'Health'],
      skills: ['Python', 'TypeScript'],
      experience: 'Intermediate' as const,
      preferredDomain: 'Artificial Intelligence & Machine Learning',
      teamSize: 2,
      availableTimeWeeks: 8,
      budgetResources: 'Free tier only',
      constraints: 'Open source only',
      preferredTechnologies: ['FastAPI', 'React'],
    };

    const result = projectCreationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid project creation payload with empty skills or interests', () => {
    const invalidData = {
      interests: [],
      skills: [],
      experience: 'InvalidLevel',
      preferredDomain: '',
      teamSize: 0,
      availableTimeWeeks: 1,
      budgetResources: '',
      constraints: '',
      preferredTechnologies: [],
    };

    const result = projectCreationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('validates structured project idea output', () => {
    const sampleIdea = {
      id: 'test-proj-1',
      title: 'VeriScan Medical Triage',
      domain: 'Artificial Intelligence & Machine Learning',
      problemStatement: 'Delayed clinical triage in rural health centres.',
      shortDescription: 'AI triage assistant processing patient blood tests.',
      whyItMatches: 'Matches Python skills and available 8 weeks.',
      difficulty: 'Intermediate' as const,
      estimatedDurationWeeks: 8,
      requiredTechnologies: ['Python', 'FastAPI', 'React'],
      innovationPotential: 'Multimodal clinical reasoning with PII masking.',
      mainRisks: ['False negatives requiring doctor in the loop.'],
      mvpFeatures: ['Biomarker extraction', 'Triage flagger'],
      futureFeatures: ['EHR FHIR integration'],
      architectureSummary: 'FastAPI backend + React frontend + PostgreSQL.',
      objectives: ['Reduce triage queue time by 60%'],
      targetUsers: 'Triage doctors and nurses',
      expectedOutcome: 'Functional clinic prototype',
    };

    const result = projectIdeaZodSchema.safeParse(sampleIdea);
    expect(result.success).toBe(true);
  });

  it('validates blueprint output schema', () => {
    const sampleBlueprint = {
      projectId: 'proj-1',
      projectTitle: 'Sample Project',
      architecture: {
        pattern: 'Microservices',
        diagramDescription: 'Client -> Gateway -> Core Service',
        components: [
          { name: 'UI', purpose: 'User experience', technologies: ['React'] },
          { name: 'API', purpose: 'Business logic', technologies: ['Node'] },
        ],
      },
      frontend: {
        framework: 'React',
        styling: 'Tailwind CSS',
        stateManagement: 'Zustand',
        keyLibraries: ['lucide-react'],
      },
      backend: {
        runtime: 'Node.js',
        framework: 'Express',
        apiType: 'REST',
        architectureStyle: 'Layered',
      },
      database: {
        primary: 'PostgreSQL',
        caching: 'Redis',
        orm: 'Prisma',
        dataModelSummary: 'Users, Projects, Logs',
      },
      apis: [
        { name: 'Health', purpose: 'Liveness check', method: 'GET' as const, endpoint: '/api/health' },
      ],
      aiComponents: {
        model: 'Gemini 2.5 Flash',
        role: 'Semantic parsing',
        pipelineDescription: 'Sanitize -> Prompt -> Parse',
        promptStrategy: 'Strict JSON schema',
      },
      authentication: {
        method: 'JWT',
        provider: 'Firebase',
        securityMeasures: ['HTTPS', 'CORS'],
      },
      externalServices: [{ service: 'Google Gemini', purpose: 'Reasoning' }],
      deploymentArchitecture: {
        hostingFrontend: 'Vercel',
        hostingBackend: 'Cloud Run',
        ciCd: 'GitHub Actions',
        monitoring: 'Sentry',
      },
      mvpFeatures: [
        { title: 'Core parser', priority: 'Must Have' as const, complexity: 'Medium' as const, description: 'Core feature' },
      ],
      futureFeatures: [
        { title: 'Mobile app', impact: 'High', complexity: 'High' as const, description: 'Post MVP expansion' },
      ],
      generatedAt: new Date().toISOString(),
    };

    const result = blueprintZodSchema.safeParse(sampleBlueprint);
    expect(result.success).toBe(true);
  });

  it('validates mentor chat response schema', () => {
    const mentorAns = {
      reply: 'Start with your database models first.',
      suggestedFollowUps: ['Which database?', 'How to deploy?'],
    };

    const result = mentorChatZodSchema.safeParse(mentorAns);
    expect(result.success).toBe(true);
  });
});
