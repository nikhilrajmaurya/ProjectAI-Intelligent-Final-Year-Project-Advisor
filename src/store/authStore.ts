import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  institution?: string;
  provider: 'google' | 'email' | 'demo';
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  quickDemoLogin: () => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      quickDemoLogin: () => {
        set({
          user: {
            name: 'Alex Rivera',
            email: 'alex.rivera@student.edu',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            role: 'Final Year CSE Student',
            institution: 'Institute of Technology',
            provider: 'demo',
          },
          isAuthenticated: true,
          error: null,
        });
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate standard Google OAuth redirection/popup
          await new Promise((resolve) => setTimeout(resolve, 800));
          set({
            user: {
              name: 'Student Developer',
              email: 'student@gmail.com',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
              role: 'Undergraduate Researcher',
              institution: 'Engineering Campus',
              provider: 'google',
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            isLoading: false,
            error: 'Google Sign-In encountered a network issue. You can use Quick Demo Mode.',
          });
        }
      },

      loginWithEmail: async (email: string, pass: string) => {
        set({ isLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (!email.includes('@') || pass.length < 6) {
          set({
            isLoading: false,
            error: 'Invalid credentials. Password must be at least 6 characters.',
          });
          return false;
        }

        const username = email.split('@')[0];
        const formattedName = username.charAt(0).toUpperCase() + username.slice(1);

        set({
          user: {
            name: formattedName,
            email,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
            role: 'Final Year Student',
            institution: 'University Department',
            provider: 'email',
          },
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'ai-project-mentor-auth',
    }
  )
);
