import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DashboardLayout } from "@/components/dashboard-layout";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <DashboardLayout userType="delivery" userName="Delivery Agent">
      {children}
    </DashboardLayout>
  );
}
