import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "2mb" }));

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300
    })
  );

  app.get("/health", (req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
  });

  return app;
}
