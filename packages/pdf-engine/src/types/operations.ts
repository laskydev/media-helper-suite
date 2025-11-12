/**
 * PDF Engine Types
 * Types for client-side PDF operations
 */

export interface PDFOperationProgress {
  progress: number; // 0-100
  currentStep?: string;
  totalSteps?: number;
}

export interface PDFOperationResult {
  success: boolean;
  data?: Uint8Array;
  error?: string;
  metadata?: {
    pageCount?: number;
    fileSize?: number;
    duration?: number;
  };
}

export interface MergeOptions {
  files: File[];
  onProgress?: (progress: PDFOperationProgress) => void;
  filename?: string;
}

export interface SplitOptions {
  file: File;
  ranges?: Array<{ start: number; end: number }>;
  pages?: number[];
  onProgress?: (progress: PDFOperationProgress) => void;
}

export interface RotateOptions {
  file: File;
  pages: number[] | 'all';
  degrees: 90 | 180 | 270;
  onProgress?: (progress: PDFOperationProgress) => void;
}

export interface ExtractOptions {
  file: File;
  pages: number[];
  onProgress?: (progress: PDFOperationProgress) => void;
}

export interface CompressOptions {
  file: File;
  quality: 'low' | 'medium' | 'high';
  onProgress?: (progress: PDFOperationProgress) => void;
}

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
  pageCount?: number;
  fileSize?: number;
  duration?: number;
}

export type PDFOperation =
  | 'merge'
  | 'split'
  | 'rotate'
  | 'extract'
  | 'compress'
  | 'metadata';

export interface WorkerMessage {
  operation: PDFOperation;
  data: unknown;
  id?: string;
}

export interface WorkerResponse {
  type: 'progress' | 'success' | 'error';
  progress?: number;
  result?: Uint8Array;
  error?: string;
  metadata?: PDFMetadata;
  id?: string;
}
