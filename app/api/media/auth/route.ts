import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Media management not available in production' },
      { status: 403 }
    );
  }

  try {
    const { password } = await request.json();
    const correctPassword = process.env.MEDIA_ADMIN_PASSWORD;
    
    if (!correctPassword) {
      console.error('MEDIA_ADMIN_PASSWORD not set in environment variables');
      return NextResponse.json(
        { error: 'Media management not configured' },
        { status: 500 }
      );
    }
    
    if (password === correctPassword) {
      return NextResponse.json({ 
        success: true, 
        message: 'Authentication successful' 
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
