import { z } from 'zod';

/**
 * Schema for PDF merge request
 */
export const MergeRequestSchema = z.object({
  files: z.array(z.instanceof(Buffer)).min(2, 'At least 2 PDF files are required'),
  filename: z.string().optional().default('merged.pdf'),
});

export type MergeRequest = z.infer<typeof MergeRequestSchema>;

/**
 * Schema for PDF merge response
 */
export const MergeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  filename: z.string().optional(),
  size: z.number().optional(),
  error: z.string().optional(),
});

export type MergeResponse = z.infer<typeof MergeResponseSchema>;

/**
 * Schema for API error response
 */
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  statusCode: z.number(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
