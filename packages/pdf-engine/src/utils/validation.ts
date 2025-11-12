/**
 * PDF Validation Utilities
 */

const PDF_SIGNATURE = '%PDF-';
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB default
const MIN_FILE_SIZE = 100; // 100 bytes

export class PDFValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PDFValidationError';
  }
}

/**
 * Validate if a file is a valid PDF
 */
export async function validatePDFFile(file: File): Promise<void> {
  // Check file type
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new PDFValidationError(
      `Invalid file type: ${file.type}. Only PDF files are supported.`
    );
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    throw new PDFValidationError(
      `File size ${formatBytes(file.size)} exceeds maximum allowed size of ${formatBytes(MAX_FILE_SIZE)}`
    );
  }

  if (file.size < MIN_FILE_SIZE) {
    throw new PDFValidationError(`File is too small to be a valid PDF`);
  }

  // Check PDF signature (first 5 bytes should be "%PDF-")
  const header = await readFileHeader(file, 5);
  const headerText = new TextDecoder().decode(header);

  if (!headerText.startsWith(PDF_SIGNATURE)) {
    throw new PDFValidationError(
      'File does not appear to be a valid PDF (invalid header signature)'
    );
  }
}

/**
 * Validate multiple PDF files
 */
export async function validatePDFFiles(files: File[]): Promise<void> {
  if (files.length === 0) {
    throw new PDFValidationError('No files provided');
  }

  const errors: string[] = [];

  for (let i = 0; i < files.length; i++) {
    try {
      await validatePDFFile(files[i]!);
    } catch (error) {
      if (error instanceof PDFValidationError) {
        errors.push(`File ${i + 1} (${files[i]!.name}): ${error.message}`);
      } else {
        errors.push(`File ${i + 1} (${files[i]!.name}): Unknown error`);
      }
    }
  }

  if (errors.length > 0) {
    throw new PDFValidationError(`Validation failed:\n${errors.join('\n')}`);
  }
}

/**
 * Read the first N bytes of a file
 */
async function readFileHeader(file: File, bytes: number): Promise<Uint8Array> {
  const slice = file.slice(0, bytes);
  const buffer = await slice.arrayBuffer();
  return new Uint8Array(buffer);
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

/**
 * Estimate memory required for operation
 */
export function estimateMemoryUsage(files: File[]): number {
  // Rough estimate: 3x the file size (input + intermediate + output)
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  return totalSize * 3;
}

/**
 * Check if browser has enough memory for operation
 */
export function checkMemoryAvailable(requiredBytes: number): boolean {
  // Check if performance.memory is available (Chrome only)
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    const availableMemory = memory.jsHeapSizeLimit - memory.usedJSHeapSize;
    return availableMemory > requiredBytes;
  }

  // Fallback: assume we have enough memory if < 500MB required
  return requiredBytes < 500 * 1024 * 1024;
}
