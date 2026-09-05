export type DifficultyLevel = 'Beginner-Friendly' | 'Intermediate' | 'Advanced';

export interface ProjectIdea {
  id: string;
  title: string;
  domain: string;
  problemStatement: string;
  shortDescription: string;
  whyItMatches: string;
  difficulty: DifficultyLevel;
  estimatedDurationWeeks: number;
  requiredTechnologies: string[];
  innovationPotential: string;
  mainRisks: string[];
  mvpFeatures: string[];
  futureFeatures: string[];
  architectureSummary: string;
  objectives: string[];
  targetUsers: string;
  expectedOutcome: string;
  savedAt?: string;
}

export interface ArchitectureComponent {
  name: string;
  purpose: string;
  technologies: string[];
}

export interface ApiEndpointSpec {
  name: string;
  purpose: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
}

export interface BlueprintFeature {
  title: string;
  priority?: 'Must Have' | 'Should Have' | 'Could Have';
  impact?: string;
  complexity: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface ProjectBlueprint {
  projectId: string;
  projectTitle: string;
  architecture: {
    pattern: string;
    diagramDescription: string;
    components: ArchitectureComponent[];
  };
  frontend: {
    framework: string;
    styling: string;
    stateManagement: string;
    keyLibraries: string[];
  };
  backend: {
    runtime: string;
    framework: string;
    apiType: string;
    architectureStyle: string;
  };
  database: {
    primary: string;
    caching: string;
    orm: string;
    dataModelSummary: string;
  };
  apis: ApiEndpointSpec[];
  aiComponents: {
    model: string;
    role: string;
    pipelineDescription: string;
    promptStrategy: string;
  };
  authentication: {
    method: string;
    provider: string;
    securityMeasures: string[];
  };
  externalServices: {
    service: string;
    purpose: string;
  }[];
  deploymentArchitecture: {
    hostingFrontend: string;
    hostingBackend: string;
    ciCd: string;
    monitoring: string;
  };
  mvpFeatures: BlueprintFeature[];
  futureFeatures: BlueprintFeature[];
  generatedAt: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedHours: number;
}

export interface RoadmapMilestone {
  id: string;
  weekNumber: number;
  title: string;
  objective: string;
  dependencies: string[];
  tasks: RoadmapTask[];
}

export interface ProjectRoadmap {
  projectId: string;
  projectTitle: string;
  totalWeeks: number;
  milestones: RoadmapMilestone[];
  generatedAt: string;
}

export interface ProjectCreationFormValues {
  interests: string[];
  skills: string[];
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  preferredDomain: string;
  teamSize: number;
  availableTimeWeeks: number;
  budgetResources: string;
  constraints: string;
  preferredTechnologies: string[];
}
