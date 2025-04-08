
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";

export default function ThemedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Only apply theme if not on landing page
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}