import { NextResponse } from 'next/server';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function GET() {
  try {
    if (!r2Client) {
      return NextResponse.json({
        success: false,
        error: 'R2 client not initialized',
      });
    }

    console.log('Testing R2 connection...');
    console.log('Bucket name:', R2_CONFIG.bucketName);
    console.log('Endpoint:', `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`);

    // Try to list objects in the bucket (this is a simple test)
    const command = new ListObjectsV2Command({
      Bucket: R2_CONFIG.bucketName,
      MaxKeys: 1, // Just get 1 object to test connection
    });

    const result = await r2Client.send(command);
    
    return NextResponse.json({
      success: true,
      message: 'R2 connection successful',
      bucketName: R2_CONFIG.bucketName,
      objectCount: result.KeyCount || 0,
    });

  } catch (error: any) {
    console.error('R2 connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: {
        name: error.name,
        stack: error.stack?.split('\n')[0], // Just first line of stack
      }
    });
  }
}
