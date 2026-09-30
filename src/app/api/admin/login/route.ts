import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createToken, getAdminCredentials } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const attempts = loginAttempts.get(ip);

    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
      if (timeSinceLastAttempt < LOCKOUT_TIME) {
        return NextResponse.json(
          { error: 'Too many login attempts. Please try again later.' },
          { status: 429 }
        );
      } else {
        loginAttempts.delete(ip);
      }
    }

    const adminCreds = getAdminCredentials();

    if (validatedData.email !== adminCreds.email) {
      if (!attempts) {
        loginAttempts.set(ip, { count: 1, lastAttempt: Date.now() });
      } else {
        loginAttempts.set(ip, { count: attempts.count + 1, lastAttempt: Date.now() });
      }
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(validatedData.password, adminCreds.password);

    if (!isValidPassword) {
      if (!attempts) {
        loginAttempts.set(ip, { count: 1, lastAttempt: Date.now() });
      } else {
        loginAttempts.set(ip, { count: attempts.count + 1, lastAttempt: Date.now() });
      }
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    loginAttempts.delete(ip);

    const token = await createToken(adminCreds.email);

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
