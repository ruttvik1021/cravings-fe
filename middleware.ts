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

  console.log("token", token);

  // Allow access to login pages if no token is present
  if (!token) {
    if (loginRoutes.includes(requestedPath)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const userRoles: (keyof typeof roleDashboards)[] = payload.role || []; // Extract user roles (assuming it's an array)

    // Redirect base routes to default dashboards
    const basePath = requestedPath.split("/")[1] as keyof typeof roleDashboards;
    if (roleDashboards[basePath]) {
      return NextResponse.redirect(
        new URL(roleDashboards[basePath], request.url)
      );
    }

    // Check if the requested route is allowed for the user's role
    const hasAccess = userRoles.some((role) =>
      roleRoutes[role]?.some((route) => requestedPath.startsWith(route))
    );

    if (!hasAccess) {
      // Redirect to their default dashboard if unauthorized
      const defaultDashboard = roleDashboards[userRoles[0]] || "/";
      return NextResponse.redirect(new URL(defaultDashboard, request.url));
    }

    // Redirect logged-in users from "/login" to their respective dashboard
    if (loginRoutes.includes(requestedPath)) {
      return NextResponse.redirect(
        new URL(roleDashboards[userRoles[0]], request.url)
      );
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
    // return NextResponse.redirect(new URL("/", request.url));
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
