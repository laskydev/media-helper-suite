import { PDFDocument } from 'pdf-lib';

export interface MergePDFResult {
  buffer: Buffer;
  pageCount: number;
  size: number;
}

/**
 * Merge multiple PDF files into a single PDF
 * @param pdfBuffers Array of PDF file buffers to merge
 * @returns Merged PDF buffer and metadata
 */
export async function mergePDFs(pdfBuffers: Buffer[]): Promise<MergePDFResult> {
  if (pdfBuffers.length < 2) {
    throw new Error('At least 2 PDF files are required for merging');
  }

  // Create a new PDF document
  const mergedPdf = await PDFDocument.create();

  let totalPages = 0;

  // Iterate through each PDF buffer
  for (const pdfBuffer of pdfBuffers) {
    try {
      // Load the PDF
      const pdf = await PDFDocument.load(pdfBuffer);
      const pageCount = pdf.getPageCount();

      // Copy all pages from the current PDF to the merged PDF
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      // Add each copied page to the merged document
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });

      totalPages += pageCount;
    } catch (error) {
      throw new Error(
        `Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // Save the merged PDF
  const mergedPdfBytes = await mergedPdf.save();
  const buffer = Buffer.from(mergedPdfBytes);

  return {
    buffer,
    pageCount: totalPages,
    size: buffer.length,
  };
}
