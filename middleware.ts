import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define role-based route access
const roleRoutes = {
  admin: [
    "/admin/dashboard",
    "/admin/delivery-agents",
    "/admin/orders",
    "/admin/restaurants",
    "/admin/users",
  ],
  user: [
    "/user/home",
    "/user/cart",
    "/user/history",
    "/user/orders",
    "/user/restaurant",
    "/user/profile",
  ],
  delivery: ["/delivery/orders"],
  restaurant: [
    "/restaurant/dashboard",
    "/restaurant/menu",
    "/restaurant/setup",
  ],
};

// Define default dashboards for each role
const roleDashboards = {
  admin: "/admin/dashboard",
  user: "/user/home",
  delivery: "/delivery/orders",
  restaurant: "/restaurant/dashboard",
};

// Define login routes
const loginRoutes = [
  "/admin/login",
  "/user/login",
  "/delivery/login",
  "/restaurant/login",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value; // Get JWT from cookies
  const requestedPath = request.nextUrl.pathname;

  // Allow access to login pages if no token is present
  if (!token) {
    if (loginRoutes.includes(requestedPath)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url)); // Redirect unauthenticated users to home
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const userRole = payload.role as keyof typeof roleDashboards; // Extract user role (string)

    console.log("payload", { payload, userRole });

    // Redirect base routes to default dashboards only if the user is on a dashboard base route
    if (
      requestedPath in roleDashboards &&
      requestedPath !== roleDashboards[userRole]
    ) {
      return NextResponse.redirect(
        new URL(roleDashboards[userRole], request.url)
      );
    }

    // Check if the requested route is allowed for the user's role
    const allowedRoutes = roleRoutes[userRole] || [];
    const hasAccess = allowedRoutes.some((route) =>
      requestedPath.startsWith(route)
    );

    if (!hasAccess && !loginRoutes.includes(requestedPath)) {
      // Prevent infinite redirection loops
      if (requestedPath !== roleDashboards[userRole]) {
        return NextResponse.redirect(
          new URL(roleDashboards[userRole], request.url)
        );
      }
    }

    // Redirect logged-in users from "/login" to their respective dashboard
    if (loginRoutes.includes(requestedPath)) {
      return NextResponse.redirect(
        new URL(roleDashboards[userRole], request.url)
      );
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/delivery/:path*",
    "/restaurant/:path*",
  ],
};
