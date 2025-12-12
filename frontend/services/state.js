const KEY = "cm_auth";

export const state = {
  hydrate() {
    // dipanggil saat app bootstrap
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  isAuthed() {
    return !!this.getToken();
  },

  setAuth({ token, user }) {
    localStorage.setItem(KEY, JSON.stringify({ token, user }));
  },

  clearAuth() {
    localStorage.removeItem(KEY);
  },

  getToken() {
    return JSON.parse(localStorage.getItem(KEY) || "{}").token || null;
  },

  getUser() {
    return JSON.parse(localStorage.getItem(KEY) || "{}").user || null;
  },
};
