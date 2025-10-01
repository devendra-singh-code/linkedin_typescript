import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  // console.log("middleware tokeen", token)
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/register") ||
      url.pathname.startsWith("/forget-password") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (!token && url.pathname === "/") {
  //   return NextResponse.redirect(new URL("login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/register", "/login", "/", '/dashboard'],
};
