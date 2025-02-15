import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

interface ResourceUploadProps {
  onUpload: (file: File) => void;
}

export default function ResourceUpload({ onUpload }: ResourceUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the file here...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Drag & drop a resource file here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: PDF, DOC, DOCX
            </p>
          </div>
        )}
      </div>

      {acceptedFiles.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Selected File:</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {acceptedFiles[0].name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                acceptedFiles.splice(0, acceptedFiles.length);
              }}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}