import { type NextRequest, NextResponse } from "next/server";

const WEB_HOSTNAME = "rynexdev.vercel.app";
const CORE_HOSTNAMES = ["rynexdev-core.vercel.app", "rd-cores.vercel.app", "localhost:3001"];

function getSessionCookie(request: NextRequest): string | undefined {
  return request.cookies.get("admin.session_token")?.value;
}

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const sessionToken = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isCore = CORE_HOSTNAMES.includes(hostname);

  if (isCore) {
    const isPublicAuthPage =
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/onboarding";

    const isPublicAuthApi =
      pathname === "/api/admin/auth/login" ||
      pathname === "/api/admin/auth/register" ||
      pathname === "/api/admin/auth/session" ||
      pathname === "/api/admin/auth/logout";

    if (!sessionToken && !isPublicAuthPage && !isPublicAuthApi) {
      const loginUrl = new URL("/login", `https://${hostname}`);
      loginUrl.searchParams.set(
        "callbackUrl",
        `https://${hostname}${pathname}`,
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
