"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "restaurant" | "delivery" | "admin";
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user) {
      router.push("/user/login");
      return;
    }

    // If a specific role is required and the user doesn't have it, redirect
    if (requiredRole && user.role !== requiredRole) {
      // Redirect to the appropriate dashboard based on their role
      switch (user.role) {
        case "user":
          router.push("/user/home");
          break;
        case "restaurant":
          router.push("/restaurant/dashboard");
          break;
        case "delivery":
          router.push("/delivery/orders");
          break;
        case "admin":
          router.push("/admin/dashboard");
          break;
        default:
          router.push("/user/login");
      }
    }
  }, [user, requiredRole, router]);

  // If no user or wrong role, don't render the children
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">
            Please wait while we verify your access.
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated and has the required role, render the children
  return <>{children}</>;
}
