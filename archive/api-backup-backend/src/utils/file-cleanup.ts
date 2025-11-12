import fs from 'fs/promises';
import path from 'path';

const FILE_TTL = parseInt(process.env.FILE_TTL || '1800000', 10); // 30 minutes default
const TMP_DIR = path.join(process.cwd(), 'tmp');

/**
 * Clean up temporary files older than TTL
 */
export async function cleanupOldFiles(): Promise<void> {
  try {
    const files = await fs.readdir(TMP_DIR);
    const now = Date.now();

    for (const file of files) {
      const filePath = path.join(TMP_DIR, file);
      const stats = await fs.stat(filePath);

      if (now - stats.mtimeMs > FILE_TTL) {
        await fs.unlink(filePath);
        console.log(`Cleaned up old file: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning up files:', error);
  }
}

/**
 * Initialize cleanup interval
 */
export function startCleanupInterval(intervalMs = 600000): NodeJS.Timeout {
  // Run every 10 minutes
  return setInterval(() => {
    void cleanupOldFiles();
  }, intervalMs);
}

/**
 * Ensure tmp directory exists
 */
export async function ensureTmpDir(): Promise<void> {
  try {
    await fs.access(TMP_DIR);
  } catch {
    await fs.mkdir(TMP_DIR, { recursive: true });
  }
}
