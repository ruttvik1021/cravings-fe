"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "user" | "restaurant" | "delivery" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextProps {
  user: AuthUser | null;
  login: (accessToken: string, user: AuthUser, redirectPath?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getCookie("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser as string));
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  const login = (
    accessToken: string,
    userData: AuthUser,
    redirectPath?: string
  ) => {
    setCookie("token", accessToken, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    setCookie("user", JSON.stringify(userData), {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    setUser(userData);
    router.replace(redirectPath || getDefaultPathForRole(userData.role));
    // window.location.href = redirectPath || getDefaultPathForRole(userData.role);
  };

  const logout = () => {
    deleteCookie("jwt");
    deleteCookie("user");
    setUser(null);
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function getDefaultPathForRole(role: UserRole): string {
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
      return "/";
  }
}
