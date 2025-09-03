import { Elysia } from "elysia";

const api = new Elysia({ prefix: "/api" })
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }));

export default api;
