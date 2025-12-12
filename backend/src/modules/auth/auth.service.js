import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { sendMail } from "./auth.mailer.js";

const prisma = new PrismaClient();

const signJwt = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export async function registerUser(email, password) {
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, passwordHash: hash, isVerified: false },
  });

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  await prisma.authToken.create({
    data: {
      userId: user.id,
      type: "VERIFY_EMAIL",
      tokenHash,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  const link = `${process.env.APP_URL}/#/verify-email/${token}`;
  await sendMail({
    to: email,
    subject: "Verify your email",
    html: `<p>Click to verify:</p><a href="${link}">${link}</a>`,
  });

  return { id: user.id, email: user.email };
}

export async function verifyEmail(token) {
  const rec = await prisma.authToken.findFirst({
    where: {
      tokenHash: hashToken(token),
      type: "VERIFY_EMAIL",
      expiresAt: { gt: new Date() },
      usedAt: null,
    },
  });
  if (!rec) throw new Error("Invalid token");

  await prisma.$transaction([
    prisma.user.update({
      where: { id: rec.userId },
      data: { isVerified: true },
    }),
    prisma.authToken.update({
      where: { id: rec.id },
      data: { usedAt: new Date() },
    }),
  ]);
}

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");
  if (!user.isVerified) throw new Error("Email not verified");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  const token = signJwt({ sub: user.id, email: user.email });
  return { token };
}

export async function forgot(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  await prisma.authToken.create({
    data: {
      userId: user.id,
      type: "RESET_PASSWORD",
      tokenHash,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30),
    },
  });

  const link = `${process.env.APP_URL}/#/reset-password/${token}`;
  await sendMail({
    to: email,
    subject: "Reset password",
    html: `<p>Reset link:</p><a href="${link}">${link}</a>`,
  });
}

export async function reset(token, password) {
  const rec = await prisma.authToken.findFirst({
    where: {
      tokenHash: hashToken(token),
      type: "RESET_PASSWORD",
      expiresAt: { gt: new Date() },
      usedAt: null,
    },
  });
  if (!rec) throw new Error("Invalid token");

  const hash = await bcrypt.hash(password, 10);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: rec.userId },
      data: { passwordHash: hash },
    }),
    prisma.authToken.update({
      where: { id: rec.id },
      data: { usedAt: new Date() },
    }),
  ]);
}
