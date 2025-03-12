import { DashboardLayout } from "@/components/dashboard-layout";
import type { Metadata } from "next";
import type React from "react";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "A comprehensive food delivery platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout userType="restaurant_owner" userName="Restaurent Owner">
      {children}
    </DashboardLayout>
  );
}
