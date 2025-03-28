import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RouteLoader from "@/components/routeLoader";
import QueryWrapper from "@/components/queryWrapper";
import { AuthProvider } from "@/lib/authContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food Delivery App",
  description: "A comprehensive food delivery platform",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryWrapper>
          <AuthProvider>
            <RouteLoader />
            <Toaster richColors />
            {children}
          </AuthProvider>
        </QueryWrapper>
      </body>
    </html>
  );
}
