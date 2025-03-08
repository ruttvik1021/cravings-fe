"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, LogOut, Menu, ShoppingCart, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";

export function UserLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { title: "Home", href: "/user/home" },
    { title: "My Orders", href: "/user/orders" },
    { title: "Order History", href: "/user/history" },
    { title: "Profile", href: "/user/profile" },
  ];

  return (
    <>
      {isAuthenticated && (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 shadow-sm">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-honeydew text-primary"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 ">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/user/home"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <span className="font-bold">FoodDelivery</span>
                </Link>
                <div className="my-4 border-t border-honeydew/30"></div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-primary hover:bg-honeydew/20"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            href="/user/home"
            className="flex items-center gap-2 text-lg font-semibold text-primary"
          >
            <span className="font-bold">FoodDelivery</span>
          </Link>

          <nav className="hidden md:flex gap-6 ml-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-primary hover:text-honeydew transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link href="/user/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-primary hover:bg-honeydew/20 hover:text-primary"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cerulean text-xs text-white">
                  3
                </span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-honeydew/20 hover:text-primary"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-honeydew">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-berkeley-blue text-primary">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel className="text-primary">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-honeydew/30" />
                <DropdownMenuItem asChild>
                  <Link
                    href="/user/profile"
                    className="text-primary hover:bg-honeydew/20 hover:text-primary cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/user/orders"
                    className="text-primary hover:bg-honeydew/20 hover:text-primary cursor-pointer"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-honeydew/30" />
                <DropdownMenuItem
                  className="text-primary hover:bg-honeydew/20 hover:text-primary cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      )}
      <div className={isAuthenticated ? "container mx-auto px-4 py-6" : ""}>
        {children}
      </div>
    </>
  );
}
