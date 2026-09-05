import { MentorContext } from '../types/mentor';

export function getLocalMentorResponse(message: string, context?: MentorContext): { reply: string; suggestedFollowUps: string[] } {
  const query = message.toLowerCase().trim();
  const projectTitle = context?.projectTitle || 'your final-year project';
  const techStack = context?.technologies?.join(', ') || 'React, Node.js/Python, PostgreSQL';
  const domain = context?.domain || 'Software Engineering';

  if (query.includes('what should i build first') || query.includes('where do i start') || query.includes('first step')) {
    return {
      reply: `### Recommended First Steps for **${projectTitle}**

To avoid getting overwhelmed, here is the exact development sequence you should follow:

1. **Step 1: Set Up the Repository & Environment (Day 1-2)**
   - Initialize your Git repository with clear branch protections (\`main\` and \`dev\`).
   - Configure your environment variables (\`.env.example\`) and linter/formatter (ESLint + Prettier).

2. **Step 2: Build the Walking Skeleton (Day 3-5)**
   - Create a minimal end-to-end flow: A simple frontend UI calling a single test API endpoint on your backend (${techStack}) that inserts and queries one test row in your database.
   - Proving that the frontend, backend, and database talk to each other early will eliminate 80% of integration panic later.

3. **Step 3: Implement the Core MVP Feature (Week 2)**
   - Focus strictly on your **MVP Feature #1**: Do not add user authentication or fancy animations yet.
   - For ${domain}, get the primary data ingestion or core processing logic working first.

> **Mentor Tip:** An imperfect working demo with 1 feature is 10x more impressive to final-year examiners than 10 unfinished screens!`,
      suggestedFollowUps: [
        'Which database should I use for this project?',
        'How do I divide this work with my team?',
        'What should I prepare for the first guide review?'
      ]
    };
  }

  if (query.includes('which database') || query.includes('database should i use') || query.includes('sql or nosql')) {
    return {
      reply: `### Database Recommendation for **${projectTitle}**

For this project (${domain}), **PostgreSQL** is the strongest choice for your final-year defense, optionally paired with **Redis** for caching.

#### Why PostgreSQL?
1. **Relational Rigor:** Academic evaluators love seeing normalized relational schemas (3NF), Entity-Relationship (ER) diagrams, and foreign key integrity constraints.
2. **JSONB Flexibility:** If you have semi-structured data (like AI telemetry or varying sensor payloads), Postgres handles native JSONB indexing as quickly as MongoDB.
3. **Tooling & ORM Support:** Works seamlessly with Prisma, Drizzle, or SQLAlchemy/Alembic, providing automated migrations you can demonstrate during your evaluation.

#### Suggested Table Architecture:
- \`users\` (id, email, password_hash, role, created_at)
- \`projects\` (id, user_id, title, status, metadata_json)
- \`activity_logs\` (id, project_id, action, timestamp)

> **Mentor Tip:** If your project involves real-time chats or live sensor feeds, add **Redis** as an in-memory layer for pub/sub and session caching.`,
      suggestedFollowUps: [
        'What should I build first?',
        'How do I design the ER diagram?',
        'How do I handle database migrations?'
      ]
    };
  }

  if (query.includes('how do i implement this feature') || query.includes('implement feature') || query.includes('how to code')) {
    return {
      reply: `### Feature Implementation Guide for **${projectTitle}**

To implement features reliably without technical debt, use the **Inside-Out Methodology**:

1. **1. Define the Data Contract First**
   - Write out the TypeScript type or Python Pydantic model for the data input and output before writing code.
   - Example:
     \`\`\`typescript
     interface ProcessRequest {
       inputData: string;
       options: { priority: 'standard' | 'high' };
     }
     \`\`\`

2. **2. Build the Backend Service Logic**
   - Implement the business function independently of the HTTP layer so it can be unit-tested without running a server.

3. **3. Expose the REST / API Endpoint**
   - Wire the service into your router (\`POST /api/v1/...\`) with input validation (using Zod or Pydantic).
   - Test using curl, Postman, or an integration test.

4. **4. Connect the Frontend UI**
   - Create a clean form with loading skeletons, disabled submission while processing, and clear user-facing error banners.`,
      suggestedFollowUps: [
        'I am stuck on an error.',
        'How do I write unit tests for this?',
        'How can I improve this project?'
      ]
    };
  }

  if (query.includes('stuck') || query.includes('error') || query.includes('bug') || query.includes('not working')) {
    return {
      reply: `### Systematic Debugging Blueprint

When you are stuck, follow the **Isolation Drill**:

1. **Step 1: Inspect the Browser Network Tab**
   - Open Developer Tools (\`F12\`) → **Network** tab.
   - Look at the red failing request: Is it \`400 Bad Request\` (payload mismatch), \`401/403\` (auth header missing), \`404\` (wrong URL), or \`500\` (server crashed)?
   - Click the request and inspect the **Response** tab.

2. **Step 2: Check Server Terminal Logs**
   - Look at the stack trace in your terminal. Pinpoint the top-most line of code that references a file you actually wrote (ignore framework internals).

3. **Step 3: Reproduce with Minimal Payload**
   - Remove optional fields. Can you reproduce the error with the simplest possible hardcoded value?

4. **Step 4: Common Culprits in Final-Year Projects**
   - **CORS error:** Ensure your backend explicitly enables your frontend origin (e.g. \`http://localhost:5173\`).
   - **Async/Await unhandled promise:** Did you forget an \`await\` before database queries?
   - **Environment variable missing:** Check if \`.env\` is named correctly and variables start with \`VITE_\` for client-side code.

> **Tell me the exact error message or HTTP status code, and I will help you fix it step-by-step!**`,
      suggestedFollowUps: [
        'How do I fix CORS issues?',
        'How do I secure my API keys?',
        'What should I build first?'
      ]
    };
  }

  if (query.includes('improve') || query.includes('make it better') || query.includes('innovate') || query.includes('impress examiners')) {
    return {
      reply: `### How to Elevate **${projectTitle}** to Grade-A Level

External evaluators and university examiners grade projects on **technical depth**, **practicality**, and **rigor**—not just UI aesthetics. Here is how to make your project stand out:

1. **Add Real-Time Analytics or Telemetry**
   - Don't just show static tables; show latency graphs, processing throughput, or active user metrics using Chart.js or Recharts.

2. **Demonstrate Automated Testing & CI/CD**
   - Show a passing GitHub Actions workflow on your repository. Having 15+ automated tests passing on every pull request instantly puts you in the top 5% of student projects.

3. **Implement Explainable AI / Transparent Auditing**
   - If using AI, don't treat it as a black box. Show confidence scores, reasoning steps, or citation sources so evaluators see that you understand the mechanics.

4. **Include a Disaster Recovery / Fallback Mode**
   - Demonstrate what happens when an API is down. If your app gracefully degrades or uses cached fallbacks rather than crashing with an ugly white screen, examiners will be genuinely impressed.`,
      suggestedFollowUps: [
        'How should I deploy it?',
        'What questions will the viva examiners ask?',
        'Which database should I use?'
      ]
    };
  }

  if (query.includes('deploy') || query.includes('hosting') || query.includes('production') || query.includes('cloud')) {
    return {
      reply: `### Zero-Cost Production Deployment Guide for **${projectTitle}**

You can deploy this entire final-year project on reliable free tiers that look completely professional for your demo:

1. **Frontend Hosting: Vercel or Firebase Hosting**
   - Connect your GitHub repository to Vercel.
   - Automatic SSL certificate, global CDN edge caching, and preview links for every branch.
   - Build command: \`npm run build\`, Output directory: \`dist\`.

2. **Backend Hosting: Render or Google Cloud Run**
   - **Render / Railway:** Easiest for Node.js / FastAPI backends with free-tier managed containers.
   - **Google Cloud Run:** Best for showcasing Google Cloud integration on your resume. It packages your Docker container and scales to zero when not in use.

3. **Managed Database: Supabase or Neon (PostgreSQL)**
   - Neon or Supabase provides a free, instant serverless PostgreSQL database with automated SSL connections and web dashboards to view tables live during your viva.

> **Security Warning:** Never commit your real \`.env\` file to GitHub! Set environment variables directly in the Vercel / Render dashboard settings.`,
      suggestedFollowUps: [
        'What questions will the viva examiners ask?',
        'How do I test my project before deployment?',
        'How can I improve this project?'
      ]
    };
  }

  // General default helpful response
  return {
    reply: `### Guidance for **${projectTitle}**

Regarding your query: "${message}"

Here is actionable engineering advice tailored to your project (${domain}):

1. **Key Focus:** Keep your core architecture modular. Separate your data layer, business controllers, and presentation components cleanly.
2. **Current Priorities:** If you are working on ${techStack}, ensure that all API endpoints validate incoming requests, handle errors gracefully with meaningful HTTP status codes, and return typed JSON.
3. **Evaluation Tip:** Final-year project evaluators look closely at your documentation, unit test coverage, and real-time demonstration capabilities.

Feel free to ask about specific code implementations, database schema designs, or how to tackle specific project risks!`,
    suggestedFollowUps: [
      'What should I build first?',
      'Which database should I use?',
      'How should I deploy it?'
    ]
  };
}
