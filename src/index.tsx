import { serve } from "bun";
import index from "./frontend/index.html";
import api from "./backend/server";

const server = serve({
  routes: {
    "/api/*": async (req) => api.fetch(req),
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Listening on ${server.url}`);
