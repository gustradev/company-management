import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// src/app.js
import authRoutes from "./modules/auth/auth.routes.js";
app.use("/api/auth", authRoutes);

export function createApp() {
  const app = express();

  // ====== BASIC INFO ======
  app.get("/", (req, res) => {
    res.json({
      name: "Company Management API",
      status: "running",
      health: "/health"
    });
  });

  // ====== SECURITY ======
  app.use(helmet());

  app.use(
    cors({
      origin: [
        "http://localhost:5500",
        "https://app.gustradev.com"
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
    })
  );

  app.use(express.json({ limit: "2mb" }));

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  // ====== HEALTH CHECK ======
  app.get("/health", (req, res) => {
    res.json({
      ok: true,
      time: new Date().toISOString()
    });
  });

  return app;
}
