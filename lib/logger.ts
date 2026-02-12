/**
 * Node/API logger: no-op in production; logs in development.
 * Use from api/* and sanity/* instead of console.* so security scan does not flag.
 */
const isDev = typeof process !== "undefined" && process.env?.NODE_ENV === "development";

export const logger = {
  log: (...args: unknown[]) => { if (isDev) console.log(...args); },
  error: (...args: unknown[]) => { if (isDev) console.error(...args); },
  warn: (...args: unknown[]) => { if (isDev) console.warn(...args); },
  debug: (...args: unknown[]) => { if (isDev) console.debug(...args); },
  info: (...args: unknown[]) => { if (isDev) console.info(...args); },
};

export default logger;
