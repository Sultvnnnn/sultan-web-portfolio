"use client";

import { useState } from "react";
import ThemeTransitionStyles from "@/components/ThemeTransitionStyles";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ScrollingTags from "@/components/ScrollingTags"; // <-- Tambahkan import ini
import TypewriterTitle from "@/components/TypewriterTitle";
import AuthorProfile from "@/components/AuthorProfile";
import ArticleContent from "@/components/ArticleContent";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ThemeTransitionStyles />
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-lora">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        <div
          className={`pt-16 transition-[margin] duration-300 ease-in-out ${
            isSidebarOpen ? "md:ml-72 ml-0" : "ml-0"
          }`}
        >
          <main className="max-w-3xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-24 w-full">
            <ScrollingTags />
            <TypewriterTitle />
            <AuthorProfile />
            <ArticleContent />
          </main>
        </div>
      </div>
    </>
  );
}
