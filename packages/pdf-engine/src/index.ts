/**
 * @pdfcraft/pdf-engine
 * Client-side PDF processing engine with WebAssembly support
 *
 * PHASE 1: Pure JavaScript with pdf-lib
 * PHASE 2: Add pdf.js for rendering
 * PHASE 3: Add MuPDF/PDFium WASM for advanced features
 */

// Operations
export { mergePDFs } from './operations/merge';
export { splitPDF } from './operations/split';
export { rotatePDF } from './operations/rotate';
export { extractPages } from './operations/extract';

// Types
export type {
  PDFOperationProgress,
  PDFOperationResult,
  MergeOptions,
  SplitOptions,
  RotateOptions,
  ExtractOptions,
  CompressOptions,
  PDFMetadata,
  PDFOperation,
  WorkerMessage,
  WorkerResponse,
} from './types/operations';

// Utilities
export {
  validatePDFFile,
  validatePDFFiles,
  formatBytes,
  estimateMemoryUsage,
  checkMemoryAvailable,
  PDFValidationError,
} from './utils/validation';

/**
 * Engine version and capabilities
 */
export const ENGINE_VERSION = '0.1.0';
export const ENGINE_CAPABILITIES = {
  merge: true,
  split: true,
  rotate: true,
  extract: true,
  compress: false, // Phase 2: Requires WASM
  convert: false, // Phase 2: Requires pdf.js
  ocr: false, // Phase 4: Requires backend
};

export const ENGINE_INFO = {
  version: ENGINE_VERSION,
  phase: 1,
  backend: 'pdf-lib',
  wasm: false,
  capabilities: ENGINE_CAPABILITIES,
};
