import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { nanoid } from 'nanoid';
import { r2Client, R2_CONFIG } from '@/lib/r2-client';
import { validateFile, generateUniqueFileName, validateFileContent } from '@/lib/validations';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Check if R2 client is available
    if (!r2Client || !R2_CONFIG.bucketName || !R2_CONFIG.publicUrl) {
      return NextResponse.json(
        { error: 'Upload service is not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    // Rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || !file.size) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileName = generateUniqueFileName(file.name);
    const fileId = nanoid(10);

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Validate file content (security check)
    const contentValidation = await validateFileContent(buffer, file.type);
    if (!contentValidation.isValid) {
      return NextResponse.json(
        { error: contentValidation.error },
        { status: 400 }
      );
    }

    let optimizedBuffer: Buffer;
    let contentType = file.type;

    // Optimize image based on type
    try {
      if (file.type.startsWith('image/') && file.type !== 'image/svg+xml') {
        const sharpImage = sharp(buffer);
        const metadata = await sharpImage.metadata();

        // Optimize based on format
        if (file.type === 'image/png') {
          optimizedBuffer = await sharpImage
            .png({ quality: 85, compressionLevel: 8 })
            .toBuffer();
        } else if (file.type === 'image/webp') {
          optimizedBuffer = await sharpImage
            .webp({ quality: 85 })
            .toBuffer();
        } else {
          // Convert to JPEG for other formats
          optimizedBuffer = await sharpImage
            .jpeg({ quality: 85, progressive: true })
            .toBuffer();
          contentType = 'image/jpeg';
        }

        // If optimization made file larger, use original
        if (optimizedBuffer.length > buffer.length) {
          optimizedBuffer = buffer;
          contentType = file.type;
        }
      } else {
        // For SVG and other formats, use original
        optimizedBuffer = buffer;
      }
    } catch (error) {
      console.error('Image optimization error:', error);
      optimizedBuffer = buffer;
      contentType = file.type;
    }

    // Upload to Cloudflare R2
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: fileName,
      Body: optimizedBuffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000', // 1 year
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        fileId: fileId,
        optimized: optimizedBuffer.length !== buffer.length ? 'true' : 'false',
      },
    });

    await r2Client.send(command);

    // Generate URLs
    const publicUrl = `${R2_CONFIG.publicUrl}/${fileName}`;
    const response = {
      id: fileId,
      url: publicUrl,
      fileName: fileName,
      originalName: file.name,
      size: optimizedBuffer.length,
      originalSize: buffer.length,
      contentType: contentType,
      optimized: optimizedBuffer.length !== buffer.length,
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Upload error:', error);

    // Provide more specific error messages
    let errorMessage = 'Upload failed. Please try again.';

    if (error.code === 'EPROTO' || error.message?.includes('SSL')) {
      errorMessage = 'SSL connection error. Please check your Cloudflare R2 configuration.';
    } else if (error.code === 'NoSuchBucket') {
      errorMessage = 'Bucket not found. Please check your R2_BUCKET_NAME.';
    } else if (error.code === 'InvalidAccessKeyId') {
      errorMessage = 'Invalid access key. Please check your R2 credentials.';
    } else if (error.code === 'SignatureDoesNotMatch') {
      errorMessage = 'Invalid secret key. Please check your R2 credentials.';
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}

// Add CORS headers for cross-origin requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}