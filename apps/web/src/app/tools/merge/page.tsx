'use client';

import { useState } from 'react';
import { PDFDropzone } from '@/components/pdf-dropzone';
import { Button } from '@pdfcraft/ui';

export default function MergePage(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMerge = async (): Promise<void> => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/pdf/merge`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error || 'Failed to merge PDFs');
      }

      // Download the merged PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Reset state
      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while merging PDFs');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Merge PDF Files</h1>
          <p className="text-lg text-text-secondary">
            Combine multiple PDF documents into one file
          </p>
        </div>

        {/* Dropzone */}
        <PDFDropzone onFilesSelected={setFiles} selectedFiles={files} />

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Merge Button */}
        {files.length >= 2 && (
          <div className="mt-8 text-center">
            <Button size="lg" onClick={() => void handleMerge()} disabled={isLoading}>
              {isLoading ? 'Merging...' : `Merge ${files.length} PDFs`}
            </Button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-white p-6 rounded-lg border">
          <h2 className="font-semibold mb-4">How to merge PDF files:</h2>
          <ol className="list-decimal list-inside space-y-2 text-text-secondary">
            <li>Click the upload area or drag and drop your PDF files</li>
            <li>Select at least 2 PDF files you want to merge</li>
            <li>The files will be merged in the order they appear</li>
            <li>Click the Merge button to combine them</li>
            <li>Download your merged PDF file</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
