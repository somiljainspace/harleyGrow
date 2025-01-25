import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // If no token, redirect to login
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  // Role-based access
  const role = token.user.role;
  const path = req.nextUrl.pathname;

  if (path.startsWith("/admin") && role !== "Admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/editor") && !["Admin", "Editor"].includes(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/editor/:path*", "/viewer/:path*"],
};
