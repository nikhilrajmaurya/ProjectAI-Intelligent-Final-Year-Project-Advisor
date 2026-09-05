import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from '../../src/store/projectStore';
import { useMentorStore } from '../../src/store/mentorStore';
import { ProjectCreationFormValues } from '../../src/types/project';

describe('End-to-End Primary Application Flow', () => {
  const formPayload: ProjectCreationFormValues = {
    interests: ['Generative AI', 'Computer Vision'],
    skills: ['Python', 'FastAPI', 'React'],
    experience: 'Intermediate',
    preferredDomain: 'Artificial Intelligence & Machine Learning',
    teamSize: 2,
    availableTimeWeeks: 8,
    budgetResources: 'Free tier only',
    constraints: 'Client-side PII privacy',
    preferredTechnologies: ['FastAPI', 'React', 'Gemini API', 'PostgreSQL'],
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('executes the full capstone lifecycle: Generate Ideas -> Select -> Blueprint -> Roadmap -> Mentor', async () => {
    const projectStore = useProjectStore.getState();
    const mentorStore = useMentorStore.getState();

    // 1. Generate Ideas
    const ideas = await projectStore.generateIdeas(formPayload);
    expect(ideas.length).toBeGreaterThanOrEqual(2);
    const selected = ideas[0];
    expect(selected.title).toBeDefined();

    // 2. Select Project
    projectStore.setActiveProject(selected);
    expect(useProjectStore.getState().activeProject?.id).toBe(selected.id);

    // 3. Verify Roadmap generated automatically for the project
    const roadmap = useProjectStore.getState().roadmap;
    expect(roadmap).toBeDefined();
    expect(roadmap?.milestones.length).toBe(8);

    // 4. Toggle milestone task completion
    const firstMilestone = roadmap!.milestones[0];
    const firstTask = firstMilestone.tasks[0];
    expect(firstTask.completed).toBe(false);

    projectStore.toggleTaskCompletion(firstMilestone.id, firstTask.id);
    const updatedRoadmap = useProjectStore.getState().roadmap;
    expect(updatedRoadmap?.milestones[0].tasks[0].completed).toBe(true);

    // 5. Generate Blueprint
    const blueprint = await projectStore.generateProjectBlueprint(selected);
    expect(blueprint.projectId).toBe(selected.id);
    expect(blueprint.architecture.pattern).toBeDefined();
    expect(blueprint.mvpFeatures.length).toBeGreaterThan(0);
    expect(blueprint.futureFeatures.length).toBeGreaterThan(0);

    // 6. Ask AI Mentor a project-specific query
    await mentorStore.sendMessage('What should I build first?', {
      projectId: selected.id,
      projectTitle: selected.title,
      domain: selected.domain,
      difficulty: selected.difficulty,
      technologies: selected.requiredTechnologies,
    });

    const messages = useMentorStore.getState().messages;
    expect(messages.length).toBeGreaterThanOrEqual(2);
    const assistantReply = messages[messages.length - 1];
    expect(assistantReply.role).toBe('assistant');
    expect(assistantReply.content).toContain('Walking Skeleton');
  });
});
