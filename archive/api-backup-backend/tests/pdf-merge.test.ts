import { describe, it, expect } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import { mergePDFs } from '../src/services/pdf-merge.service';

/**
 * Create a simple test PDF buffer
 */
async function createTestPDF(pageCount = 1): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < pageCount; i++) {
    pdfDoc.addPage([595, 842]); // A4 size
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

describe('PDF Merge Service', () => {
  it('should merge two PDFs successfully', async () => {
    const pdf1 = await createTestPDF(2);
    const pdf2 = await createTestPDF(3);

    const result = await mergePDFs([pdf1, pdf2]);

    expect(result).toBeDefined();
    expect(result.pageCount).toBe(5);
    expect(result.buffer).toBeInstanceOf(Buffer);
    expect(result.size).toBeGreaterThan(0);

    // Verify the merged PDF is valid
    const mergedDoc = await PDFDocument.load(result.buffer);
    expect(mergedDoc.getPageCount()).toBe(5);
  });

  it('should merge multiple PDFs', async () => {
    const pdf1 = await createTestPDF(1);
    const pdf2 = await createTestPDF(2);
    const pdf3 = await createTestPDF(3);

    const result = await mergePDFs([pdf1, pdf2, pdf3]);

    expect(result.pageCount).toBe(6);

    const mergedDoc = await PDFDocument.load(result.buffer);
    expect(mergedDoc.getPageCount()).toBe(6);
  });

  it('should throw error with less than 2 PDFs', async () => {
    const pdf1 = await createTestPDF(1);

    await expect(mergePDFs([pdf1])).rejects.toThrow('At least 2 PDF files are required');
  });

  it('should throw error with invalid PDF', async () => {
    const invalidPdf = Buffer.from('not a pdf');
    const validPdf = await createTestPDF(1);

    await expect(mergePDFs([invalidPdf, validPdf])).rejects.toThrow();
  });

  it('should handle PDFs with different page sizes', async () => {
    const pdfDoc1 = await PDFDocument.create();
    pdfDoc1.addPage([595, 842]); // A4
    const pdf1 = Buffer.from(await pdfDoc1.save());

    const pdfDoc2 = await PDFDocument.create();
    pdfDoc2.addPage([612, 792]); // Letter
    const pdf2 = Buffer.from(await pdfDoc2.save());

    const result = await mergePDFs([pdf1, pdf2]);

    expect(result.pageCount).toBe(2);

    const mergedDoc = await PDFDocument.load(result.buffer);
    expect(mergedDoc.getPageCount()).toBe(2);
  });
});
