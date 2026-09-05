import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MentorMessage, MentorContext } from '../types/mentor';
import { GeminiService } from '../services/gemini.service';

interface MentorState {
  messages: MentorMessage[];
  isLoading: boolean;
  error: string | null;

  sendMessage: (content: string, context?: MentorContext) => Promise<void>;
  clearChat: () => void;
  initializeDefaultGreeting: (projectTitle?: string) => void;
}

export const useMentorStore = create<MentorState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,

      initializeDefaultGreeting: (projectTitle?: string) => {
        const { messages } = get();
        if (messages.length === 0) {
          set({
            messages: [
              {
                id: 'welcome-msg',
                role: 'assistant',
                content: `👋 Welcome to your AI Project Mentor workspace!\n\nI am your dedicated engineering advisor for ${
                  projectTitle ? `**${projectTitle}**` : 'your final-year project'
                }. I can help you select your tech stack, review your architecture, break down complex milestones, fix blockers, and prepare for your university viva defense.\n\nWhat would you like to focus on right now?`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                suggestedFollowUps: [
                  'What should I build first?',
                  'Which database should I use?',
                  'How do I implement this feature?',
                  "I'm stuck.",
                  'How can I improve this project?',
                  'How should I deploy it?',
                ],
              },
            ],
          });
        }
      },

      sendMessage: async (content: string, context?: MentorContext) => {
        if (!content.trim()) return;

        const userMsg: MentorMessage = {
          id: `msg-${Date.now()}-user`,
          role: 'user',
          content: content.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const currentMessages = get().messages;
        set({
          messages: [...currentMessages, userMsg],
          isLoading: true,
          error: null,
        });

        try {
          // Send only compact history (last 4 messages) to optimize token economy
          const compactHistory = currentMessages.slice(-4).map((m) => ({
            role: m.role,
            content: m.content.slice(0, 500),
          }));

          const response = await GeminiService.chatWithMentor({
            message: content,
            projectContext: context || {
              projectId: 'default',
              projectTitle: 'Final Year Engineering Project',
              domain: 'Software Engineering',
              difficulty: 'Intermediate',
              technologies: ['React', 'Node.js', 'PostgreSQL'],
            },
            conversationHistory: compactHistory,
          });

          const assistantMsg: MentorMessage = {
            id: `msg-${Date.now()}-assistant`,
            role: 'assistant',
            content: response.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedFollowUps: response.suggestedFollowUps,
          };

          set({
            messages: [...get().messages, assistantMsg],
            isLoading: false,
          });
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : 'Unable to fetch response from mentor. Please try again.';
          set({
            isLoading: false,
            error: errMsg,
          });
        }
      },

      clearChat: () => {
        set({ messages: [] });
      },
    }),
    {
      name: 'ai-project-mentor-chat-storage',
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
