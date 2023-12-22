import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    token &&
    (publicRoutes.includes(request.nextUrl.pathname) ||
      request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  } else {
    return NextResponse.next();
  }
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
    "/",
  ],
};
