import type { IncomingMessage, ServerResponse } from 'http';
import { handleGeminiApiRequest } from '../src/server/geminiHandler';

export default async function handler(
  req: IncomingMessage & { body?: Record<string, unknown>; query?: Record<string, string> },
  res: ServerResponse
) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const pathnameAction = url.pathname.replace(/^\/api\/gemini\/?/, '');
    const action = url.searchParams.get('action') || pathnameAction || '';

    let body = req.body;
    if (!body && req.method === 'POST') {
      const buffers: Buffer[] = [];
      for await (const chunk of req) {
        buffers.push(Buffer.from(chunk));
      }
      const data = Buffer.concat(buffers).toString();
      try {
        body = JSON.parse(data);
      } catch {
        body = {};
      }
    }

    const result = await handleGeminiApiRequest(action, body || {});
    res.statusCode = result.status;
    res.end(JSON.stringify(result.data));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    res.statusCode = 500;
    res.end(JSON.stringify({ error: message }));
  }
}
