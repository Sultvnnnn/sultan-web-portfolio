"use client";

import { flushSync } from "react-dom";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, Mail, X, Plus, Download, Sun, Moon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State Photo Profile
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // State Typewriter Effect
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  // Dark Mode via next-themes
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const phrases = [
    'Sultan says "Hi, welcome to my little corner of the internet."',
    "He builds things with code, not magic tricks. Vibe code counts too.",
    "I'm a data enthusiast.",
    "Also, a Software Engineer.",
  ];

  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(30); // Speed Hapus
      }, typingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(50); // Speed Ketik
      }, typingSpeed);
    }

    if (!isDeleting && displayText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500); // Delay 0.5 detik sebelum mulai ketik
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  // Fungsi Toggle Animasi
  const toggleTheme = (event: React.MouseEvent) => {
    const isCurrentlyDark = resolvedTheme === "dark";
    const nextTheme = isCurrentlyDark ? "light" : "dark";

    // fallback jika browser ga dukung View Transitions API
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    // hitung jarak terjauh dari titik klik ke sudut layar (rumus Pythagoras)
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // simpan titik klik & radius ke CSS variable, dibaca oleh @keyframes di bawah
    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);
    document.documentElement.style.setProperty(
      "--theme-radius",
      `${endRadius}px`,
    );

    // set atribut arah animasi berdasarkan style CSS
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
    <>
      {/* Global Styles untuk View Transition */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        ::view-transition-group(root) {
          animation-duration: 600ms;
        }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }

        @keyframes theme-expand {
          from {
            clip-path: circle(0px at var(--theme-x) var(--theme-y));
          }
          to {
            clip-path: circle(
              var(--theme-radius) at var(--theme-x) var(--theme-y)
            );
          }
        }
        @keyframes theme-shrink {
          from {
            clip-path: circle(
              var(--theme-radius) at var(--theme-x) var(--theme-y)
            );
          }
          to {
            clip-path: circle(0px at var(--theme-x) var(--theme-y));
          }
        }

        [data-theme-transition="expand"]::view-transition-old(root) {
          z-index: 1;
          animation: none;
        }
        [data-theme-transition="expand"]::view-transition-new(root) {
          z-index: 2;
          animation: theme-expand 600ms ease-in-out forwards;
        }
        [data-theme-transition="shrink"]::view-transition-old(root) {
          z-index: 2;
          animation: theme-shrink 600ms ease-in-out forwards;
        }
        [data-theme-transition="shrink"]::view-transition-new(root) {
          z-index: 1;
          animation: none;
        }
      `}</style>

      {/* Main Container */}
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-lora">
        {/* Navbar Start */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle Button Start */}
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
              aria-label="Toggle sidebar"
            >
              <div className="relative w-6 h-6">
                <div
                  className={`absolute inset-0 transition-all duration-300 transform ${
                    isSidebarOpen
                      ? "rotate-90 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                >
                  <Menu
                    size={24}
                    className="text-gray-700 dark:text-gray-200"
                  />
                </div>
                <div
                  className={`absolute inset-0 transition-all duration-300 transform ${
                    isSidebarOpen
                      ? "rotate-0 opacity-100"
                      : "-rotate-90 opacity-0"
                  }`}
                >
                  <X size={24} className="text-gray-700 dark:text-gray-200" />
                </div>
              </div>
            </button>
            {/* Sidebar Toggle Button End */}
            <div className="font-lora font-bold text-xl md:text-2xl tracking-tighter dark:text-white">
              Sultan.
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Dark Mode Toggle Button */}
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

            {/* Download CV Button */}
            <a
              href="/Resume.pdf"
              download
              className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full transition-colors shadow-sm"
              title="Download CV"
            >
              <Download size={16} className="shrink-0" />
              <span className="hidden md:block">Download CV</span>
            </a>

            {/* Get in Touch Button */}
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
        {/* Navbar End */}
        {/* Mobile Backdrop Overlay Start */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 md:hidden transition-opacity duration-300"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          />
        )}
        {/* Mobile Backdrop Overlay End */}
        {/* Sidebar Start */}
        <aside
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-40 overflow-hidden transition-[width] duration-300 ease-in-out ${
            isSidebarOpen ? "w-72" : "w-0"
          }`}
        >
          <div className="w-72 h-full flex flex-col p-6 overflow-y-auto">
            {/* Sidebar Header Start */}
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-8">
              <span className="font-lora font-bold text-2xl dark:text-white">
                Contact & Links
              </span>
            </div>
            {/* Sidebar Header End */}

            {/* Sidebar Links Start */}
            <ul className="space-y-6 text-gray-600 dark:text-gray-400 font-medium">
              <li>
                <a
                  href="mailto:sultan.fatahhh@gmail.com"
                  className="flex items-center gap-4 hover:text-black dark:hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Let's Talk
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/sultan-fatahhh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:text-black dark:hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Sultvnnnn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:text-black dark:hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
                  </svg>
                  GitHub Profile
                </a>
              </li>
            </ul>
            {/* Sidebar Links End */}
          </div>
        </aside>
        {/* Sidebar End */}
        {/* Main Content Wrapper Start */}
        <div
          className={`pt-16 transition-[margin] duration-300 ease-in-out ${
            isSidebarOpen ? "md:ml-72 ml-0" : "ml-0"
          }`}
        >
          {/* Article Area Start */}
          <main className="max-w-3xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-24 w-full">
            {/* Tags Start */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-6 font-sans">
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full transition-colors">
                Artificial Intelligence
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full transition-colors">
                Data Science
              </span>
            </div>
            {/* Tags End */}

            {/* Typewriter Title Start */}
            <h1 className="font-lora text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight">
              {displayText}
              {/* Kursor */}
              <span className="animate-pulse text-blue-600 dark:text-blue-400">
                |
              </span>
            </h1>
            {/* Typewriter Title End */}

            {/* Author Info Start */}
            <div className="flex items-center gap-4 mt-8 md:mt-10 mb-4 border-b border-gray-100 dark:border-gray-800 pb-6 md:pb-8 font-sans">
              {/* Photo Profile Start */}
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
              {/* Photo Profile End */}
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

                    {/* Tooltip Start */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm">
                      Connect with me!
                      {/* Segitiga panah kecil di bawah tooltip */}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></span>
                    </span>
                    {/* Tooltip End */}
                  </a>
                </div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Tangerang, Indonesia
                </div>
              </div>
            </div>
            {/* Author Info End */}

            {/* Content Body Start */}
            <article className="prose prose-base md:prose-xl dark:prose-invert font-lora text-gray-800 dark:text-gray-200 max-w-none">
              {/* Lead Paragraph Start */}
              <p className="lead text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10">
                Mahasiswa Informatika yang fokus mengembangkan keterampilan
                praktis di bidang Kecerdasan Buatan dan Sains Data untuk
                memecahkan masalah nyata dan menyiapkan karier masa depan.
              </p>
              {/* Lead Paragraph End */}

              {/* Work Experiences Section Start */}
              <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900 dark:text-white">
                Work Experiences
              </h3>
              <div className="mb-10 text-sm md:text-base">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <span className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
                    Studio Yoga meMULAi
                    <br className="hidden md:block" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium mt-1 md:mt-0 md:mb-3">
                      Software Engineer Intern
                    </p>
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-2 md:mt-0 text-left md:text-right">
                    Feb 2026 - May 2026
                    <br className="hidden md:block" />
                    <span className="md:hidden"> | </span>Jakarta, Indonesia
                    (Remote)
                  </span>
                </div>
                <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700 dark:text-gray-300 mt-4 md:mt-0">
                  <li>
                    Membangun pipeline Retrieval-Augmented Generation (RAG)
                    menggunakan Supabase dengan ekstensi pgvector,
                    mengintegrasikan vector similarity search dan full-text
                    search untuk meningkatkan akurasi pencarian data pada sistem
                    knowledge base.
                  </li>
                  <li>
                    Merancang dan mengelola struktur data pada Content
                    Management System (CMS) internal untuk menyimpan,
                    memperbarui, dan mengorganisir data Q&A berbasis embedding
                    secara dinamis.
                  </li>
                  <li>
                    Mengembangkan backend service mandiri berbasis Node.js
                    (Baileys) untuk memproses dan menyalurkan data secara
                    real-time dari WhatsApp ke sistem chatbot, termasuk logika
                    eskalasi otomatis ke staf admin.
                  </li>
                  <li>
                    Mengintegrasikan Large Language Model (LLM) Anthropic Claude
                    ke dalam arsitektur backend menggunakan prompt engineering
                    terstruktur untuk menghasilkan output data yang konsisten
                    dan aman.
                  </li>
                  <li>
                    Berkolaborasi dalam pengembangan arsitektur sistem
                    end-to-end menggunakan ekosistem Next.js dan Vercel,
                    memastikan integrasi antar komponen data berjalan lancar
                    dari sisi backend ke frontend.
                  </li>
                </ul>
              </div>
              {/* Work Experiences Section End */}

              {/* Education Section Start */}
              <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900 dark:text-white">
                Education
              </h3>
              <div className="mb-10 text-sm md:text-base">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                  <h4 className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
                    Institut Teknologi Tangerang Selatan
                  </h4>
                  <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 md:mt-0">
                    Sep 2024 - Sep 2028 (Expected)
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Bachelor of Informatics, 3.90/4.00
                </p>
              </div>
              {/* Education Section End */}

              {/* Organisational Experience Section Start */}
              <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900 dark:text-white">
                Organisational Experience
              </h3>
              <div className="mb-10 text-sm md:text-base">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h4 className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
                    Coding Camp by DBS Foundation x Dicoding Indonesia
                  </h4>
                  <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 md:mt-0">
                    Feb 2026 - Jul 2026
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                  Data Science Awardee & Capstone Data Scientist
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 md:mb-3 text-sm">
                  Program bootcamp intensif untuk mencetak talenta digital
                  melalui pembelajaran end-to-end dan proyek kolaboratif.
                </p>
                <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    Menyelesaikan bootcamp intensif Data Science dan meraih
                    sertifikat kompetensi teknis.
                  </li>
                  <li>
                    Berkolaborasi dalam tim untuk merancang sistem rekomendasi
                    berbasis kecerdasan buatan (context-aware) secara
                    end-to-end, mengeksekusi pra-pemrosesan data mentah hingga
                    pemodelan algoritma Machine Learning, dan meraih Skor Akhir
                    92.
                  </li>
                  <li>
                    Meraih skor Peer Review sempurna (100) atas kontribusi
                    teknis dan kolaborasi tim yang konsisten sepanjang proyek.
                  </li>
                </ul>
              </div>
              {/* Organisational Experience Section End */}

              {/* Skills & Projects Section Start */}
              <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900 dark:text-white">
                Skills, Projects & Achievements
              </h3>
              <div className="mb-10 text-sm md:text-base space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    DeepWell - Mental Health & Lifestyle Correlation Analysis
                    System (2026)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    Membangun pipeline data end-to-end (data wrangling,
                    cleaning, SMOTE untuk class imbalance) menggunakan Python,
                    serta men-deploy dashboard analitik interaktif ke Streamlit
                    Cloud untuk visualisasi data ke stakeholder.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    SkyBite - Weather-Based Food Recommendation System (2026)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    Merancang arsitektur client-server dengan FastAPI (backend)
                    dan Next.js (frontend) yang mengintegrasikan data cuaca
                    real-time via API eksternal, dengan waktu respons sistem di
                    bawah 300ms.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Public Perception Analysis of Christopher Nolan - IMDB 50K
                    Sentiment Analysis (2025)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    Mengolah dan membersihkan dataset IMDB 50K, menerapkan LLM
                    IBM Granite untuk klasifikasi opini, serta menyusun output
                    reproducible berupa notebook dan dokumentasi metodologi.
                  </p>
                </div>
              </div>
              {/* Skills & Projects Section End */}
            </article>
            {/* Content Body End */}
          </main>
          {/* Article Area End */}
        </div>
        {/* Main Content Wrapper End */}
      </div>
    </>
  );
}
