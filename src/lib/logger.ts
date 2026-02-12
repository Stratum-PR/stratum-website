/**
 * Central logger: no-op in production to avoid leaking info; logs in development.
 * Use this instead of console.* so security scan does not flag production code.
 * Works in Vite (import.meta.env.DEV) and Node/API (process.env.NODE_ENV).
 */
function isDev(): boolean {
  if (typeof import.meta !== "undefined" && (import.meta as { env?: { DEV?: boolean } }).env?.DEV === true) return true;
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") return true;
  return false;
}

export const logger = {
  log: (...args: unknown[]) => { if (isDev()) console.log(...args); },
  error: (...args: unknown[]) => { if (isDev()) console.error(...args); },
  warn: (...args: unknown[]) => { if (isDev()) console.warn(...args); },
  debug: (...args: unknown[]) => { if (isDev()) console.debug(...args); },
  info: (...args: unknown[]) => { if (isDev()) console.info(...args); },
};

export default logger;
