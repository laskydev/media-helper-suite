/**
 * PDF Rotate Operation
 * Rotates pages in a PDF document
 */

import { PDFDocument, degrees } from 'pdf-lib';
import type { RotateOptions, PDFOperationResult } from '../types/operations';
import { validatePDFFile } from '../utils/validation';

/**
 * Rotate specific pages or all pages in a PDF
 */
export async function rotatePDF(options: RotateOptions): Promise<PDFOperationResult> {
  const { file, pages, degrees: rotateDegrees, onProgress } = options;

  try {
    // Validation
    await validatePDFFile(file);

    onProgress?.({ progress: 10, currentStep: 'Loading PDF' });

    // Load the PDF
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();

    // Determine which pages to rotate
    const pagesToRotate = pages === 'all'
      ? Array.from({ length: totalPages }, (_, i) => i)
      : pages.map((p) => p - 1); // Convert to 0-based indexing

    onProgress?.({
      progress: 30,
      currentStep: `Rotating ${pagesToRotate.length} pages`
    });

    // Rotate each specified page
    const progressPerPage = 60 / pagesToRotate.length;

    for (let i = 0; i < pagesToRotate.length; i++) {
      const pageIndex = pagesToRotate[i]!;

      if (pageIndex >= 0 && pageIndex < totalPages) {
        const page = pdfDoc.getPage(pageIndex);
        page.setRotation(degrees(rotateDegrees));

        onProgress?.({
          progress: 30 + i * progressPerPage,
          currentStep: `Rotated page ${pageIndex + 1}`,
          totalSteps: pagesToRotate.length,
        });
      }
    }

    onProgress?.({ progress: 90, currentStep: 'Saving rotated PDF' });

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    const resultBuffer = new Uint8Array(pdfBytes);

    onProgress?.({ progress: 100, currentStep: 'Complete' });

    return {
      success: true,
      data: resultBuffer,
      metadata: {
        pageCount: totalPages,
        fileSize: resultBuffer.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred during rotation',
    };
  }
}
