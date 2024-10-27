"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
