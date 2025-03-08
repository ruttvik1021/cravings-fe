"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import styles

NProgress.configure({ showSpinner: false });

export default function RouteLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
