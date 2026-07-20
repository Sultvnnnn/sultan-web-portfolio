"use client";

import { flushSync } from "react-dom";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, Mail, X, Download, Sun, Moon } from "lucide-react";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = (event: React.MouseEvent) => {
    const isCurrentlyDark = resolvedTheme === "dark";
    const nextTheme = isCurrentlyDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);
    document.documentElement.style.setProperty(
      "--theme-radius",
      `${endRadius}px`,
    );
    document.documentElement.setAttribute(
      "data-theme-transition",
      isCurrentlyDark ? "shrink" : "expand",
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.finished.then(() => {
      document.documentElement.removeAttribute("data-theme-transition");
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
          aria-label="Toggle sidebar"
        >
          <div className="relative w-6 h-6">
            <div
              className={`absolute inset-0 transition-all duration-300 transform ${isSidebarOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
            >
              <Menu size={24} className="text-gray-700 dark:text-gray-200" />
            </div>
            <div
              className={`absolute inset-0 transition-all duration-300 transform ${isSidebarOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
            >
              <X size={24} className="text-gray-700 dark:text-gray-200" />
            </div>
          </div>
        </button>
        <div className="font-lora font-bold text-xl md:text-2xl tracking-tighter dark:text-white">
          Sultan.
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={toggleTheme}
          className="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
          aria-label="Toggle Dark Mode"
          title="Toggle Theme"
        >
          <Sun
            size={18}
            className="rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
          />
          <Moon
            size={18}
            className="absolute rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
          />
        </button>
        <a
          href="/Resume.pdf"
          download
          className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full transition-colors shadow-sm"
          title="Download CV"
        >
          <Download size={16} className="shrink-0" />
          <span className="hidden md:block">Download CV</span>
        </a>
        <a
          href="mailto:sultan.fatahhh@gmail.com"
          className="flex items-center justify-center gap-2 text-sm font-medium text-white dark:text-gray-900 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full transition-colors shadow-sm"
          title="Get in Touch"
        >
          <Mail size={16} className="shrink-0" />
          <span className="hidden md:block">Get in Touch</span>
        </a>
      </div>
    </nav>
  );
}
