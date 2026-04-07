import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req: any) => {
  const isAuth = !!req.auth;
  const isOnboarded = req.auth?.user ? (req.auth.user as any).onboarded : false;
  
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
  const isOnboardingPage = req.nextUrl.pathname.startsWith("/onboarding");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL(isOnboarded ? "/" : "/onboarding", req.url));
    }
    return null;
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  if (isAuth && !isOnboarded && !isOnboardingPage) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }
  
  if (isAuth && isOnboarded && isOnboardingPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
