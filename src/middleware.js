import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/sign-up"];
const protectedRoutes = ["/dashboard"];

export async function middleware(request) {
  // Await session cookie in case it's a promise
  const sessionCookie = await getSessionCookie(request);

  const { pathname } = request.nextUrl;

  // If user is logged in and tries to access auth routes, redirect to home
  if (sessionCookie && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (
    !sessionCookie &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
