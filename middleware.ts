import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROLE_ROUTES: Record<string, string> = {
  admin: "/admin",
  seller: "/seller",
  driver: "/driver",
  buyer: "/buyer",
  support: "/support",
};

const PROTECTED_PREFIXES = [
  ...Object.values(ROLE_ROUTES),
  "/messages",
];

function getSession(request: NextRequest): { role: string } | null {
  const cookieRole = request.cookies.get("afrimarket-role")?.value;
  if (!cookieRole) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(cookieRole)) as {
      state?: { role?: string; isAuthenticated?: boolean };
    };
    const state = parsed.state;
    if (!state?.isAuthenticated || !state.role) return null;
    return { role: state.role };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = getSession(request);

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/messages" || pathname.startsWith("/messages/")) {
    return NextResponse.next();
  }

  for (const [role, prefix] of Object.entries(ROLE_ROUTES)) {
    if (!pathname.startsWith(prefix)) continue;

    const userRole = session!.role;

    if (role === "support" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
    if (userRole !== role && !(role === "support" && userRole === "admin")) {
      const home = ROLE_ROUTES[userRole] ?? "/buyer";
      if (pathname !== home) {
        return NextResponse.redirect(new URL(home, request.url));
      }
    }
    break;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*",
    "/driver/:path*",
    "/buyer/:path*",
    "/support/:path*",
    "/messages",
    "/messages/:path*",
  ],
};
