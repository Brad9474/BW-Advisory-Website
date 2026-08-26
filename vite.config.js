import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Runs the real Netlify Function handlers inside Vite's dev server so `npm run dev`
// behaves like production for /api/booking/* without needing `netlify dev` (which
// requires a working site link this project doesn't currently have locally).
const calcomFunctionsDevMiddleware = (env) => ({
  name: 'calcom-functions-dev-middleware',
  configureServer(server) {
    Object.assign(process.env, env);

    const wire = (path, modulePath) => {
      server.middlewares.use(path, async (req, res) => {
        try {
          const { handler } = await server.ssrLoadModule(modulePath);
          const url = new URL(req.url, 'http://localhost');
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const event = {
            httpMethod: req.method,
            queryStringParameters: Object.fromEntries(url.searchParams),
            body: chunks.length ? Buffer.concat(chunks).toString('utf8') : null,
          };
          const result = await handler(event);
          res.statusCode = result.statusCode;
          for (const [k, v] of Object.entries(result.headers || {})) res.setHeader(k, v);
          res.setHeader('Content-Type', res.getHeader('Content-Type') || 'application/json');
          res.end(result.body);
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Dev middleware error', detail: String(err) }));
        }
      });
    };

    wire('/api/booking/slots', '/netlify/functions/calcom-slots.js');
    wire('/api/booking/confirm', '/netlify/functions/calcom-bookings.js');
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), calcomFunctionsDevMiddleware(env)],
    server: {
      allowedHosts: true,
    },
  };
})
