import { MentorContext } from '../types/mentor';

export function getLocalMentorResponse(message: string, context?: MentorContext): { reply: string; suggestedFollowUps: string[] } {
  const query = message.toLowerCase().trim();
  const projectTitle = context?.projectTitle || 'your project';
  const techStack = context?.technologies?.join(', ') || 'React, backend API, and PostgreSQL';
  const domain = context?.domain || 'Software Engineering';

  if (query.includes('what should i build first') || query.includes('where do i start') || query.includes('first step')) {
    return {
      reply: `For **${projectTitle}**, start by building a simple **walking skeleton** before touching complex features. Create one basic page with your frontend, wire it to a single backend API endpoint (${techStack}), and verify it can insert and read a test record from your database.\n\nOnce this end-to-end integration is proven, build your single most important MVP feature next. Having one working core flow early eliminates integration headaches and gives you immediate momentum.`,
      suggestedFollowUps: []
    };
  }

  if (query.includes('which database') || query.includes('database should i use') || query.includes('sql or nosql')) {
    return {
      reply: `I recommend using **PostgreSQL** for **${projectTitle}**. It gives you strong relational rigor with foreign key constraints for structured data (like users and project records), while also supporting native JSONB if you need semi-structured payloads.\n\nIf your project later requires heavy session caching or real-time pub/sub feeds, you can easily add **Redis** alongside it. For your next step, draft your core tables (\`users\`, \`projects\`, and \`activity_logs\`) with clear primary and foreign keys.`,
      suggestedFollowUps: []
    };
  }

  if (query.includes('how do i implement this feature') || query.includes('implement feature') || query.includes('how to code')) {
    return {
      reply: `To implement features cleanly in **${projectTitle}**, work inside-out:\n\n1. **Define the data contract:** Write the request/response interface or schema first.\n2. **Write the backend logic:** Implement the core business function and test it directly.\n3. **Expose the API endpoint:** Wire up the route with input validation and clear HTTP status codes.\n4. **Connect the frontend UI:** Add your input form with clear loading indicators and error states.\n\nTell me the specific feature you want to tackle next, and we'll draft the schema together.`,
      suggestedFollowUps: []
    };
  }

  if (query.includes('stuck') || query.includes('error') || query.includes('bug') || query.includes('not working')) {
    return {
      reply: `When debugging an issue in **${projectTitle}**, check these three points immediately:\n\n1. **Browser Network Tab:** Inspect the failing request response body to see the exact backend error message or status code (e.g., 400 validation error vs. 500 server crash).\n2. **Server Terminal Logs:** Look at the topmost stack trace line pointing to your own code rather than library internals.\n3. **CORS & Environment Variables:** Verify that your backend allows your frontend origin and that all required \`.env\` keys are loaded.\n\nShare the exact error message or failing endpoint here, and I'll give you the exact fix directly.`,
      suggestedFollowUps: []
    };
  }

  if (query.includes('how do i secure my api keys') || query.includes('secure api') || query.includes('api key') || query.includes('secret')) {
    return {
      reply: `To secure your API keys in **${projectTitle}**, never include them in frontend code or commit them to Git. Keep your API keys in a server-side \`.env\` file and call external APIs strictly through your own backend proxy endpoint.\n\nYour frontend calls your local endpoint (like \`/api/analyze\`), and your backend reads the secret securely from \`process.env\` to make the external request. Also ensure \`.env\` is listed in your \`.gitignore\` file.`,
      suggestedFollowUps: []
    };
  }

  if (query.includes('improve') || query.includes('make it better') || query.includes('innovate')) {
    return {
      reply: `Start by adding real-time project progress tracking, stronger testing, and a clear recommendation history. For **${projectTitle}**, I'd prioritize automated testing and project-progress analytics first because they directly improve reliability and usability.\n\nNext, ensure your application handles offline states or API timeouts gracefully with friendly fallback messages instead of empty screens.`,
      suggestedFollowUps: []
    };
  }

  if (query.includes('deploy') || query.includes('hosting') || query.includes('production') || query.includes('cloud')) {
    return {
      reply: `For **${projectTitle}**, deploy your frontend to **Vercel** or **Firebase Hosting** and host your backend on **Render** or **Google Cloud Run**.\n\nFor data persistence, use a managed database like **Supabase** or **Neon PostgreSQL**. Remember to set all production environment variables directly in your hosting dashboard settings rather than committing any keys to GitHub.`,
      suggestedFollowUps: []
    };
  }

  // General direct helpful mentor guidance
  return {
    reply: `For **${projectTitle}** in the ${domain} domain, focus on keeping your architecture clean and your MVP scope tight. Build modular services with clear separation between your UI, API routes, and database models.\n\nWhat specific component or milestone are you currently working on?`,
    suggestedFollowUps: []
  };
}
