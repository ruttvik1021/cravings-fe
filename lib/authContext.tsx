"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { UserRole } from "./utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetails } from "@/app/commonAPIs";

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
  login: (accessToken: string) => void;
  logout: () => void;
  setUserData: (user: AuthUser) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  useEffect(() => {
    if (userData) {
      setUserData(userData.data);
      router.replace(
        getDefaultPathForRole("restaurant_owner", userData.data.isApproved)
      );
    }
  }, [userData]);

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
    queryClient.invalidateQueries({
      queryKey: ["userDetails"],
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

  const login = (accessToken: string) => {
    setTokenCookie(accessToken);
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
      value={{ user, login, setUserData, logout, isAuthenticated: !!user }}
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

export function getDefaultPathForRole(
  role: UserRole,
  isApproved: boolean
): string {
  switch (role) {
    case "user":
      return "/user/home";
    case "restaurant_owner":
      return isApproved ? " " : "/restaurant/setup";
    case "delivery_agent":
      return isApproved ? "/delivery/orders" : "/delivery/profile";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/";
  }
}
