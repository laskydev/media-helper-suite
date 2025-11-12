'use client';

import { useState } from 'react';
import { PDFDropzone } from '@/components/pdf-dropzone';
import { Button } from '@pdfcraft/ui';
import { mergePDFs } from '@pdfcraft/pdf-engine';

export default function MergePage(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleMerge = async (): Promise<void> => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Process PDFs client-side with progress tracking
      const result = await mergePDFs({
        files,
        onProgress: (progressInfo) => {
          setProgress(progressInfo.progress);
        },
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to merge PDFs');
      }

      // Create blob and download
      const blob = new Blob([result.data.buffer as ArrayBuffer], { type: 'application/pdf' });
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
      setProgress(0);
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
            Combine multiple PDF documents into one file - 100% client-side, private and secure
          </p>
          <p className="text-sm text-text-secondary mt-2">
            ✨ Powered by WebAssembly - Your files never leave your browser
          </p>
        </div>

        {/* Dropzone */}
        <PDFDropzone onFilesSelected={setFiles} selectedFiles={files} />

        {/* Progress Bar */}
        {isLoading && progress > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Processing...</span>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

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

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🔒 Privacy First</h3>
            <p className="text-sm text-blue-800">
              All processing happens locally in your browser. Your PDFs never leave your device,
              ensuring complete privacy and security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
