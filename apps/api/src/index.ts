import dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { pdfRoutes } from './routes/pdf.routes';
import { fileSizeLimitMiddleware } from './middleware/file-size-limit';
import { ensureTmpDir, startCleanupInterval } from './utils/file-cleanup';

// Load environment variables
dotenv.config();

const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
});

/**
 * Initialize and start the server
 */
async function start(): Promise<void> {
  try {
    // Ensure tmp directory exists
    await ensureTmpDir();

    // Start file cleanup interval
    startCleanupInterval();

    // Register CORS
    await fastify.register(cors, {
      origin: CORS_ORIGIN,
      credentials: true,
    });

    // Register multipart for file uploads
    await fastify.register(multipart, {
      limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800', 10),
      },
    });

    // Register file size limit middleware
    fastify.addHook('preHandler', fileSizeLimitMiddleware);

    // Register routes
    await fastify.register(pdfRoutes);

    // Health check
    fastify.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    // Start server
    await fastify.listen({ port: PORT, host: HOST });
    fastify.log.info(`Server listening on http://${HOST}:${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

// Handle graceful shutdown
const signals = ['SIGINT', 'SIGTERM'] as const;
signals.forEach((signal) => {
  process.on(signal, async () => {
    fastify.log.info(`Received ${signal}, closing server...`);
    await fastify.close();
    process.exit(0);
  });
});

// Start the server
void start();
