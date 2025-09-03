import { serve } from "bun";
import index from "./frontend/index.html";
import api from "./backend/server";

const server = serve({
  routes: {
    "/": index,
  },

  async fetch(req) {
    return api.fetch(req);
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Listening on ${server.url}`);
