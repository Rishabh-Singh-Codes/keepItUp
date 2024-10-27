"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Moon
        className="size-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 border rounded-full p-2 hover:cursor-pointer hover:border-black"
        onClick={() => setTheme("dark")}
      />
      <Sun
        className="absolute size-10 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 border rounded-full p-2 hover:cursor-pointer hover:border-white text-white"
        onClick={() => setTheme("light")}
      />
      <span className="sr-only">Toggle theme</span>
    </>
  );
}
