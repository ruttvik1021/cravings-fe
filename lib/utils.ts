import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserRole } from "./authContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const roleBaseRoutes: {
  [K in UserRole]: string;
} = {
  admin: "/admin",
  restaurant_owner: "/restaurant",
  delivery_agent: "/delivery",
  user: "/user",
};
