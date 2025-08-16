import { NextResponse } from 'next/server';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';

export async function GET() {
  return NextResponse.json({
    status: 'OK',
    r2ClientAvailable: !!r2Client,
    config: {
      bucketName: R2_CONFIG.bucketName ? '✓ Set' : '✗ Missing',
      publicUrl: R2_CONFIG.publicUrl ? '✓ Set' : '✗ Missing',
      maxFileSize: R2_CONFIG.maxFileSize,
      allowedTypes: R2_CONFIG.allowedTypes,
    },
    environment: {
      R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID ? '✓ Set' : '✗ Missing',
      R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID ? '✓ Set' : '✗ Missing',
      R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY ? '✓ Set' : '✗ Missing',
      R2_BUCKET_NAME: process.env.R2_BUCKET_NAME ? '✓ Set' : '✗ Missing',
      R2_PUBLIC_URL: process.env.R2_PUBLIC_URL ? '✓ Set' : '✗ Missing',
    }
  });
}
