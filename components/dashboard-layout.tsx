"use client";

import type React from "react";

import {
  Bell,
  Bike,
  ChevronDown,
  History,
  LayoutDashboard,
  LogOut,
  Logs,
  Menu,
  Settings,
  SquareMenu,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
import { useAuth } from "@/lib/authContext";
import { cn, roleBaseRoutes, UserRole } from "@/lib/utils";
import { Package, Store, Users } from "lucide-react";
import ErrorMessage from "./errorMessage";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

type userTypes = Exclude<UserRole, "user">;

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: userTypes;
}

const navItems: Record<userTypes, NavItem[]> = {
  admin: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Restaurants",
      href: "/admin/restaurants",
      icon: Store,
    },
    {
      title: "Delivery Agents",
      href: "/admin/delivery-agents",
      icon: Bike,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: Package,
    },
  ],
  restaurant_owner: [
    {
      title: "Dashboard",
      href: "/restaurant/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Orders",
      href: "/restaurant/orders",
      icon: Logs,
    },
    {
      title: "Menu",
      href: "/restaurant/menu",
      icon: SquareMenu,
    },
    {
      title: "Financials",
      href: "/restaurant/financials",
      icon: Package,
    },
  ],
  delivery_agent: [
    {
      title: "Available Orders",
      href: "/delivery/orders",
      icon: Logs,
    },
    {
      title: "My Deliveries",
      href: "/delivery/my-deliveries",
      icon: Package,
    },
    {
      title: "History",
      href: "/delivery/history",
      icon: History,
    },
    {
      title: "Profile",
      href: "/delivery/profile",
      icon: User,
    },
  ],
};

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const userName = user?.name || "";
  const isAccountApproved = user?.isApproved;

  const userTypeLabel: { [K in userTypes]: string } = {
    restaurant_owner: "Restaurant Admin",
    delivery_agent: "Delivery Partner",
    admin: "Super Admin",
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen max-h-screen flex-col overflow-hidden">
      {/* Mobile Nav */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 lg:hidden shadow-sm">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 ">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold text-primary"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <span className="font-bold">Cravings</span>
              </Link>
              <div className="my-4 border-t border-honeydew/30"></div>
              {isAccountApproved ? (
                navItems[userType].map((item) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-primary",
                        pathname === item.href
                          ? "bg-honeydew/20 font-medium"
                          : "hover:bg-honeydew/10"
                      )}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  );
                })
              ) : (
                <ErrorMessage message="Account not approved to access other pages" />
              )}
              <div className="my-4 border-t border-honeydew/30"></div>
              <Button
                variant="ghost"
                className="justify-start px-3 text-primary hover:bg-honeydew/20 hover:text-primary"
                onClick={logout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold text-primary"
        >
          <span className="font-bold">Cravings</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
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
                  <AvatarImage src={user?.profilePhoto || ""} alt={userName} />
                  <AvatarFallback className="bg-berkeley-blue text-primary">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel className="text-primary">
                <p>{userName}</p>
                <sub className="text-xs font-normal text-muted-foreground">
                  {userTypeLabel[userType]}
                </sub>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-honeydew/30" />
              <DropdownMenuItem
                className="text-primary hover:bg-honeydew/20 hover:text-primary cursor-pointer"
                onClick={() =>
                  router.push(`${roleBaseRoutes[userType]}/profile`)
                }
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              {userType === "restaurant_owner" && (
                <DropdownMenuItem
                  className="text-primary hover:bg-honeydew/20 hover:text-primary cursor-pointer"
                  onClick={() => router.replace("/restaurant/setup")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              )}
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

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-honeydew/30  lg:flex">
          <div className="flex h-16 items-center border-b border-honeydew/30 px-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold text-primary"
            >
              <span className="font-bold">Cravings</span>
            </Link>{" "}
          </div>
          <nav className="grid gap-2 p-4 text-sm">
            {isAccountApproved ? (
              navItems[userType].map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:bg-honeydew/20",
                      pathname === item.href ? "bg-honeydew/20 font-medium" : ""
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                );
              })
            ) : (
              <ErrorMessage message="Account not approved to access other pages" />
            )}
          </nav>
          <div className="mt-auto p-4">
            <div className="flex items-center gap-2 rounded-lg border border-honeydew/30 p-4 bg-white">
              <Avatar className="h-8 w-8 border-2 border-honeydew">
                <AvatarImage src={user?.profilePhoto || ""} alt={userName} />
                <AvatarFallback className="bg-berkeley-blue text-primary">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-primary">
                  {userName.split(" ")[0]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {userTypeLabel[userType]}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8 text-primary hover:bg-honeydew/20"
                  >
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem
                    className="text-primary hover:bg-honeydew/20 hover:text-primary cursor-pointer"
                    onClick={() =>
                      router.push(`${roleBaseRoutes[userType]}/profile`)
                    }
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  {userType === "restaurant_owner" && (
                    <DropdownMenuItem
                      className="text-primary hover:bg-honeydew/20 hover:text-primary cursor-pointer"
                      onClick={() => router.replace("/restaurant/setup")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  )}
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto space-y-4 p-4 md:p-8 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
