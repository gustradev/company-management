const KEY = "cm_state_v1";

export const state = {
  data: {
    auth: {
      token: null,
      user: null,
    },
  },

  hydrate() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.auth) this.data.auth = parsed.auth;
    } catch (e) {
      console.warn("State hydrate failed:", e);
    }
  },

  persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("State persist failed:", e);
    }
  },

  isAuthed() {
    return Boolean(this.data.auth.token);
  },

  setAuth({ token, user }) {
    this.data.auth.token = token || null;
    this.data.auth.user = user || null;
    this.persist();
  },

  clearAuth() {
    this.data.auth.token = null;
    this.data.auth.user = null;
    this.persist();
  },

  getToken() {
    return this.data.auth.token;
  },

  getUser() {
    return this.data.auth.user;
  },
};
