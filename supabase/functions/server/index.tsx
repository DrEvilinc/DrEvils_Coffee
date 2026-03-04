import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods - must be before other middleware
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Health check endpoint
app.get("/make-server-d19ebccd/health", (c) => {
  return c.json({ status: "ok" });
});

// Waitlist submission endpoint
app.post("/make-server-d19ebccd/waitlist", async (c) => {
  try {
    const body = await c.req.json();
    const { email, name, phone } = body;

    // Validate required fields
    if (!email || !name) {
      return c.json({ error: "Email and name are required" }, 400);
    }

    // Create a unique key using timestamp and email
    const timestamp = new Date().toISOString();
    const key = `waitlist:${timestamp}:${email}`;

    // Store the waitlist entry
    await kv.set(key, {
      email,
      name,
      phone: phone || null,
      submittedAt: timestamp,
    });

    console.log(`Waitlist signup saved: ${email}`);

    return c.json({ 
      success: true, 
      message: "Successfully added to waitlist" 
    });
  } catch (error) {
    console.error("Error saving waitlist entry:", error);
    return c.json({ 
      error: "Failed to save waitlist entry", 
      details: error.message 
    }, 500);
  }
});

// Get all waitlist entries (for admin use)
app.get("/make-server-d19ebccd/waitlist", async (c) => {
  try {
    const entries = await kv.getByPrefix("waitlist:");
    return c.json({ 
      success: true, 
      count: entries.length,
      entries 
    });
  } catch (error) {
    console.error("Error retrieving waitlist entries:", error);
    return c.json({ 
      error: "Failed to retrieve waitlist entries", 
      details: error.message 
    }, 500);
  }
});

Deno.serve(app.fetch);