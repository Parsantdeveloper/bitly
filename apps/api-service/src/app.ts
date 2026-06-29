import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

// import rateLimit from "express-rate-limit";
// import { env } from "./config/env";
// import { logger } from "./config/logger";


export function createApp(): Application {
  const app = express();

  // ─── Trust Proxy (needed behind Nginx / load balancers) ───────────────────
  app.set("trust proxy", 1);

  // ─── Security Headers ──────────────────────────────────────────────────────
  app.use(helmet());

  // ─── CORS ──────────────────────────────────────────────────────────────────
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS!.split(","),
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // ─── Body Parsing ──────────────────────────────────────────────────────────
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // ─── Compression ──────────────────────────────────────────────────────────
  app.use(compression());

  // ─── Request Logger (dev: colorized, prod: JSON) ──────────────────────────
//   app.use(requestLogger);

  // ─── Global Rate Limiter ──────────────────────────────────────────────────
  //     Fine-grained limits (e.g. per-plan) are applied at the route level.
//   const globalLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: env.NODE_ENV === "production" ? 500 : 10_000,
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: { error: "Too many requests, please try again later." },
//   });
//   app.use(globalLimiter);

  // ─── Health Check (no auth, no rate-limit noise) ──────────────────────────
//   app.use("/health", healthRouter);

  // ─── API v1 ───────────────────────────────────────────────────────────────
//   app.use("/api/v1/auth", authRouter);
//   app.use("/api/v1/urls", urlRouter);
//   app.use("/api/v1/analytics", analyticsRouter);

  // ─── 404 handler ──────────────────────────────────────────────────────────
//   app.use(notFound);

  // ─── Global Error Handler (must be last) ──────────────────────────────────
//   app.use(errorHandler);

  return app;
}