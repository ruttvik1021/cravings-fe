"use client";

import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";

// Define user types
export type UserRole = "user" | "restaurant" | "delivery" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Function to log in a user
export function loginUser(user: AuthUser, redirectPath?: string) {
  // Set the user role cookie
  setCookie("jwt", user.role, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Store user data in localStorage for client-side access
  // Note: In a real app, you'd want to use a more secure method like
  // storing minimal data and fetching details from an API when needed
  localStorage.setItem("user", JSON.stringify(user));

  // Return the redirect path based on the user's role
  return redirectPath || getDefaultPathForRole(user.role);
}

// Function to log out a user
export function logoutUser() {
  // Remove the cookies
  deleteCookie("jwt");

  // Clear localStorage
  localStorage.removeItem("user");

  // Return the login path
  return "/";
}

// Function to get the current user
export function getCurrentUser(): AuthUser | null {
  // Check if we're on the client side
  if (typeof window === "undefined") {
    return null;
  }

  // Get the user from localStorage
  const userJson = localStorage.getItem("user");
  if (!userJson) {
    return null;
  }

  try {
    return JSON.parse(userJson) as AuthUser;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

// Function to get the default path for a role
export function getDefaultPathForRole(role: UserRole): string {
  switch (role) {
    case "user":
      return "/user/home";
    case "restaurant":
      return "/restaurant/dashboard";
    case "delivery":
      return "/delivery/orders";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/user/login";
  }
}

// Custom hook for authentication
export function useAuth() {
  const router = useRouter();

  const user = getCurrentUser();

  const login = (userData: AuthUser, redirectPath?: string) => {
    const path = loginUser(userData, redirectPath);
    router.push(path);
  };

  const logout = () => {
    const path = logoutUser();
    router.push(path);
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
