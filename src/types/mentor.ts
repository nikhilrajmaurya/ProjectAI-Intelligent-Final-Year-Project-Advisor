export interface MentorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface MentorContext {
  projectId: string;
  projectTitle: string;
  domain: string;
  difficulty: string;
  technologies: string[];
  currentMilestone?: string;
  problemStatement?: string;
}

export interface MentorChatRequest {
  message: string;
  projectContext: MentorContext;
  conversationHistory: { role: 'user' | 'assistant'; content: string }[];
}

export interface MentorChatResponse {
  reply: string;
  suggestedFollowUps: string[];
  source?: 'gemini-live' | 'local-engine';
}
