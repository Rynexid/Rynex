import { type NextRequest, NextResponse } from "next/server";

const WEB_HOSTNAME = "rynexdev.vercel.app";
const CORE_HOSTNAMES = ["rynexdev-core.vercel.app", "localhost:3001"];

function getSessionCookie(request: NextRequest): string | undefined {
  return request.cookies.get("better-auth.session_token")?.value;
}

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const sessionToken = getSessionCookie(request);

  const isCore = CORE_HOSTNAMES.includes(hostname);

  if (isCore) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", `https://${WEB_HOSTNAME}`);
      loginUrl.searchParams.set(
        "callbackUrl",
        `https://${hostname}${request.nextUrl.pathname}`,
      );
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
