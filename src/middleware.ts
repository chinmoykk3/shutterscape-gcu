import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const PROTECTED_PATHS = ["/admin"];
const PROTECTED_API_PATHS = ["/api/activities", "/api/gallery", "/api/members", "/api/upload"];
const PUBLIC_PATHS = ["/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow GET requests to public API routes
  if (
    request.method === "GET" &&
    PROTECTED_API_PATHS.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  // Check if the path needs protection
  const isProtectedPage = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isProtectedApi =
    PROTECTED_API_PATHS.some((p) => pathname.startsWith(p)) &&
    request.method !== "GET";

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // Verify JWT
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const payload = await verifyToken(token);

  if (!payload) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
