export type VisitorContext = {
  city?: string | null;
  country?: string | null;
};

const SESSION_KEY = "ossema:session-id";
const VISITOR_CONTEXT_KEY = "ossema:visitor-context";

export const getSessionId = () => {
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const created = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(SESSION_KEY, created);
  return created;
};

export const getVisitorContext = (): VisitorContext => {
  try {
    const raw = window.sessionStorage.getItem(VISITOR_CONTEXT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const setVisitorContext = (value: VisitorContext) => {
  window.sessionStorage.setItem(VISITOR_CONTEXT_KEY, JSON.stringify(value));
};
