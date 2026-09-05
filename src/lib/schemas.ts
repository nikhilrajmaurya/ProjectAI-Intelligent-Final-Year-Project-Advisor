import { z } from 'zod';

export const projectCreationSchema = z.object({
  interests: z.array(z.string()).min(1, 'Please select or add at least one interest area'),
  skills: z.array(z.string()).min(1, 'Please select or enter at least one technical skill'),
  experience: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    message: 'Please select your current experience level',
  }),
  preferredDomain: z.string().min(2, 'Please select your preferred engineering domain'),
  teamSize: z.number().int().min(1, 'Team size must be at least 1').max(10, 'Team size cannot exceed 10'),
  availableTimeWeeks: z.number().int().min(2, 'Available time must be at least 2 weeks').max(52, 'Maximum 52 weeks'),
  budgetResources: z.string().min(2, 'Please specify budget or resource constraints (e.g. Free Tier, Hardware)'),
  constraints: z.string().min(2, 'Please specify academic/hardware constraints (or type "None")'),
  preferredTechnologies: z.array(z.string()).min(1, 'Select at least one preferred technology or tool'),
});

export type ProjectCreationFormSchema = z.infer<typeof projectCreationSchema>;

export const projectIdeaZodSchema = z.object({
  id: z.string(),
  title: z.string(),
  domain: z.string(),
  problemStatement: z.string(),
  shortDescription: z.string(),
  whyItMatches: z.string(),
  difficulty: z.enum(['Beginner-Friendly', 'Intermediate', 'Advanced']),
  estimatedDurationWeeks: z.number(),
  requiredTechnologies: z.array(z.string()),
  innovationPotential: z.string(),
  mainRisks: z.array(z.string()),
  mvpFeatures: z.array(z.string()),
  futureFeatures: z.array(z.string()),
  architectureSummary: z.string(),
  objectives: z.array(z.string()),
  targetUsers: z.string(),
  expectedOutcome: z.string(),
});

export const ideasResponseZodSchema = z.object({
  ideas: z.array(projectIdeaZodSchema).min(1),
  source: z.enum(['gemini-live', 'local-engine']).optional(),
});

export const blueprintZodSchema = z.object({
  projectId: z.string(),
  projectTitle: z.string(),
  architecture: z.object({
    pattern: z.string(),
    diagramDescription: z.string(),
    components: z.array(
      z.object({
        name: z.string(),
        purpose: z.string(),
        technologies: z.array(z.string()),
      })
    ),
  }),
  frontend: z.object({
    framework: z.string(),
    styling: z.string(),
    stateManagement: z.string(),
    keyLibraries: z.array(z.string()),
  }),
  backend: z.object({
    runtime: z.string(),
    framework: z.string(),
    apiType: z.string(),
    architectureStyle: z.string(),
  }),
  database: z.object({
    primary: z.string(),
    caching: z.string(),
    orm: z.string(),
    dataModelSummary: z.string(),
  }),
  apis: z.array(
    z.object({
      name: z.string(),
      purpose: z.string(),
      method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
      endpoint: z.string(),
    })
  ),
  aiComponents: z.object({
    model: z.string(),
    role: z.string(),
    pipelineDescription: z.string(),
    promptStrategy: z.string(),
  }),
  authentication: z.object({
    method: z.string(),
    provider: z.string(),
    securityMeasures: z.array(z.string()),
  }),
  externalServices: z.array(
    z.object({
      service: z.string(),
      purpose: z.string(),
    })
  ),
  deploymentArchitecture: z.object({
    hostingFrontend: z.string(),
    hostingBackend: z.string(),
    ciCd: z.string(),
    monitoring: z.string(),
  }),
  mvpFeatures: z.array(
    z.object({
      title: z.string(),
      priority: z.enum(['Must Have', 'Should Have', 'Could Have']).optional(),
      complexity: z.enum(['Low', 'Medium', 'High']),
      description: z.string(),
    })
  ),
  futureFeatures: z.array(
    z.object({
      title: z.string(),
      impact: z.string().optional(),
      complexity: z.enum(['Low', 'Medium', 'High']),
      description: z.string(),
    })
  ),
  generatedAt: z.string(),
  source: z.enum(['gemini-live', 'local-engine']).optional(),
});

export const mentorChatZodSchema = z.object({
  reply: z.string(),
  suggestedFollowUps: z.array(z.string()),
  source: z.enum(['gemini-live', 'local-engine']).optional(),
});
