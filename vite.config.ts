/// <reference types="vitest" />
process.env.VITE_CONFIG_NATIVE_IGNORE_WARNING = 'true';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { handleGeminiApiRequest } from './src/server/geminiHandler';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'gemini-api-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/gemini')) {
            const endpoint = req.url.replace('/api/gemini/', '').split('?')[0];
            res.setHeader('Content-Type', 'application/json');

            if (req.method === 'GET' && endpoint === 'status') {
              const result = await handleGeminiApiRequest('status', {});
              res.statusCode = result.status;
              res.end(JSON.stringify(result.data));
              return;
            }

            if (req.method === 'POST') {
              const chunks: Buffer[] = [];
              req.on('data', chunk => chunks.push(Buffer.from(chunk)));
              req.on('end', async () => {
                let body = {};
                try {
                  const raw = Buffer.concat(chunks).toString('utf-8');
                  body = raw ? JSON.parse(raw) : {};
                } catch {
                  // JSON parse ignore
                }
                const result = await handleGeminiApiRequest(endpoint, body);
                res.statusCode = result.status;
                res.end(JSON.stringify(result.data));
              });
              return;
            }
          }
          next();
        });
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
});
