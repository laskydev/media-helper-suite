/**
 * PDF Worker
 * Processes PDF operations in a Web Worker to avoid blocking the main thread
 */

import { mergePDFs } from '../operations/merge';
import { splitPDF } from '../operations/split';
import { rotatePDF } from '../operations/rotate';
import { extractPages } from '../operations/extract';
import type { WorkerMessage, WorkerResponse } from '../types/operations';

// Worker message handler
self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { operation, data, id } = e.data;

  try {
    switch (operation) {
      case 'merge': {
        const result = await mergePDFs({
          ...(data as any),
          onProgress: (progress) => {
            const response: WorkerResponse = {
              type: 'progress',
              progress: progress.progress,
              id,
            };
            self.postMessage(response);
          },
        });

        const response: WorkerResponse = {
          type: result.success ? 'success' : 'error',
          result: result.data,
          error: result.error,
          metadata: result.metadata,
          id,
        };
        self.postMessage(response);
        break;
      }

      case 'split': {
        const results = await splitPDF({
          ...(data as any),
          onProgress: (progress) => {
            const response: WorkerResponse = {
              type: 'progress',
              progress: progress.progress,
              id,
            };
            self.postMessage(response);
          },
        });

        // For split, we return the first result (or error)
        const result = results[0]!;
        const response: WorkerResponse = {
          type: result.success ? 'success' : 'error',
          result: result.data,
          error: result.error,
          metadata: result.metadata,
          id,
        };
        self.postMessage(response);
        break;
      }

      case 'rotate': {
        const result = await rotatePDF({
          ...(data as any),
          onProgress: (progress) => {
            const response: WorkerResponse = {
              type: 'progress',
              progress: progress.progress,
              id,
            };
            self.postMessage(response);
          },
        });

        const response: WorkerResponse = {
          type: result.success ? 'success' : 'error',
          result: result.data,
          error: result.error,
          metadata: result.metadata,
          id,
        };
        self.postMessage(response);
        break;
      }

      case 'extract': {
        const result = await extractPages({
          ...(data as any),
          onProgress: (progress) => {
            const response: WorkerResponse = {
              type: 'progress',
              progress: progress.progress,
              id,
            };
            self.postMessage(response);
          },
        });

        const response: WorkerResponse = {
          type: result.success ? 'success' : 'error',
          result: result.data,
          error: result.error,
          metadata: result.metadata,
          id,
        };
        self.postMessage(response);
        break;
      }

      default: {
        const response: WorkerResponse = {
          type: 'error',
          error: `Unknown operation: ${operation}`,
          id,
        };
        self.postMessage(response);
      }
    }
  } catch (error) {
    const response: WorkerResponse = {
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      id,
    };
    self.postMessage(response);
  }
};

// Notify that worker is ready
self.postMessage({ type: 'ready' });
