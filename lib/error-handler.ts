import { toast } from 'sonner';

export interface AppError {
  code: string;
  message: string;
  details?: string;
}

export class UploadError extends Error {
  code: string;
  details?: string;

  constructor(code: string, message: string, details?: string) {
    super(message);
    this.name = 'UploadError';
    this.code = code;
    this.details = details;
  }
}

export const ERROR_CODES = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER_ERROR: 'SERVER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.FILE_TOO_LARGE]: 'File size exceeds the 10MB limit',
  [ERROR_CODES.INVALID_FILE_TYPE]: 'Invalid file type. Only JPG, PNG, GIF, WEBP, and SVG files are allowed',
  [ERROR_CODES.UPLOAD_FAILED]: 'Upload failed. Please try again',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection',
  [ERROR_CODES.RATE_LIMITED]: 'Too many requests. Please wait before uploading again',
  [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later',
  [ERROR_CODES.VALIDATION_ERROR]: 'Validation error. Please check your file',
} as const;

export function handleError(error: unknown): AppError {
  console.error('Error occurred:', error);

  if (error instanceof UploadError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch')) {
      return {
        code: ERROR_CODES.NETWORK_ERROR,
        message: ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR],
        details: error.message,
      };
    }

    // Generic error
    return {
      code: ERROR_CODES.SERVER_ERROR,
      message: error.message || ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
    };
  }

  // Unknown error
  return {
    code: ERROR_CODES.SERVER_ERROR,
    message: ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
  };
}

export function showErrorToast(error: AppError | string) {
  const errorObj = typeof error === 'string' 
    ? { code: 'UNKNOWN', message: error } 
    : error;

  toast.error(errorObj.message, {
    description: errorObj.details,
    duration: 5000,
  });
}

export function showSuccessToast(message: string, description?: string) {
  toast.success(message, {
    description,
    duration: 3000,
  });
}

export function showInfoToast(message: string, description?: string) {
  toast.info(message, {
    description,
    duration: 4000,
  });
}

export function showWarningToast(message: string, description?: string) {
  toast.warning(message, {
    description,
    duration: 4000,
  });
}
