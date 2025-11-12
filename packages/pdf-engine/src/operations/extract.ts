/**
 * PDF Extract Operation
 * Extracts specific pages from a PDF into a new document
 */

import { PDFDocument } from 'pdf-lib';
import type { ExtractOptions, PDFOperationResult } from '../types/operations';
import { validatePDFFile } from '../utils/validation';

/**
 * Extract specific pages from a PDF
 * This is similar to split but returns a single document with selected pages
 */
export async function extractPages(options: ExtractOptions): Promise<PDFOperationResult> {
  const { file, pages, onProgress } = options;

  try {
    // Validation
    await validatePDFFile(file);

    if (pages.length === 0) {
      throw new Error('No pages specified for extraction');
    }

    onProgress?.({ progress: 10, currentStep: 'Loading PDF' });

    // Load the source PDF
    const arrayBuffer = await file.arrayBuffer();
    const sourcePdf = await PDFDocument.load(arrayBuffer);
    const totalPages = sourcePdf.getPageCount();

    // Validate page numbers
    const invalidPages = pages.filter((p) => p < 1 || p > totalPages);
    if (invalidPages.length > 0) {
      throw new Error(
        `Invalid page numbers: ${invalidPages.join(', ')}. PDF has ${totalPages} pages.`
      );
    }

    onProgress?.({
      progress: 30,
      currentStep: `Extracting ${pages.length} pages`
    });

    // Create new PDF
    const newPdf = await PDFDocument.create();

    // Copy specified pages (convert 1-based to 0-based indexing)
    const pageIndices = pages.map((p) => p - 1);
    const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);

    const progressPerPage = 60 / copiedPages.length;

    copiedPages.forEach((page, index) => {
      newPdf.addPage(page);

      onProgress?.({
        progress: 30 + index * progressPerPage,
        currentStep: `Added page ${pages[index]}`,
        totalSteps: pages.length,
      });
    });

    onProgress?.({ progress: 90, currentStep: 'Saving extracted pages' });

    // Save the new PDF
    const pdfBytes = await newPdf.save();
    const resultBuffer = new Uint8Array(pdfBytes);

    onProgress?.({ progress: 100, currentStep: 'Complete' });

    return {
      success: true,
      data: resultBuffer,
      metadata: {
        pageCount: pages.length,
        fileSize: resultBuffer.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred during extraction',
    };
  }
}
