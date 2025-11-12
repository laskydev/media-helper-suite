import { FastifyRequest, FastifyReply } from 'fastify';

const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '52428800', 10); // 50MB default

export async function fileSizeLimitMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const contentLength = request.headers['content-length'];

  if (contentLength && parseInt(contentLength, 10) > MAX_FILE_SIZE) {
    void reply.code(413).send({
      success: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE} bytes`,
      statusCode: 413,
    });
  }
}
