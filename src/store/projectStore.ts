import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProjectIdea, ProjectBlueprint, ProjectRoadmap, ProjectCreationFormValues } from '../types/project';
import { GeminiService } from '../services/gemini.service';
import { generateRoadmapForProject } from '../services/domainKnowledge';

interface ProjectState {
  currentFormValues: ProjectCreationFormValues | null;
  generatedIdeas: ProjectIdea[];
  activeProject: ProjectIdea | null;
  blueprint: ProjectBlueprint | null;
  roadmap: ProjectRoadmap | null;
  savedIdeas: ProjectIdea[];
  isGeneratingIdeas: boolean;
  isGeneratingBlueprint: boolean;
  error: string | null;
  ideasSource: 'gemini-live' | 'local-engine' | null;

  setFormValues: (values: ProjectCreationFormValues) => void;
  generateIdeas: (values: ProjectCreationFormValues) => Promise<ProjectIdea[]>;
  regenerateIdea: (index: number) => Promise<void>;
  setActiveProject: (project: ProjectIdea) => void;
  selectProjectById: (id: string) => void;
  generateProjectBlueprint: (project: ProjectIdea) => Promise<ProjectBlueprint>;
  toggleTaskCompletion: (milestoneId: string, taskId: string) => void;
  saveIdea: (project: ProjectIdea) => void;
  removeSavedIdea: (id: string) => void;
  isSaved: (id: string) => boolean;
  setRoadmap: (roadmap: ProjectRoadmap) => void;
  clearError: () => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      currentFormValues: null,
      generatedIdeas: [],
      activeProject: null,
      blueprint: null,
      roadmap: null,
      savedIdeas: [],
      isGeneratingIdeas: false,
      isGeneratingBlueprint: false,
      error: null,
      ideasSource: null,

      setFormValues: (values) => set({ currentFormValues: values }),

      generateIdeas: async (values) => {
        set({ isGeneratingIdeas: true, error: null, currentFormValues: values });
        try {
          const result = await GeminiService.generateIdeas(values);
          set({
            generatedIdeas: result.ideas,
            ideasSource: result.source,
            isGeneratingIdeas: false,
          });
          return result.ideas;
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : 'Failed to generate project ideas. Please try again.';
          set({ error: errMsg, isGeneratingIdeas: false });
          return [];
        }
      },

      regenerateIdea: async (index: number) => {
        const { currentFormValues, generatedIdeas } = get();
        if (!currentFormValues || !generatedIdeas[index]) return;

        set({ error: null });
        try {
          const updatedIdea = await GeminiService.regenerateSingleIdea(
            currentFormValues,
            generatedIdeas,
            index
          );
          const newIdeas = [...generatedIdeas];
          newIdeas[index] = updatedIdea;
          set({ generatedIdeas: newIdeas });
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : 'Failed to regenerate idea.';
          set({ error: errMsg });
        }
      },

      setActiveProject: (project) => {
        const roadmap = generateRoadmapForProject(project, project.estimatedDurationWeeks || 8);
        set({
          activeProject: project,
          roadmap,
          blueprint: null,
        });
      },

      selectProjectById: (id: string) => {
        const { generatedIdeas, savedIdeas } = get();
        const found = generatedIdeas.find((p) => p.id === id) || savedIdeas.find((p) => p.id === id);
        if (found) {
          get().setActiveProject(found);
        }
      },

      setRoadmap: (roadmap) => set({ roadmap }),

      generateProjectBlueprint: async (project) => {
        set({ isGeneratingBlueprint: true, error: null });
        try {
          const blueprint = await GeminiService.generateBlueprint(project);
          set({ blueprint, isGeneratingBlueprint: false });
          return blueprint;
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : 'Failed to generate architectural blueprint.';
          set({
            error: errMsg,
            isGeneratingBlueprint: false,
          });
          throw err;
        }
      },

      toggleTaskCompletion: (milestoneId: string, taskId: string) => {
        const { roadmap } = get();
        if (!roadmap) return;

        const updatedMilestones = roadmap.milestones.map((m) => {
          if (m.id !== milestoneId) return m;
          return {
            ...m,
            tasks: m.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
          };
        });

        set({
          roadmap: {
            ...roadmap,
            milestones: updatedMilestones,
          },
        });
      },

      saveIdea: (project) => {
        const { savedIdeas } = get();
        if (savedIdeas.some((s) => s.id === project.id)) return;
        set({
          savedIdeas: [
            ...savedIdeas,
            { ...project, savedAt: new Date().toLocaleDateString() },
          ],
        });
      },

      removeSavedIdea: (id: string) => {
        const { savedIdeas } = get();
        set({ savedIdeas: savedIdeas.filter((s) => s.id !== id) });
      },

      isSaved: (id: string) => {
        return get().savedIdeas.some((s) => s.id === id);
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'ai-project-mentor-storage',
      partialize: (state) => ({
        activeProject: state.activeProject,
        blueprint: state.blueprint,
        roadmap: state.roadmap,
        savedIdeas: state.savedIdeas,
        generatedIdeas: state.generatedIdeas,
        currentFormValues: state.currentFormValues,
      }),
    }
  )
);
