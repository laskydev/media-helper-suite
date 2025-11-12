'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@pdfcraft/ui';

interface PDFDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
}

export function PDFDropzone({ onFilesSelected, selectedFiles }: PDFDropzoneProps): JSX.Element {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const pdfFiles = acceptedFiles.filter((file) => file.type === 'application/pdf');
      onFilesSelected([...selectedFiles, ...pdfFiles]);
    },
    [selectedFiles, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  const removeFile = (index: number): void => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onFilesSelected(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-6xl mb-4">📄</div>
        {isDragActive ? (
          <p className="text-lg">Drop the PDF files here...</p>
        ) : (
          <>
            <p className="text-lg font-medium mb-2">Click to select or drag and drop PDF files</p>
            <p className="text-sm text-text-secondary">Upload multiple PDFs to merge them</p>
          </>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Selected Files ({selectedFiles.length})</h3>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white rounded-lg border"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-2xl">📄</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-text-secondary">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  type="button"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
