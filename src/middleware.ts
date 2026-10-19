import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const verified = token ? await verifyAdminToken(token) : null;

    if (pathname === '/admin/login') {
      if (verified) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return NextResponse.next();
    }

    if (!verified) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};