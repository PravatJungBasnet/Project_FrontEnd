import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/*export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value

  if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!token && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/signup") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} */
  export function middleware(request: NextRequest) {
    try {
      const token = request.cookies.get("access_token")?.value;
      console.log("Token:", token);
  
      if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
  
      if (!token && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/signup") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
  
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware Error:", error);
      return NextResponse.error();
    }
  }
  

