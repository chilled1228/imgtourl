'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, CheckCircle2, Copy, Share2, QrCode, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/validations';
import { UploadHistoryManager } from '@/lib/upload-history';
import { showSuccessToast, showErrorToast, handleError } from '@/lib/error-handler';
import ShareDialog from '@/components/sharing/ShareDialog';

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
  const [shareDialog, setShareDialog] = useState<{ isOpen: boolean; url: string; title: string } | null>(null);

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
      showSuccessToast('Copied to clipboard!');
    } catch (error) {
      showErrorToast('Failed to copy');
    }
  };

  const generateHtmlEmbed = (url: string, fileName: string) => {
    const altText = fileName.replace(/\.[^/.]+$/, ""); // Remove file extension for alt text
    return `<img src="${url}" alt="${altText}" />`;
  };

  const copyHtmlEmbed = async (url: string, fileName: string) => {
    const htmlCode = generateHtmlEmbed(url, fileName);
    await copyToClipboard(htmlCode);
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
        console.log('Upload response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          let errorMessage = 'Upload failed';
          try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const errorData = await response.json();
              console.error('Upload error response:', errorData);
              errorMessage = errorData.error || 'Upload failed';
            } else {
              const textResponse = await response.text();
              console.error('Upload error response (non-JSON):', textResponse);
              errorMessage = `Server error (${response.status}): ${textResponse.substring(0, 100)}`;
            }
          } catch (parseError) {
            console.error('Failed to parse error response:', parseError);
            errorMessage = `Upload failed with status ${response.status}`;
          }
          throw new Error(errorMessage);
        }

        let result: UploadedFile;
        try {
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text();
            console.error('Expected JSON but got:', contentType, textResponse);
            throw new Error('Server returned invalid response format');
          }
          result = await response.json();
          console.log('Upload successful:', result);
        } catch (parseError) {
          console.error('Failed to parse success response:', parseError);
          throw new Error('Upload completed but response format was invalid');
        }

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
          Image Upload History
        </button>
      </div>



      {/* Upload Zone - Redesigned for clarity */}
      <div className="relative">
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-2xl p-8 md:p-16 text-center cursor-pointer transition-all duration-300',
            'hover:border-primary/60 hover:bg-primary/5 touch-manipulation',
            'min-h-[280px] md:min-h-[320px] flex items-center justify-center',
            'border-muted-foreground/30',
            isDragActive && 'border-primary bg-primary/10 scale-[1.02] shadow-lg',
            uploading && 'pointer-events-none opacity-50'
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-6 w-full max-w-md mx-auto">
            {/* Visual Icon */}
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            {isDragActive ? (
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-bold text-primary">Drop your images here!</p>
                <p className="text-base text-muted-foreground">Release to start uploading</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-bold text-foreground">
                    Choose Your Images
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground">
                    Drag photos here or click to browse
                  </p>
                </div>

                {/* Simple format info */}
                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>JPG, PNG, GIF</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Up to 10MB</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Multiple files OK</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Previews - Improved UX */}
      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-semibold">Ready to Upload</h3>
              <p className="text-sm text-muted-foreground">
                {files.length} image{files.length > 1 ? 's' : ''} selected
              </p>
            </div>
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[52px] font-semibold text-lg"
            >
              {uploading ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Links...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Create Shareable Links</span>
                </span>
              )}
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

      {/* Uploaded Files - Improved Results Display */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">
                {uploadedFiles.length} image{uploadedFiles.length > 1 ? 's' : ''} uploaded successfully!
              </span>
            </div>
            <h3 className="text-2xl font-bold">Your Shareable Links Are Ready</h3>
            <p className="text-muted-foreground">
              Copy the links below to share your images anywhere
            </p>
          </div>

          {/* Bulk Actions - Simplified */}
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => {
                const urls = uploadedFiles.map(f => f.url).join('\n');
                copyToClipboard(urls);
              }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors touch-manipulation font-medium flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy All Links</span>
            </button>
            <button
              onClick={() => {
                const htmlCodes = uploadedFiles.map(f => generateHtmlEmbed(f.url, f.originalName)).join('\n');
                copyToClipboard(htmlCodes);
              }}
              className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors touch-manipulation font-medium flex items-center space-x-2"
            >
              <Code className="w-4 h-4" />
              <span>Copy HTML Code</span>
            </button>
          </div>
          {/* Individual File Results - Simplified Cards */}
          <div className="space-y-6">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Preview */}
                  <div className="space-y-3">
                    <img
                      src={file.url}
                      alt={file.originalName}
                      className="w-full h-48 object-cover rounded-xl border"
                    />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground truncate">{file.originalName}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span>{formatFileSize(file.size)}</span>
                        {file.optimized && (
                          <span className="text-green-600 font-medium">
                            ✓ Optimized
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions and Link */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Your shareable link:</label>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={file.url}
                          readOnly
                          className="flex-1 px-4 py-3 border rounded-xl bg-muted/50 text-sm font-mono"
                          onClick={(e) => e.currentTarget.select()}
                        />
                        <button
                          onClick={() => copyToClipboard(file.url)}
                          className="px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                          title="Copy link"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Primary Actions - Simplified */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => copyToClipboard(file.url)}
                        className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </button>
                      <button
                        onClick={() => window.open(file.url, '_blank')}
                        className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium flex items-center justify-center space-x-2"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>View Image</span>
                      </button>
                    </div>

                    {/* Secondary Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => copyHtmlEmbed(file.url, file.originalName)}
                        className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm flex items-center justify-center space-x-2"
                      >
                        <Code className="w-3 h-3" />
                        <span>Copy HTML</span>
                      </button>
                      <button
                        onClick={() => setShareDialog({
                          isOpen: true,
                          url: file.url,
                          title: file.originalName
                        })}
                        className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm flex items-center justify-center space-x-2"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Share & QR</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Dialog */}
      {shareDialog && (
        <ShareDialog
          isOpen={shareDialog.isOpen}
          onClose={() => setShareDialog(null)}
          url={shareDialog.url}
          title={shareDialog.title}
          type="image"
        />
      )}
    </div>
  );
}