/**
 * PDF Merge Operation
 * Combines multiple PDF files into a single document
 */

import { PDFDocument } from 'pdf-lib';
import type { MergeOptions, PDFOperationResult } from '../types/operations';
import { validatePDFFiles, estimateMemoryUsage, checkMemoryAvailable } from '../utils/validation';

/**
 * Merge multiple PDF files into one
 */
export async function mergePDFs(options: MergeOptions): Promise<PDFOperationResult> {
  const startTime = performance.now();
  const { files, onProgress } = options;

  try {
    // Validation
    if (files.length < 2) {
      throw new Error('At least 2 PDF files are required for merging');
    }

    await validatePDFFiles(files);

    // Check memory
    const estimatedMemory = estimateMemoryUsage(files);
    if (!checkMemoryAvailable(estimatedMemory)) {
      throw new Error(
        'Insufficient memory available. Try with fewer or smaller files.'
      );
    }

    // Progress: 0-10%
    onProgress?.({ progress: 5, currentStep: 'Starting merge operation' });

    // Create new PDF document
    const mergedPdf = await PDFDocument.create();
    let totalPages = 0;

    // Progress: 10-90% (distributed across files)
    const progressPerFile = 80 / files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i]!;

      onProgress?.({
        progress: 10 + i * progressPerFile,
        currentStep: `Processing ${file.name}`,
        totalSteps: files.length,
      });

      // Load PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount();

      // Copy all pages
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      // Add pages to merged document
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });

      totalPages += pageCount;
    }

    // Progress: 90-95%
    onProgress?.({ progress: 92, currentStep: 'Finalizing document' });

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    const resultBuffer = new Uint8Array(mergedPdfBytes);

    // Progress: 100%
    onProgress?.({ progress: 100, currentStep: 'Complete' });

    const duration = performance.now() - startTime;

    return {
      success: true,
      data: resultBuffer,
      metadata: {
        pageCount: totalPages,
        fileSize: resultBuffer.length,
        duration: Math.round(duration),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred during merge',
    };
  }
}
