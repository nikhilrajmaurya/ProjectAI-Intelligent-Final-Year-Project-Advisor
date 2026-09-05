import { GoogleGenAI } from '@google/genai';
import { generateCustomIdeasFromForm, generateBlueprintForProject } from '../services/domainKnowledge';
import { getLocalMentorResponse } from '../services/mentorKnowledge';
import { ProjectCreationFormValues, ProjectIdea } from '../types/project';
import { MentorChatRequest } from '../types/mentor';

export async function handleGeminiApiRequest(
  endpoint: string,
  body: Record<string, unknown>
): Promise<{ status: number; data: unknown }> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (endpoint === 'status') {
    return {
      status: 200,
      data: {
        configured: Boolean(apiKey && apiKey.length > 5),
        model: 'gemini-2.5-flash',
        timestamp: new Date().toISOString(),
      },
    };
  }

  // If apiKey is available, attempt real Gemini call
  if (apiKey && apiKey.length > 5) {
    try {
      const ai = new GoogleGenAI({ apiKey });

      if (endpoint === 'generate-ideas') {
        const formValues = body as unknown as ProjectCreationFormValues;
        const prompt = `You are a distinguished University Professor and Final-Year Project Advisor for undergraduate engineering students.
Generate 3 to 5 realistic, innovative, and highly practical Final Year Engineering Projects based on these student inputs:
- Interests: ${formValues.interests?.join(', ')}
- Technical Skills: ${formValues.skills?.join(', ')}
- Experience Level: ${formValues.experience}
- Domain: ${formValues.preferredDomain}
- Team Size: ${formValues.teamSize}
- Duration: ${formValues.availableTimeWeeks} weeks
- Budget & Resources: ${formValues.budgetResources}
- Constraints: ${formValues.constraints}
- Preferred Technologies: ${formValues.preferredTechnologies?.join(', ')}

Respond ONLY with a JSON object matching this exact TypeScript structure:
{
  "ideas": [
    {
      "id": "unique-slug-id",
      "title": "Project Title",
      "domain": "${formValues.preferredDomain}",
      "problemStatement": "Clear academic & industry problem statement",
      "shortDescription": "2-sentence executive summary",
      "whyItMatches": "Direct reason this matches student skills and team constraints",
      "difficulty": "${formValues.experience === 'Beginner' ? 'Beginner-Friendly' : formValues.experience === 'Advanced' ? 'Advanced' : 'Intermediate'}",
      "estimatedDurationWeeks": ${formValues.availableTimeWeeks},
      "requiredTechnologies": ["Tech1", "Tech2", "Tech3"],
      "innovationPotential": "Short statement on novelty",
      "mainRisks": ["Risk 1", "Risk 2"],
      "mvpFeatures": ["Feature 1", "Feature 2", "Feature 3"],
      "futureFeatures": ["Future 1", "Future 2"],
      "architectureSummary": "Summary of frontend, backend, database and AI components",
      "objectives": ["Objective 1", "Objective 2"],
      "targetUsers": "Target end users",
      "expectedOutcome": "Tangible deliverable by end of semester"
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return { status: 200, data: { ...parsed, source: 'gemini-live' } };
        }
      }

      if (endpoint === 'generate-blueprint') {
        const project = (body as { project?: ProjectIdea }).project;
        if (!project) {
          return { status: 400, data: { error: 'Project payload required' } };
        }

        const prompt = `You are a Principal Software Architect. Generate a production-ready engineering blueprint for this final-year project:
Title: ${project.title}
Domain: ${project.domain}
Problem: ${project.problemStatement}
Tech Stack: ${project.requiredTechnologies?.join(', ')}

Respond ONLY with a JSON object with this exact structure:
{
  "projectId": "${project.id}",
  "projectTitle": "${project.title}",
  "architecture": {
    "pattern": "Architecture Pattern Name",
    "diagramDescription": "Text description of architecture",
    "components": [
      { "name": "Frontend", "purpose": "UI and state", "technologies": ["React", "TypeScript"] },
      { "name": "Backend", "purpose": "API and business logic", "technologies": ["FastAPI / Node"] },
      { "name": "Database", "purpose": "Data persistence", "technologies": ["PostgreSQL"] }
    ]
  },
  "frontend": {
    "framework": "React / Next.js",
    "styling": "Tailwind CSS",
    "stateManagement": "Zustand / Redux",
    "keyLibraries": ["react-router-dom", "lucide-react"]
  },
  "backend": {
    "runtime": "Node.js / Python",
    "framework": "Express / FastAPI",
    "apiType": "RESTful JSON API",
    "architectureStyle": "Controller-Service-Repository"
  },
  "database": {
    "primary": "PostgreSQL 16",
    "caching": "Redis",
    "orm": "Prisma / SQLAlchemy",
    "dataModelSummary": "Key entities: Users, Projects, Telemetry"
  },
  "apis": [
    { "name": "Health", "purpose": "Health check", "method": "GET", "endpoint": "/api/health" },
    { "name": "Main Action", "purpose": "Primary process", "method": "POST", "endpoint": "/api/v1/process" }
  ],
  "aiComponents": {
    "model": "Google Gemini 2.5 Flash",
    "role": "Semantic inference and automation",
    "pipelineDescription": "Input validation -> Gemini generation -> Schema parsing",
    "promptStrategy": "Structured JSON with few-shot context"
  },
  "authentication": {
    "method": "JWT Bearer tokens",
    "provider": "Firebase Auth / Supabase",
    "securityMeasures": ["HTTP-only cookies", "Rate limiting", "CORS"]
  },
  "externalServices": [
    { "service": "Google Gemini API", "purpose": "AI reasoning" }
  ],
  "deploymentArchitecture": {
    "hostingFrontend": "Vercel / Firebase Hosting",
    "hostingBackend": "Google Cloud Run / Render",
    "ciCd": "GitHub Actions",
    "monitoring": "Prometheus & Sentry"
  },
  "mvpFeatures": [
    { "title": "Core ingestion", "priority": "Must Have", "complexity": "Medium", "description": "Crucial MVP feature" }
  ],
  "futureFeatures": [
    { "title": "Advanced analytics", "impact": "High", "complexity": "High", "description": "Future expansion" }
  ],
  "generatedAt": "${new Date().toISOString()}"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return { status: 200, data: { ...parsed, source: 'gemini-live' } };
        }
      }

      if (endpoint === 'mentor-chat') {
        const req = body as unknown as MentorChatRequest;
        const project = req.projectContext;
        const prompt = `You are the dedicated AI Project Mentor for an engineering student working on their Final-Year Project:
Project Title: ${project?.projectTitle || 'Final Year Project'}
Domain: ${project?.domain || 'Computer Science & Engineering'}
Technologies: ${project?.technologies?.join(', ') || 'Modern Tech Stack'}
Current Milestone: ${project?.currentMilestone || 'Planning & Architecture'}

Student asks: "${req.message}"

Give a concise, actionable, beginner-friendly, and technically accurate answer formatted in clean Markdown.
Include specific code snippets or steps where appropriate.
Also provide 3 relevant follow-up questions the student might ask next.
Respond ONLY with JSON:
{
  "reply": "markdown string",
  "suggestedFollowUps": ["Question 1", "Question 2", "Question 3"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return { status: 200, data: { ...parsed, source: 'gemini-live' } };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, using high-fidelity local fallback engine:', err);
    }
  }

  // Graceful local intelligence fallback
  if (endpoint === 'generate-ideas') {
    const ideas = generateCustomIdeasFromForm(body as unknown as ProjectCreationFormValues);
    return { status: 200, data: { ideas, source: 'local-engine' } };
  }

  if (endpoint === 'generate-blueprint') {
    const project = (body as { project: ProjectIdea }).project;
    const blueprint = generateBlueprintForProject(project);
    return { status: 200, data: { ...blueprint, source: 'local-engine' } };
  }

  if (endpoint === 'mentor-chat') {
    const req = body as unknown as MentorChatRequest;
    const ans = getLocalMentorResponse(req.message, req.projectContext);
    return {
      status: 200,
      data: {
        reply: ans.reply,
        suggestedFollowUps: ans.suggestedFollowUps,
        source: 'local-engine',
      },
    };
  }

  return { status: 404, data: { error: 'Unknown endpoint' } };
}
