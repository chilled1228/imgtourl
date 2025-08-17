'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, CheckCircle2, Copy, Share2, QrCode, Code, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/validations';
import { UploadHistoryManager } from '@/lib/upload-history';
import { showSuccessToast, showErrorToast, handleError } from '@/lib/error-handler';
import ShareDialog from '@/components/sharing/ShareDialog';
import { SEMANTIC_COLORS, BRAND_CLASSES } from '@/lib/brand-colors';

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
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [statusMessage, setStatusMessage] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.preview = URL.createObjectURL(file);
      return fileWithPreview;
    });
    setFiles(prev => {
      const updatedFiles = [...prev, ...newFiles];
      // Auto-upload after files are added
      setTimeout(() => {
        uploadFiles(updatedFiles);
      }, 100);
      return updatedFiles;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  // Enhanced input props with accessibility attributes
  const inputProps = {
    ...getInputProps(),
    'aria-label': 'Upload photos - drag and drop or click to choose',
    'aria-describedby': 'upload-instructions upload-formats',
    id: 'image-upload-input'
  };

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

  const copyToClipboard = async (text: string, key?: string) => {
    try {
      await navigator.clipboard.writeText(text);

      // Show visual feedback
      if (key) {
        setCopiedStates(prev => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [key]: false }));
        }, 2000);
      }

      // Announce to screen readers
      setStatusMessage('Link copied to clipboard successfully');
      setTimeout(() => setStatusMessage(''), 3000);

      showSuccessToast('Copied to clipboard!');
    } catch (error) {
      setStatusMessage('Failed to copy link to clipboard');
      setTimeout(() => setStatusMessage(''), 3000);
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

  const uploadFiles = async (filesToUpload?: FileWithPreview[]) => {
    const targetFiles = filesToUpload || files;
    if (targetFiles.length === 0) return;

    console.log('Starting upload for', targetFiles.length, 'files');
    setUploading(true);
    setUploadProgress({});

    // Announce upload start to screen readers
    setStatusMessage(`Starting upload of ${targetFiles.length} ${targetFiles.length === 1 ? 'file' : 'files'}`);
    setTimeout(() => setStatusMessage(''), 3000);

    const uploadPromises = targetFiles.map(async (file, index) => {
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
        const successMessage = `Successfully uploaded ${successful} image${successful > 1 ? 's' : ''}`;
        const failMessage = failed > 0 ? `${failed} upload${failed > 1 ? 's' : ''} failed` : undefined;

        // Announce completion to screen readers
        setStatusMessage(failMessage ? `${successMessage}. ${failMessage}` : successMessage);
        setTimeout(() => setStatusMessage(''), 5000);

        showSuccessToast(successMessage, failMessage);
      } else if (failed > 0) {
        // Announce failure to screen readers
        setStatusMessage(`All ${failed} upload${failed > 1 ? 's' : ''} failed`);
        setTimeout(() => setStatusMessage(''), 5000);
      }
    } finally {
      setUploading(false);
      // Clear files after upload
      setTimeout(() => {
        const filesToClear = filesToUpload || files;
        filesToClear.forEach(file => {
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
      {/* ARIA Live Region for Status Announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {statusMessage}
      </div>

      {/* Upload Controls */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => alert('Upload history feature coming soon!')}
          className={cn("px-4 py-2 rounded-lg transition-colors", BRAND_CLASSES.buttons.secondary)}
        >
          Image Upload History
        </button>
      </div>



      {/* Upload Zone - Redesigned for clarity */}
      <div className="relative">
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-2xl p-6 md:p-16 text-center cursor-pointer transition-all duration-300',
            'touch-manipulation min-h-[320px] md:min-h-[360px] flex items-center justify-center',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2',
            SEMANTIC_COLORS.uploadZone.container,
            isDragActive && SEMANTIC_COLORS.uploadZone.dragActive,
            uploading && 'pointer-events-none opacity-50'
          )}
          role="button"
          aria-label={isDragActive ? "Drop photos to turn into links" : "Click to upload photos or drag and drop"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              // The dropzone will handle the click
            }
          }}
        >
          <input {...inputProps} />
          <div className="space-y-6 w-full max-w-md mx-auto">
            {/* Visual Icon - Larger for mobile */}
            <div className={cn(
              "mx-auto w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center",
              SEMANTIC_COLORS.uploadZone.icon
            )}>
              <Upload className={cn("w-10 h-10 md:w-12 md:h-12", SEMANTIC_COLORS.uploadZone.iconText)} />
            </div>

            {isDragActive ? (
              <div className="space-y-2">
                <p className={cn("text-xl md:text-2xl font-bold", BRAND_CLASSES.text.accent)}>Drop your photos here!</p>
                <p className={cn("text-base", SEMANTIC_COLORS.uploadZone.subtitle)}>Let go to turn them into web links</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className={cn("text-xl md:text-2xl font-bold", SEMANTIC_COLORS.uploadZone.title)}>
                    Upload Your Photos
                  </p>
                  <p id="upload-instructions" className={cn("text-base md:text-lg", SEMANTIC_COLORS.uploadZone.subtitle)}>
                    Drag photos here or click to choose • Get web links instantly
                  </p>
                </div>

                {/* Simple format info */}
                <div id="upload-formats" className={cn("rounded-lg p-4 text-sm", SEMANTIC_COLORS.uploadZone.info)}>
                  <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-brand-orange rounded-sm" aria-hidden="true"></div>
                      <span>JPG, PNG, GIF</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-brand-blue-gray rounded-sm" aria-hidden="true"></div>
                      <span>Up to 10MB</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-brand-orange rounded-sm" aria-hidden="true"></div>
                      <span>Many photos at once</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Previews - Auto-upload UX */}
      {files.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold">
              {uploading ? 'Creating Your Links...' : 'Processing Images'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {uploading
                ? `Uploading ${files.length} image${files.length > 1 ? 's' : ''} and generating shareable links`
                : `${files.length} image${files.length > 1 ? 's' : ''} ready for upload`
              }
            </p>
            {uploading && (
              <div className="flex items-center justify-center mt-4">
                <div className="w-6 h-6 border-2 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div key={index} className={cn("relative rounded-lg p-4 space-y-3", SEMANTIC_COLORS.filePreview.container)}>
                <div className="relative">
                  <img
                    src={file.preview}
                    alt={`Preview of ${file.name.replace(/\.[^/.]+$/, "")}`}
                    className="w-full h-32 object-cover rounded-md"
                    loading="lazy"
                  />
                  {!uploading && (
                    <button
                      onClick={() => removeFile(index)}
                      aria-label={`Remove ${file.name} from upload queue`}
                      className={cn(
                        "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2",
                        SEMANTIC_COLORS.filePreview.removeButton
                      )}
                    >
                      <X className="w-3 h-3" aria-hidden="true" />
                    </button>
                  )}
                  
                  {/* Progress Overlay */}
                  {uploading && uploadProgress[file.name] !== undefined && (
                    <div
                      className={cn("absolute inset-0 rounded-md flex items-center justify-center", SEMANTIC_COLORS.filePreview.progressOverlay)}
                      role="status"
                      aria-live="polite"
                      aria-label={`Upload progress for ${file.name}`}
                    >
                      {uploadProgress[file.name] === -1 ? (
                        <div className={cn("text-center", SEMANTIC_COLORS.filePreview.errorIcon)}>
                          <X className="w-6 h-6 mx-auto mb-1" aria-hidden="true" />
                          <span className="text-xs">Failed</span>
                        </div>
                      ) : uploadProgress[file.name] === 100 ? (
                        <div className={cn("text-center", SEMANTIC_COLORS.filePreview.successIcon)}>
                          <CheckCircle2 className="w-6 h-6 mx-auto mb-1" aria-hidden="true" />
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
            <div className={cn("inline-flex items-center space-x-2 px-4 py-2 rounded-full", SEMANTIC_COLORS.results.successBadge)}>
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

          {/* Bulk Actions - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <button
              onClick={() => {
                const urls = uploadedFiles.map(f => f.url).join('\n');
                copyToClipboard(urls, 'bulk-copy');
              }}
              className={cn(
                "px-8 py-4 rounded-xl transition-all duration-200 touch-manipulation font-medium flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95 min-h-[52px]",
                copiedStates['bulk-copy']
                  ? "bg-green-500 text-white"
                  : SEMANTIC_COLORS.actions.copy
              )}
            >
              {copiedStates['bulk-copy'] ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="text-base">Copied All!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span className="text-base">Copy All Links</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                const htmlCodes = uploadedFiles.map(f => generateHtmlEmbed(f.url, f.originalName)).join('\n');
                copyToClipboard(htmlCodes, 'bulk-html');
              }}
              className={cn(
                "px-8 py-4 rounded-xl transition-all duration-200 touch-manipulation font-medium flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95 min-h-[52px]",
                copiedStates['bulk-html']
                  ? "bg-green-500 text-white"
                  : SEMANTIC_COLORS.actions.bulk
              )}
            >
              {copiedStates['bulk-html'] ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="text-base">HTML Copied!</span>
                </>
              ) : (
                <>
                  <Code className="w-5 h-5" />
                  <span className="text-base">Copy HTML Code</span>
                </>
              )}
            </button>
          </div>
          {/* Individual File Results - Simplified Cards */}
          <div className="space-y-6">
            {uploadedFiles.map((file) => (
              <div key={file.id} className={cn("rounded-2xl p-6 transition-colors", SEMANTIC_COLORS.filePreview.container)}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Preview */}
                  <div className="space-y-3">
                    <img
                      src={file.url}
                      alt={`Uploaded image: ${file.originalName.replace(/\.[^/.]+$/, "")}`}
                      className="w-full h-48 object-cover rounded-xl border"
                      loading="lazy"
                      onLoad={(e) => {
                        // Announce successful image load to screen readers
                        const img = e.target as HTMLImageElement;
                        img.setAttribute('aria-label', `Image ${file.originalName} loaded successfully`);
                      }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.setAttribute('aria-label', `Failed to load image ${file.originalName}`);
                      }}
                    />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground truncate">{file.originalName}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span>{formatFileSize(file.size)}</span>
                        {file.optimized && (
                          <span className={cn("font-medium", BRAND_CLASSES.text.accent)}>
                            ✓ Optimized
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Prominent URL Display */}
                  <div className="space-y-6">
                    {/* Success Message */}
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Link Created Successfully!</span>
                      </div>
                    </div>

                    {/* Prominent URL Field */}
                    <div className="space-y-3">
                      <label
                        htmlFor={`url-input-${file.id}`}
                        className="text-lg font-semibold text-foreground block text-center"
                      >
                        Your Shareable Link
                      </label>
                      <div className="relative">
                        <input
                          id={`url-input-${file.id}`}
                          type="text"
                          value={file.url}
                          readOnly
                          aria-label={`Shareable link for ${file.originalName}`}
                          aria-describedby={`url-description-${file.id}`}
                          className={cn(
                            "w-full px-6 py-4 border-2 rounded-2xl text-base font-mono text-center bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
                            "selection:bg-brand-orange/20"
                          )}
                          onClick={(e) => e.currentTarget.select()}
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <button
                            onClick={() => copyToClipboard(file.url, `copy-${file.id}`)}
                            aria-label={`Copy link for ${file.originalName} to clipboard`}
                            className={cn(
                              "px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-orange",
                              copiedStates[`copy-${file.id}`]
                                ? "bg-green-500 text-white"
                                : "bg-brand-orange text-white hover:bg-brand-orange/90"
                            )}
                          >
                            {copiedStates[`copy-${file.id}`] ? (
                              <span className="flex items-center space-x-1">
                                <Check className="w-4 h-4" />
                                <span className="hidden sm:inline">Copied!</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-1">
                                <Copy className="w-4 h-4" />
                                <span className="hidden sm:inline">Copy</span>
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                      <p id={`url-description-${file.id}`} className="text-sm text-muted-foreground text-center">
                        Click the input field to select all text, or use the copy button
                      </p>
                    </div>

                    {/* Simplified Actions */}
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => window.open(file.url, '_blank')}
                        aria-label={`View ${file.originalName} in new tab`}
                        className={cn(
                          "px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px]",
                          "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                        )}
                      >
                        <ImageIcon className="w-4 h-4" aria-hidden="true" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => setShareDialog({
                          isOpen: true,
                          url: file.url,
                          title: file.originalName
                        })}
                        aria-label={`Share ${file.originalName}`}
                        className={cn(
                          "px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px]",
                          "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                        )}
                      >
                        <Share2 className="w-4 h-4" aria-hidden="true" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={() => copyHtmlEmbed(file.url, file.originalName)}
                        aria-label={`Copy HTML embed code for ${file.originalName}`}
                        className={cn(
                          "px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 transform hover:scale-105 active:scale-95 min-h-[44px]",
                          "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                        )}
                      >
                        <Code className="w-4 h-4" />
                        <span>HTML</span>
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