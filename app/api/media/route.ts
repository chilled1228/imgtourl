import { NextRequest, NextResponse } from 'next/server';
import { ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';

// Secure password check for local development
function checkLocalPassword(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return false;
  }
  
  const providedPassword = request.headers.get('x-media-password');
  const correctPassword = process.env.MEDIA_ADMIN_PASSWORD;
  
  if (!correctPassword) {
    console.error('MEDIA_ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  
  return providedPassword === correctPassword;
}

export async function GET(request: NextRequest) {
  // Check password for local development
  if (!checkLocalPassword(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!r2Client || !R2_CONFIG.bucketName) {
    return NextResponse.json(
      { error: 'R2 configuration missing' },
      { status: 500 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const continuationToken = searchParams.get('continuation') || undefined;
    const maxKeys = parseInt(searchParams.get('limit') || '50');

    const command = new ListObjectsV2Command({
      Bucket: R2_CONFIG.bucketName,
      MaxKeys: maxKeys,
      ContinuationToken: continuationToken,
    });

    const response = await r2Client.send(command);
    
    const files = response.Contents?.map(object => ({
      key: object.Key,
      size: object.Size,
      lastModified: object.LastModified,
      url: `${R2_CONFIG.publicUrl}/${object.Key}`,
      etag: object.ETag,
    })) || [];

    return NextResponse.json({
      files,
      isTruncated: response.IsTruncated,
      nextContinuationToken: response.NextContinuationToken,
      count: files.length,
      totalSize: files.reduce((acc, file) => acc + (file.size || 0), 0),
    });

  } catch (error: any) {
    console.error('Media list error:', error);
    return NextResponse.json(
      { error: 'Failed to list media files' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Check password for local development
  if (!checkLocalPassword(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!r2Client || !R2_CONFIG.bucketName) {
    return NextResponse.json(
      { error: 'R2 configuration missing' },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = request.nextUrl;
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { error: 'File key is required' },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
    });

    await r2Client.send(command);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
      deletedKey: key,
    });

  } catch (error: any) {
    console.error('Media delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete media file' },
      { status: 500 }
    );
  }
}
