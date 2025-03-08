import type { Metadata } from "next";
import type React from "react";
import "../../app/globals.css";
import { UserLayout } from "../../components/user-layout";

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
    <div className="min-h-screen bg-background">
      <UserLayout>{children}</UserLayout>
    </div>
  );
}
