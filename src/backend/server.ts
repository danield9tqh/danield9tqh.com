import { Elysia } from "elysia";

const api = new Elysia({ prefix: "/api" })
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .post("/verify-password", ({ body }: { body: { hash: number } }) => {
    const landingPassword = process.env.LANDING_PASSWORD;
    
    if (!landingPassword) {
      return { success: false, error: "Server not configured" };
    }
    
    // Convert the env variable string to a number for comparison
    const expectedHash = parseInt(landingPassword, 10);
    
    if (isNaN(expectedHash)) {
      return { success: false, error: "Invalid server configuration" };
    }
    
    return { success: body.hash === expectedHash };
  });

export default api;
