"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import MoonIcon from "@/components/icons/moon";
import SunIcon from "@/components/icons/sun";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [clientLoaded, setClientLoaded] = useState(false);

  // 💧 Fix hydration issue
  useEffect(() => {
    setClientLoaded(true); // This will only run on the client
  }, []);

  return (
    <div>
      <Button
        onClick={() => setTheme("dark")}
        variant="ghost"
        size="tiny"
        // 💧 Fix hydration issue
        className={`${
          clientLoaded && theme === "light" ? "block" : "hidden"
          } transition-opacity`}
          >
        <MoonIcon className="size-5" />
        <span className="sr-only">Switch to dark mode</span>
      </Button>

      <Button
        onClick={() => setTheme("light")}
        variant="ghost"
        size="tiny"
        // 💧 Fix hydration issue
        className={`${
          clientLoaded && theme === "dark" ? "block" : "hidden"
        } transition-opacity`}
      >
        <SunIcon className="size-5" />
        <span className="sr-only">Switch to light mode</span>
      </Button>
    </div>
  );
}
