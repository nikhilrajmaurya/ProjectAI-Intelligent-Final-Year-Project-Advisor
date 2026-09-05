import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MentorMessage, MentorContext } from '../types/mentor';
import { GeminiService } from '../services/gemini.service';

interface MentorState {
  messages: MentorMessage[];
  isLoading: boolean;
  error: string | null;

  sendMessage: (content: string, context?: MentorContext) => Promise<void>;
  retryLastMessage: (context?: MentorContext) => Promise<void>;
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
                content: `👋 Welcome to your AI Project Mentor workspace!\n\nI am your senior engineering mentor for ${
                  projectTitle ? `**${projectTitle}**` : 'your final-year project'
                }. I can help you validate architectural decisions, unblock technical issues, choose suitable databases, and guide your MVP development.\n\nWhat would you like to build or solve first?`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
        } catch {
          // Rule: If Gemini fails, show one clean user-friendly message with retry capability. Never expose raw API errors.
          const errorMsg: MentorMessage = {
            id: `msg-${Date.now()}-error`,
            role: 'assistant',
            content: "Sorry, I couldn't generate a response right now. Please try again.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
            lastFailedUserMessage: content.trim(),
          };

          set({
            messages: [...get().messages, errorMsg],
            isLoading: false,
            error: "Sorry, I couldn't generate a response right now. Please try again.",
          });
        }
      },

      retryLastMessage: async (context?: MentorContext) => {
        const { messages, isLoading, sendMessage } = get();
        if (isLoading) return;

        // Find last user query to retry
        const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
        if (!lastUserMsg) return;

        // Remove trailing error card before retrying
        const filtered = messages.filter((m) => !m.isError);
        set({ messages: filtered });

        await sendMessage(lastUserMsg.content, context);
      },

      clearChat: () => {
        set({ messages: [], error: null });
      },
    }),
    {
      name: 'ai-project-mentor-chat-storage',
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
