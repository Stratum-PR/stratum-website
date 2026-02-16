#!/usr/bin/env node
/**
 * Frees port 8080 by killing the process using it (if any).
 * Exits 0 so that "npm run dev" always continues to start Vite.
 * Cross-platform: Windows (cmd) and Unix (Linux/macOS).
 */
import { execSync } from 'child_process';
import { platform } from 'os';

const PORT = 8080;
const isWin = platform() === 'win32';

function freePort() {
  try {
    if (isWin) {
      // Windows: netstat -ano | findstr :8080 → get PID from last column, then taskkill
      const out = execSync(`netstat -ano | findstr :${PORT}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
      const lines = out.trim().split(/\r?\n/).filter(Boolean);
      const pids = new Set();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && /^\d+$/.test(pid)) pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
        } catch (_) {}
      }
    } else {
      // Unix: lsof -ti:8080 | xargs kill -9 (or kill-port style)
      execSync(`lsof -ti:${PORT} | xargs kill -9 2>/dev/null || true`, { stdio: 'ignore' });
    }
  } catch (_) {
    // Port not in use or no permission - ignore, continue to start dev server
  }
}

freePort();
