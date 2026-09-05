import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Copy,
  Check,
  User,
  HelpCircle,
  FolderKanban,
  Trash2,
  Terminal,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { useMentorStore } from '../store/mentorStore';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/common/Button';

export const MentorPage: React.FC = () => {
  const { activeProject, roadmap, blueprint, currentFormValues } = useProjectStore();
  const { messages, isLoading, sendMessage, retryLastMessage, clearChat, initializeDefaultGreeting } =
    useMentorStore();

  const [inputMessage, setInputMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting with active project context
  useEffect(() => {
    initializeDefaultGreeting(activeProject?.title);
  }, [activeProject, initializeDefaultGreeting]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    'What should I build first?',
    'Which database should I use?',
    'How do I implement this feature?',
    "I'm stuck.",
    'How can I improve this project?',
    'How should I deploy it?',
  ];

  const getProjectContext = () => {
    if (activeProject) {
      return {
        projectId: activeProject.id,
        projectTitle: activeProject.title,
        domain: activeProject.domain,
        difficulty: activeProject.difficulty,
        technologies: activeProject.requiredTechnologies,
        currentMilestone: roadmap?.milestones[0]?.title || 'Architecture & Planning',
        problemStatement: activeProject.problemStatement,
        features: [
          ...(activeProject.mvpFeatures || []),
          ...(activeProject.futureFeatures || []),
        ],
        architecture: blueprint
          ? `${blueprint.architecture.pattern}; Frontend: ${blueprint.frontend.framework}; Backend: ${blueprint.backend.framework}; DB: ${blueprint.database.primary}`
          : activeProject.architectureSummary,
        roadmapSummary: roadmap ? `${roadmap.totalWeeks} weeks total (${roadmap.milestones.length} milestones)` : undefined,
        studentSkills: currentFormValues?.skills,
        constraints: currentFormValues?.constraints,
      };
    }

    return {
      projectId: 'default',
      projectTitle: 'Final Year Engineering Project',
      domain: 'Computer Science',
      difficulty: 'Intermediate',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    };
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    setInputMessage('');
    await sendMessage(query, getProjectContext());
  };

  const handleRetry = async () => {
    await retryLastMessage(getProjectContext());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to format inline markdown (bold text, inline code)
  const renderInline = (text: string) => {
    // Split by inline code `...`
    const codeParts = text.split(/(`[^`]+`)/g);
    return codeParts.map((part, pIdx) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={pIdx}
            className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-800/80 border border-white/[0.08] font-mono text-[11px] text-cyan-300"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Split by bold **...**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          return (
            <strong key={bIdx} className="font-semibold text-white">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });
  };

  // Helper to format mentor markdown cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockLang = '';
    const codeLines: string[] = [];
    const elements: React.ReactNode[] = [];

    const flushCodeBlock = (key: string) => {
      if (codeLines.length > 0) {
        elements.push(
          <div
            key={key}
            className="my-2 p-3 rounded-xl bg-slate-950 border border-white/[0.08] font-mono text-[11px] text-cyan-300 overflow-x-auto flex flex-col gap-1"
          >
            {codeBlockLang && (
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono pb-1 border-b border-white/[0.06] mb-1">
                <Terminal className="w-3 h-3" />
                <span>{codeBlockLang}</span>
              </div>
            )}
            <pre className="m-0 whitespace-pre font-mono">{codeLines.join('\n')}</pre>
          </div>
        );
        codeLines.length = 0;
        codeBlockLang = '';
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock(`code-block-${idx}`);
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeBlockLang = trimmed.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={idx} className="text-sm font-bold text-white pt-1">
            {renderInline(line.replace('### ', ''))}
          </h4>
        );
        return;
      }

      if (line.startsWith('#### ')) {
        elements.push(
          <h5 key={idx} className="text-xs font-bold text-cyan-300 pt-0.5">
            {renderInline(line.replace('#### ', ''))}
          </h5>
        );
        return;
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <div key={idx} className="flex items-start gap-2 pl-2">
            <span className="text-cyan-400 font-bold leading-5">&bull;</span>
            <span className="leading-relaxed">{renderInline(line.replace(/^[-*]\s+/, ''))}</span>
          </div>
        );
        return;
      }

      const numMatch = line.match(/^(\d+\.)\s+(.+)$/);
      if (numMatch) {
        elements.push(
          <div key={idx} className="flex items-start gap-2 pl-2">
            <span className="text-blue-400 font-mono font-medium text-xs leading-5">{numMatch[1]}</span>
            <span className="leading-relaxed">{renderInline(numMatch[2])}</span>
          </div>
        );
        return;
      }

      if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={idx}
            className="pl-3 py-1 my-1.5 border-l-2 border-cyan-400/60 bg-blue-950/20 rounded-r-lg text-slate-300 italic"
          >
            {renderInline(line.replace('> ', ''))}
          </blockquote>
        );
        return;
      }

      if (!trimmed) {
        elements.push(<div key={idx} className="h-1" />);
        return;
      }

      elements.push(
        <p key={idx} className="leading-relaxed">
          {renderInline(line)}
        </p>
      );
    });

    if (inCodeBlock) {
      flushCodeBlock('code-block-end');
    }

    return <div className="space-y-2 text-xs sm:text-sm leading-relaxed">{elements}</div>;
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)] space-y-4">
        {/* Top Bar with Project Context Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROJECT-AWARE AI MENTOR</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI Project Mentor Workspace
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {activeProject ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/50 border border-blue-500/30 text-xs text-slate-200">
                <FolderKanban className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-semibold truncate max-w-[200px]">{activeProject.title}</span>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded">
                  {activeProject.difficulty}
                </span>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.08] text-xs text-slate-400">
                General CS Mentor Mode
              </div>
            )}

            <button
              onClick={clearChat}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Clear chat transcript"
              aria-label="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Prompts Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 shrink-0">
          <span className="text-[11px] font-mono text-slate-500 shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span>Quick:</span>
          </span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-blue-600/20 text-slate-300 hover:text-cyan-300 border border-white/[0.08] hover:border-blue-500/40 transition-all shrink-0 cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Transcript Area */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 rounded-2xl glass-panel p-4 sm:p-6 border-white/[0.08]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isCopied = copiedId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto justify-end' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1 shadow-[0_0_12px_rgba(37,99,235,0.3)]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`relative p-4 rounded-2xl border transition-all ${
                    isUser
                      ? 'bg-blue-600/25 border-blue-500/40 text-white rounded-tr-sm shadow-md'
                      : 'bg-slate-900/80 border-white/[0.08] text-slate-200 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {/* Message timestamp & copy */}
                  <div className="flex items-center justify-between gap-4 mb-2 text-[10px] text-slate-400 font-mono">
                    <span>{isUser ? 'You' : 'AI Project Mentor'} &bull; {msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="hover:text-cyan-300 transition-colors cursor-pointer"
                        title="Copy message"
                        aria-label="Copy message"
                      >
                        {isCopied ? (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Message Body */}
                  {isUser ? (
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.content}</p>
                  ) : msg.isError ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-rose-400">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <p className="text-xs sm:text-sm font-medium">{msg.content}</p>
                      </div>
                      <button
                        onClick={handleRetry}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Retry</span>
                      </button>
                    </div>
                  ) : (
                    renderFormattedContent(msg.content)
                  )}

                  {/* Suggested Follow-Ups (only rendered if explicitly returned and not error) */}
                  {!isUser && !msg.isError && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                        Suggested Follow-ups
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((fu, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(fu)}
                            disabled={isLoading}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-blue-500/20 text-slate-300 hover:text-cyan-300 border border-white/[0.06] text-[11px] transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {fu}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1 font-bold text-xs">
                    <User className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Bubble */}
          {isLoading && (
            <div className="flex gap-3 max-w-2xl mr-auto animate-in fade-in duration-200">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.3)]">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.08] text-xs text-slate-300 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                <span className="font-medium">AI Mentor is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="glass-panel p-3 rounded-2xl border-white/[0.08] shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about architecture, database choices, debugging, or viva defense questions... (Press Enter to send)"
              rows={2}
              className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none resize-none px-2 py-1"
            />

            <Button
              variant="primary"
              size="md"
              isLoading={isLoading}
              onClick={() => handleSend()}
              disabled={!inputMessage.trim()}
              className="rounded-xl px-4 py-2.5 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
