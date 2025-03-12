import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthUser } from "./lib/authContext";
import { roleBaseRoutes } from "./lib/utils";
// Define role-based route access
const roleRoutes = {
  admin: [
    `${roleBaseRoutes.admin}/dashboard`,
    `${roleBaseRoutes.admin}/delivery-agents`,
    `${roleBaseRoutes.admin}/orders`,
    `${roleBaseRoutes.admin}/restaurants`,
    `${roleBaseRoutes.admin}/users`,
    `${roleBaseRoutes.admin}/unauthorised`,
  ],
  user: [
    `${roleBaseRoutes.user}/home`,
    `${roleBaseRoutes.user}/cart`,
    `${roleBaseRoutes.user}/history`,
    `${roleBaseRoutes.user}/orders`,
    `${roleBaseRoutes.user}/restaurant`,
    `${roleBaseRoutes.user}/profile`,
    `${roleBaseRoutes.user}/unauthorised`,
  ],
  delivery_agent: [
    `${roleBaseRoutes.delivery_agent}/orders`,
    `${roleBaseRoutes.delivery_agent}/profile`,
    `${roleBaseRoutes.delivery_agent}/history`,
    `${roleBaseRoutes.delivery_agent}/my-deliveries`,
    `${roleBaseRoutes.delivery_agent}/unauthorised`,
  ],
  restaurant_owner: [
    `${roleBaseRoutes.restaurant_owner}/dashboard`,
    `${roleBaseRoutes.restaurant_owner}/orders`,
    `${roleBaseRoutes.restaurant_owner}/menu`,
    `${roleBaseRoutes.restaurant_owner}/setup`,
    `${roleBaseRoutes.restaurant_owner}/financials`,
    `${roleBaseRoutes.restaurant_owner}/profile`,
    `${roleBaseRoutes.restaurant_owner}/unauthorised`,
  ],
};

// Define pages accessible for unapproved users
const allowedForUnapproved = {
  user: roleRoutes.user,
  restaurant_owner: [
    `${roleBaseRoutes.restaurant_owner}/profile`,
    `${roleBaseRoutes.restaurant_owner}/setup`,
    `${roleBaseRoutes.restaurant_owner}/unauthorised`,
  ],
  delivery_agent: [
    `${roleBaseRoutes.delivery_agent}/profile`,
    `${roleBaseRoutes.delivery_agent}/unauthorised`,
  ],
  admin: roleRoutes.admin,
};

// Define default dashboards for each role
const roleDashboards = {
  admin: `${roleBaseRoutes.admin}/dashboard`,
  user: `${roleBaseRoutes.user}/home`,
  delivery_agent: `${roleBaseRoutes.delivery_agent}/orders`,
  restaurant_owner: `${roleBaseRoutes.restaurant_owner}/dashboard`,
};

// Define login routes
const loginRoutes = Object.values(roleBaseRoutes).map(
  (base) => `${base}/login`
);

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Get JWT from cookies
  const userCookie = request.cookies.get("user")?.value; // Get user from cookies
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
    const userRole = payload.role as keyof typeof roleDashboards; // Extract user role

    // Ensure user cookie exists and parse it
    if (!userCookie) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect if user cookie is missing
    }

    const user = JSON.parse(userCookie) as AuthUser;

    // 🚨 Restrict access if user is not approved
    if (!user.isApproved) {
      const allowedRoutes = allowedForUnapproved[userRole] || [];

      // If the requested route is not in allowed routes, stop execution (user stays on the same page)
      if (!allowedRoutes.includes(requestedPath)) {
        return NextResponse.redirect(
          new URL(`${roleBaseRoutes[userRole]}/unauthorised`, request.url)
        ); // ⬅ Stops middleware execution without redirecting
      }
    }

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
