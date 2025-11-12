import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { mergePDFs } from '../services/pdf-merge.service';
import { MergeResponseSchema } from '@pdfcraft/types';

/**
 * Register PDF routes
 */
export async function pdfRoutes(fastify: FastifyInstance): Promise<void> {
  /**
   * POST /pdf/merge
   * Merge multiple PDF files into a single PDF
   */
  fastify.post('/pdf/merge', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const parts = request.parts();
      const pdfBuffers: Buffer[] = [];
      let filename = 'merged.pdf';

      for await (const part of parts) {
        if (part.type === 'file') {
          const file = part as MultipartFile;

          // Validate file type
          if (!file.mimetype.includes('pdf')) {
            return reply.code(400).send({
              success: false,
              error: `Invalid file type: ${file.mimetype}. Only PDF files are allowed.`,
              statusCode: 400,
            });
          }

          // Read file buffer
          const buffer = await file.toBuffer();
          pdfBuffers.push(buffer);
        } else if (part.type === 'field' && part.fieldname === 'filename') {
          filename = part.value as string;
        }
      }

      // Validate minimum files
      if (pdfBuffers.length < 2) {
        return reply.code(400).send({
          success: false,
          error: 'At least 2 PDF files are required',
          statusCode: 400,
        });
      }

      // Merge PDFs
      const result = await mergePDFs(pdfBuffers);

      // Send response
      void reply
        .code(200)
        .header('Content-Type', 'application/pdf')
        .header('Content-Disposition', `attachment; filename="${filename}"`)
        .send(result.buffer);
    } catch (error) {
      request.log.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      void reply.code(500).send(
        MergeResponseSchema.parse({
          success: false,
          error: errorMessage,
          message: 'Failed to merge PDFs',
        })
      );
    }
  });

  /**
   * GET /pdf/health
   * Health check endpoint
   */
  fastify.get('/pdf/health', async (_request: FastifyRequest, reply: FastifyReply) => {
    void reply.send({ status: 'ok', service: 'pdf-api' });
  });
}
