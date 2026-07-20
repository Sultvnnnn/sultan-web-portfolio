"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AuthorProfile() {
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex items-center gap-4 mt-8 md:mt-10 mb-4 border-b border-gray-100 dark:border-gray-800 pb-6 md:pb-8 font-sans">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-400 hover:scale-105 transition-all duration-200 border-none focus:outline-none"
            onClick={() => !imageError && setIsZoomed(true)}
          >
            {!imageError ? (
              <img
                src="/Photo_Profile.webp"
                alt="Sultan Abdul Fatah"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-white font-bold text-base md:text-lg">
                SAF
              </span>
            )}
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs font-medium dark:bg-gray-800 dark:text-white"
          >
            <p>Click for details</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Overlay Foto Fullscreen */}
      <div
        className={`fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isZoomed
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsZoomed(false)}
        aria-label="Close image preview"
      >
        <div
          className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-transform duration-300 ease-out ${
            isZoomed ? "scale-100" : "scale-50"
          }`}
        >
          <img
            src="/Photo_Profile.webp"
            alt="Sultan Abdul Fatah Enlarged"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/30 text-white rounded-full transition-colors"
          onClick={() => setIsZoomed(false)}
          aria-label="Close"
        >
          <X size={28} />
        </button>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="font-lora font-bold text-gray-900 dark:text-white text-sm md:text-base">
            Sultan Abdul Fatah
          </span>
          <a
            href="https://linkedin.com/in/sultan-fatahhh"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white transition-all duration-300"
            aria-label="Connect"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm">
              Connect with me!
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></span>
            </span>
          </a>
        </div>
        <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Tangerang, Indonesia
        </div>
      </div>
    </div>
  );
}
