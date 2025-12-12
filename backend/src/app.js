import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./modules/auth/auth.routes.js";

export function createApp() {
  const app = express();

  /**
   * ======================================================
   * TRUST PROXY (WAJIB untuk Cloudflare / Tunnel / Nginx)
   * ======================================================
   */
  app.set("trust proxy", 1);

  /**
   * ======================
   * SECURITY HEADERS
   * ======================
   */
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  /**
   * ======================
   * CORS CONFIG (FIXED)
   * ======================
   */
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://app.gustradev.com",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        // allow server-to-server, curl, postman
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("CORS: Origin not allowed"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Explicit preflight support
  app.options("*", cors());

  /**
   * ======================
   * BODY PARSER
   * ======================
   */
  app.use(express.json({ limit: "2mb" }));

  /**
   * ======================
   * RATE LIMIT
   * ======================
   */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  /**
   * ======================
   * ROOT & HEALTH
   * ======================
   */
  app.get("/", (req, res) => {
    res.json({
      name: "Company Management API",
      status: "running",
      health: "/health",
    });
  });

  app.get("/health", (req, res) => {
    res.json({
      ok: true,
      time: new Date().toISOString(),
    });
  });

  /**
   * ======================
   * API ROUTES
   * ======================
   */
  app.use("/api/auth", authRoutes);

  /**
   * ======================
   * GLOBAL ERROR HANDLER
   * ======================
   */
  app.use((err, req, res, next) => {
    console.error("[API ERROR]", err.message);

    if (err.message.includes("CORS")) {
      return res.status(403).json({
        ok: false,
        message: "CORS blocked request",
      });
    }

    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  });

  return app;
}
