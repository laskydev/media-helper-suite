/**
 * PDF Split Operation
 * Splits a PDF into multiple documents or extracts specific pages
 */

import { PDFDocument } from 'pdf-lib';
import type { SplitOptions, PDFOperationResult } from '../types/operations';
import { validatePDFFile } from '../utils/validation';

/**
 * Split a PDF into multiple documents based on ranges or pages
 */
export async function splitPDF(options: SplitOptions): Promise<PDFOperationResult[]> {
  const { file, ranges, pages, onProgress } = options;

  try {
    // Validation
    await validatePDFFile(file);

    onProgress?.({ progress: 10, currentStep: 'Loading PDF' });

    // Load the source PDF
    const arrayBuffer = await file.arrayBuffer();
    const sourcePdf = await PDFDocument.load(arrayBuffer);
    const totalPages = sourcePdf.getPageCount();

    // Determine what to split
    let splitTargets: Array<{ start: number; end: number }> = [];

    if (ranges) {
      // Use provided ranges
      splitTargets = ranges;
    } else if (pages) {
      // Create a range for each specified page
      splitTargets = pages.map((page) => ({ start: page, end: page }));
    } else {
      // Default: split into individual pages
      splitTargets = Array.from({ length: totalPages }, (_, i) => ({
        start: i + 1,
        end: i + 1,
      }));
    }

    const results: PDFOperationResult[] = [];
    const progressPerSplit = 80 / splitTargets.length;

    for (let i = 0; i < splitTargets.length; i++) {
      const { start, end } = splitTargets[i]!;

      onProgress?.({
        progress: 10 + i * progressPerSplit,
        currentStep: `Extracting pages ${start}-${end}`,
        totalSteps: splitTargets.length,
      });

      // Create new PDF for this range
      const newPdf = await PDFDocument.create();

      // Copy pages (convert 1-based to 0-based indexing)
      const pageIndices = [];
      for (let pageNum = start; pageNum <= end; pageNum++) {
        if (pageNum >= 1 && pageNum <= totalPages) {
          pageIndices.push(pageNum - 1);
        }
      }

      const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      // Save this PDF
      const pdfBytes = await newPdf.save();
      const resultBuffer = new Uint8Array(pdfBytes);

      results.push({
        success: true,
        data: resultBuffer,
        metadata: {
          pageCount: pageIndices.length,
          fileSize: resultBuffer.length,
        },
      });
    }

    onProgress?.({ progress: 100, currentStep: 'Complete' });

    return results;
  } catch (error) {
    return [
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred during split',
      },
    ];
  }
}
