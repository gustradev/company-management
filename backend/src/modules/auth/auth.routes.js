import { Router } from "express";
import * as c from "./auth.controller.js";

const r = Router();

r.post("/register", c.register);
r.get("/verify-email", c.verifyEmail);
r.post("/login", c.login);
r.post("/forgot-password", c.forgotPassword);
r.post("/reset-password", c.resetPassword);

export default r;
