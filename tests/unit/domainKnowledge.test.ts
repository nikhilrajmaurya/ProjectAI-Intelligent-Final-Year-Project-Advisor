import { describe, it, expect } from 'vitest';
import {
  generateCustomIdeasFromForm,
  generateBlueprintForProject,
  generateRoadmapForProject,
} from '../../src/services/domainKnowledge';
import { ProjectCreationFormValues } from '../../src/types/project';

describe('Domain Knowledge and Engineering Generator', () => {
  const sampleFormValues: ProjectCreationFormValues = {
    interests: ['Generative AI', 'Computer Vision'],
    skills: ['Python', 'FastAPI', 'PyTorch'],
    experience: 'Intermediate',
    preferredDomain: 'Artificial Intelligence & Machine Learning',
    teamSize: 2,
    availableTimeWeeks: 12,
    budgetResources: '100% Free-tier only',
    constraints: 'Client-side PII privacy',
    preferredTechnologies: ['React', 'PostgreSQL', 'Gemini API'],
  };

  it('synthesizes multiple personalized project ideas tailored to inputs', () => {
    const ideas = generateCustomIdeasFromForm(sampleFormValues);

    expect(ideas.length).toBeGreaterThanOrEqual(2);
    expect(ideas[0].title).toBeDefined();
    expect(ideas[0].problemStatement).toBeDefined();
    expect(ideas[0].requiredTechnologies).toEqual(expect.arrayContaining(['Python']));
    expect(ideas[0].difficulty).toBe('Intermediate');
    expect(ideas[0].estimatedDurationWeeks).toBe(12);
  });

  it('generates an architectural blueprint for a selected project idea', () => {
    const ideas = generateCustomIdeasFromForm(sampleFormValues);
    const blueprint = generateBlueprintForProject(ideas[0]);

    expect(blueprint.projectId).toBe(ideas[0].id);
    expect(blueprint.architecture.pattern).toBeDefined();
    expect(blueprint.architecture.components.length).toBeGreaterThan(0);
    expect(blueprint.database.primary).toContain('PostgreSQL');
    expect(blueprint.frontend.framework).toContain('React');
    expect(blueprint.mvpFeatures.length).toBeGreaterThan(0);
    expect(blueprint.futureFeatures.length).toBeGreaterThan(0);
  });

  it('generates an adaptive roadmap matching the requested week count', () => {
    const ideas = generateCustomIdeasFromForm(sampleFormValues);
    const roadmap = generateRoadmapForProject(ideas[0], 8);

    expect(roadmap.totalWeeks).toBe(8);
    expect(roadmap.milestones.length).toBe(8);
    expect(roadmap.milestones[0].weekNumber).toBe(1);
    expect(roadmap.milestones[7].weekNumber).toBe(8);

    // Verify tasks have estimated hours and completion status
    expect(roadmap.milestones[0].tasks.length).toBeGreaterThan(0);
    expect(roadmap.milestones[0].tasks[0].completed).toBe(false);
    expect(roadmap.milestones[0].tasks[0].estimatedHours).toBeGreaterThan(0);
  });
});
