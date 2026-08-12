import { type NextRequest, NextResponse } from "next/server";

const WEB_HOSTNAMES = ["rynexdev.vercel.app", "localhost:3000"];
const CORE_HOSTNAMES = ["rynexdev-core.vercel.app", "rd-cores.vercel.app", "localhost:3001"];

const STAFF_ROLES = ["staff", "admin", "superAdmin"];

function getSessionCookie(request: NextRequest): string | undefined {
  return request.cookies.get("better-auth.session_token")?.value;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;
  const sessionToken = getSessionCookie(request);

  const isCore = CORE_HOSTNAMES.includes(hostname);
  const isWeb = WEB_HOSTNAMES.includes(hostname);

  if (isCore) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", `https://${WEB_HOSTNAMES[0]}`);
      loginUrl.searchParams.set(
        "callbackUrl",
        `https://${hostname}${pathname}`,
      );
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isWeb) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
