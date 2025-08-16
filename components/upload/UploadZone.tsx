'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/validations';
import { UploadHistoryManager } from '@/lib/upload-history';
import { showSuccessToast, showErrorToast, handleError } from '@/lib/error-handler';

interface UploadedFile {
  id: string;
  url: string;
  fileName: string;
  originalName: string;
  size: number;
  originalSize: number;
  contentType: string;
  optimized: boolean;
  uploadedAt: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

export default function UploadZone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [serviceStatus, setServiceStatus] = useState<'checking' | 'ready' | 'error'>('checking');

  // Check service status on mount
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => {
        if (data.r2ClientAvailable) {
          setServiceStatus('ready');
        } else {
          setServiceStatus('error');
        }
      })
      .catch(() => setServiceStatus('error'));
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.preview = URL.createObjectURL(file);
      return fileWithPreview;
    });
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const replaceFile = (index: number, newFile: File) => {
    setFiles(prev => {
      const newFiles = [...prev];
      // Clean up old preview
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      // Create new file with preview
      const fileWithPreview = newFile as FileWithPreview;
      fileWithPreview.preview = URL.createObjectURL(newFile);
      newFiles[index] = fileWithPreview;
      return newFiles;
    });
    showSuccessToast('Image resized successfully!');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessToast('URL copied to clipboard!');
    } catch (error) {
      showErrorToast('Failed to copy URL');
    }
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    console.log('Starting upload for', files.length, 'files');
    setUploading(true);
    setUploadProgress({});

    const uploadPromises = files.map(async (file, index) => {
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

      const formData = new FormData();
      formData.append('file', file);

      try {
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: Math.min((prev[file.name] || 0) + 10, 90)
          }));
        }, 100);

        console.log('Sending request to /api/upload');
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);
        console.log('Upload response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Upload error response:', errorData);
          throw new Error(errorData.error || 'Upload failed');
        }

        const result: UploadedFile = await response.json();
        console.log('Upload successful:', result);

        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 100
        }));

        setUploadedFiles(prev => [...prev, result]);

        // Add to history
        UploadHistoryManager.addToHistory(result);

        return result;
      } catch (error) {
        console.error('Upload error for file', file.name, ':', error);
        const appError = handleError(error);
        showErrorToast(appError);
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: -1 // Indicate error
        }));
        throw error;
      }
    });

    try {
      const results = await Promise.allSettled(uploadPromises);
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      if (successful > 0) {
        showSuccessToast(
          `Successfully uploaded ${successful} image${successful > 1 ? 's' : ''}`,
          failed > 0 ? `${failed} upload${failed > 1 ? 's' : ''} failed` : undefined
        );
      }
    } finally {
      setUploading(false);
      // Clear files after upload
      setTimeout(() => {
        files.forEach(file => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
        setFiles([]);
        setUploadProgress({});
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Upload Controls */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => alert('Upload history feature coming soon!')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload History
        </button>
      </div>

      {/* Service Status */}
      {serviceStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <div>
            <p className="font-medium">Upload service not configured</p>
            <p className="text-sm">Please check your Cloudflare R2 environment variables.</p>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div className="relative">
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200',
            'hover:border-primary/50 hover:bg-primary/5',
            isDragActive && 'border-primary bg-primary/10 scale-105',
            (uploading || serviceStatus !== 'ready') && 'pointer-events-none opacity-50'
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            {isDragActive ? (
              <div>
                <p className="text-xl font-semibold text-primary">Drop the files here!</p>
                <p className="text-sm text-muted-foreground">Release to upload your images</p>
              </div>
            ) : (
              <div>
                <p className="text-xl font-semibold">Upload your images</p>
                <p className="text-sm text-muted-foreground">
                  Drag & drop your files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports JPG, PNG, GIF, WEBP, SVG • Max 10MB per file
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Selected Files ({files.length})</h3>
            <button
              onClick={uploadFiles}
              disabled={uploading || serviceStatus !== 'ready'}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {serviceStatus === 'checking' ? 'Checking...' :
               serviceStatus === 'error' ? 'Service Unavailable' :
               uploading ? 'Uploading...' : 'Upload All'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative bg-card border rounded-lg p-4 space-y-3">
                <div className="relative">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  {!uploading && (
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  
                  {/* Progress Overlay */}
                  {uploading && uploadProgress[file.name] !== undefined && (
                    <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                      {uploadProgress[file.name] === -1 ? (
                        <div className="text-red-400 text-center">
                          <X className="w-6 h-6 mx-auto mb-1" />
                          <span className="text-xs">Failed</span>
                        </div>
                      ) : uploadProgress[file.name] === 100 ? (
                        <div className="text-green-400 text-center">
                          <CheckCircle2 className="w-6 h-6 mx-auto mb-1" />
                          <span className="text-xs">Complete</span>
                        </div>
                      ) : (
                        <div className="text-white text-center">
                          <div className="text-lg font-semibold">{uploadProgress[file.name] || 0}%</div>
                          <div className="text-xs">Uploading...</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="font-medium text-sm truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Uploaded Images ({uploadedFiles.length})</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const urls = uploadedFiles.map(f => f.url).join('\n');
                  copyToClipboard(urls);
                }}
                className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Copy All URLs
              </button>
              <button
                onClick={() => {
                  const data = JSON.stringify(uploadedFiles, null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `uploaded-images-${new Date().toISOString().split('T')[0]}.json`;
                  link.click();
                  URL.revokeObjectURL(url);
                  showSuccessToast('Image data exported successfully!');
                }}
                className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
              >
                Export Data
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="bg-card border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={file.url}
                      alt={file.originalName}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{file.originalName}</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Size: {formatFileSize(file.size)}</p>
                        {file.optimized && (
                          <p className="text-green-600">
                            Optimized: {formatFileSize(file.originalSize - file.size)} saved
                          </p>
                        )}
                        <p>Uploaded: {new Date(file.uploadedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Direct URL:</label>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={file.url}
                            readOnly
                            className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm"
                          />
                          <button
                            onClick={() => copyToClipboard(file.url)}
                            className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => copyToClipboard(file.url)}
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Copy URL
                        </button>
                        <button
                          onClick={() => window.open(file.url, '_blank')}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          View Image
                        </button>
                        <button
                          onClick={() => alert('QR Code feature coming soon!')}
                          className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                          QR Code
                        </button>
                        <button
                          onClick={() => alert('Share options coming soon!')}
                          className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}