export interface MentorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  isError?: boolean;
  lastFailedUserMessage?: string;
  source?: 'gemini-live' | 'local-engine';
}

export interface MentorContext {
  projectId: string;
  projectTitle: string;
  domain: string;
  difficulty: string;
  technologies: string[];
  currentMilestone?: string;
  problemStatement?: string;
  features?: string[];
  architecture?: string;
  roadmapSummary?: string;
  studentSkills?: string[];
  constraints?: string;
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
