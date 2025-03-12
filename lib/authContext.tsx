"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "user" | "restaurant_owner" | "delivery_agent" | "admin";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isApproved: boolean;
  idPhoto?: string;
  profilePhoto?: string;
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
        setUser(JSON.parse(storedUser as string) as AuthUser);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  const setUserData = (user: AuthUser) => {
    setCookie("user", JSON.stringify(user), {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    setUser(user);
  };

  const setTokenCookie = (accessToken: string) => {
    setCookie("token", accessToken, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  };

  const updateApproval = (approvalStatus: boolean) => {
    if (user) {
      const updatedUser = {
        ...user,
        isApproved: approvalStatus,
      };
      setUserData(updatedUser);
    }
  };

  const login = (
    accessToken: string,
    userData: AuthUser,
    redirectPath?: string
  ) => {
    setTokenCookie(accessToken);
    setUserData(userData);
    router.replace(
      redirectPath || getDefaultPathForRole(userData.role, userData.isApproved)
    );
    // window.location.href = redirectPath || getDefaultPathForRole(userData.role);
  };

  const logout = () => {
    deleteCookie("token");
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

function getDefaultPathForRole(role: UserRole, isApproved: boolean): string {
  switch (role) {
    case "user":
      return "/user/home";
    case "restaurant_owner":
      return isApproved ? "/restaurant/dashboard" : "/restaurant/setup";
    case "delivery_agent":
      return isApproved ? "/delivery/orders" : "/delivery/profile";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/";
  }
}
