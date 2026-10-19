import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/Admin';
import { loginSchema } from '@/lib/validations';
import { AUTH_COOKIE_NAME, signAdminToken } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const rate = checkRateLimit(ip, 5, 15 * 60 * 1000);

    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Too many login attempts. Try again in ${rate.retryAfterSeconds}s.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    await connectDB();
    const admin = await Admin.findOne({ email: parsed.data.email.toLowerCase() });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordValid = await bcrypt.compare(parsed.data.password, admin.passwordHash);
    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signAdminToken({
      sub: String(admin._id),
      email: admin.email,
      name: admin.name,
    });

    const res = NextResponse.json({
      message: 'Authenticated',
      admin: { name: admin.name, email: admin.email },
    });

    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}