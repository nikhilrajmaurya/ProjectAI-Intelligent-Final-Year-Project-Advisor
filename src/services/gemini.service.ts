import { ProjectCreationFormValues, ProjectIdea, ProjectBlueprint } from '../types/project';
import { MentorChatRequest, MentorChatResponse } from '../types/mentor';
import { ideasResponseZodSchema, blueprintZodSchema, mentorChatZodSchema } from '../lib/schemas';
import { generateCustomIdeasFromForm, generateBlueprintForProject } from './domainKnowledge';
import { getLocalMentorResponse } from './mentorKnowledge';

export class GeminiService {
  /**
   * Generates 3-5 personalized project ideas based on form inputs.
   */
  static async generateIdeas(formValues: ProjectCreationFormValues): Promise<{ ideas: ProjectIdea[]; source: 'gemini-live' | 'local-engine' }> {
    try {
      const response = await fetch('/api/gemini/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = ideasResponseZodSchema.safeParse(data);
        if (parsed.success && parsed.data.ideas.length > 0) {
          return {
            ideas: parsed.data.ideas,
            source: parsed.data.source || 'gemini-live',
          };
        }
      }
    } catch {
      // Backend not running or offline; seamlessly degrade to local high-fidelity intelligence
    }

    // High-fidelity fallback engine guaranteed to match exact user inputs
    const fallbackIdeas = generateCustomIdeasFromForm(formValues);
    return {
      ideas: fallbackIdeas,
      source: 'local-engine',
    };
  }

  /**
   * Generates or regenerates a single project idea.
   */
  static async regenerateSingleIdea(
    formValues: ProjectCreationFormValues,
    existingIdeas: ProjectIdea[],
    indexToReplace: number
  ): Promise<ProjectIdea> {
    try {
      const response = await fetch('/api/gemini/regenerate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formValues, existingIdeas, indexToReplace }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.idea && data.idea.title) {
          return data.idea;
        }
      }
    } catch {
      // Fallback
    }

    // Local variation generator
    const freshIdeas = generateCustomIdeasFromForm({
      ...formValues,
      teamSize: formValues.teamSize > 1 ? formValues.teamSize : 2,
    });
    const candidate = freshIdeas.find(f => !existingIdeas.some(e => e.title === f.title)) || {
      ...freshIdeas[0],
      id: `project-alt-${Date.now()}`,
      title: `${freshIdeas[0].title} (Specialized Variant)`,
    };

    return candidate;
  }

  /**
   * Generates an engineering blueprint for the selected project.
   */
  static async generateBlueprint(project: ProjectIdea): Promise<ProjectBlueprint> {
    try {
      const response = await fetch('/api/gemini/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = blueprintZodSchema.safeParse(data);
        if (parsed.success) {
          return parsed.data;
        }
      }
    } catch {
      // Fallback to local blueprint generator
    }

    return generateBlueprintForProject(project);
  }

  /**
   * Sends student message to AI Mentor with compact project context.
   */
  static async chatWithMentor(request: MentorChatRequest): Promise<MentorChatResponse> {
    try {
      const response = await fetch('/api/gemini/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = mentorChatZodSchema.safeParse(data);
        if (parsed.success) {
          return parsed.data;
        }
      }
    } catch {
      // Fallback to contextual local mentor knowledge
    }

    const localAns = getLocalMentorResponse(request.message, request.projectContext);
    return {
      reply: localAns.reply,
      suggestedFollowUps: localAns.suggestedFollowUps,
      source: 'local-engine',
    };
  }

  /**
   * Check status of Gemini configuration
   */
  static async checkStatus(): Promise<{ configured: boolean; model: string }> {
    try {
      const res = await fetch('/api/gemini/status');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Ignore
    }
    return { configured: false, model: 'gemini-2.5-flash (offline/fallback mode)' };
  }
}
