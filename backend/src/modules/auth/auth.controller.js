import * as s from "./auth.service.js";
import { registerSchema, loginSchema, forgotSchema, resetSchema } from "./auth.schema.js";

const ok = (res, data) => res.json({ ok: true, ...data });
const err = (res, e, code = 400) => res.status(code).json({ ok: false, message: e.message });

export async function register(req, res) {
  try {
    const { email, password } = registerSchema.parse(req.body);
    const user = await s.registerUser(email, password);
    ok(res, { user });
  } catch (e) { err(res, e); }
}

export async function verifyEmail(req, res) {
  try {
    await s.verifyEmail(req.query.token);
    ok(res, {});
  } catch (e) { err(res, e); }
}

export async function login(req, res) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { token } = await s.loginUser(email, password);
    ok(res, { token });
  } catch (e) { err(res, e, 401); }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = forgotSchema.parse(req.body);
    await s.forgot(email);
    ok(res, {});
  } catch (e) { err(res, e); }
}

export async function resetPassword(req, res) {
  try {
    const { token, password } = resetSchema.parse(req.body);
    await s.reset(token, password);
    ok(res, {});
  } catch (e) { err(res, e); }
}
