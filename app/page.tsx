"use client";

import { useState, useEffect } from "react";
import { Menu, Mail, X, Plus, Download } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-white text-gray-900 font-lora">
      {/* Navbar Start */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button Start */}
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors relative"
            aria-label="Toggle sidebar"
          >
            <div className="relative w-6 h-6">
              <div
                className={`absolute inset-0 transition-all duration-300 transform ${
                  isSidebarOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              >
                <Menu size={24} className="text-gray-700" />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-300 transform ${
                  isSidebarOpen
                    ? "rotate-0 opacity-100"
                    : "-rotate-90 opacity-0"
                }`}
              >
                <X size={24} className="text-gray-700" />
              </div>
            </div>
          </button>
          {/* Sidebar Toggle Button End */}
          <div className="font-lora font-bold text-xl md:text-2xl tracking-tighter">
            Sultan.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Download CV Button */}
          <a
            href="/Resume.pdf"
            download
            className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full transition-colors shadow-sm"
            title="Download CV"
          >
            <Download size={16} className="shrink-0" />
            <span className="hidden md:block">Download CV</span>
          </a>

          {/* Get in Touch Button */}
          <a
            href="mailto:sultan.fatahhh@gmail.com"
            className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-gray-900 hover:bg-black w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full transition-colors shadow-sm"
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
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-100 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-72" : "w-0"
        }`}
      >
        <div className="w-72 h-full flex flex-col p-6 overflow-y-auto">
          {/* Sidebar Header Start */}
          <div className="border-b border-gray-100 pb-4 mb-8">
            <span className="font-lora font-bold text-2xl">
              Kontak & Tautan
            </span>
          </div>
          {/* Sidebar Header End */}

          {/* Sidebar Links Start */}
          <ul className="space-y-6 text-gray-600 font-medium">
            <li>
              <a
                href="mailto:sultan.fatahhh@gmail.com"
                className="flex items-center gap-4 hover:text-black transition-colors"
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
                className="flex items-center gap-4 hover:text-black transition-colors"
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
                className="flex items-center gap-4 hover:text-black transition-colors"
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
        className={`pt-16 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-72 ml-0" : "ml-0"
        }`}
      >
        {/* Article Area Start */}
        <main className="max-w-3xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-24 w-full">
          {/* Tags Start */}
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500 mb-6 font-sans">
            <span className="bg-gray-100 px-3 py-1.5 rounded-full">
              Artificial Intelligence
            </span>
            <span className="bg-gray-100 px-3 py-1.5 rounded-full">
              Data Science
            </span>
          </div>
          {/* Tags End */}

          {/* Typewriter Title Start */}
          <h1 className="font-lora text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 leading-tight">
            {displayText}
            {/* Kursor */}
            <span className="animate-pulse text-blue-600">|</span>
          </h1>
          {/* Typewriter Title End */}

          {/* Author Info Start */}
          <div className="flex items-center gap-4 mt-8 md:mt-10 mb-4 border-b border-gray-100 pb-6 md:pb-8 font-sans">
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

                <TooltipContent side="bottom" className="text-xs font-medium">
                  <p>Click for details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Overlay Foto Fullscreen (Efek Zoom) - Kode ini tetap sama seperti sebelumnya */}
            <div
              className={`fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
                isZoomed
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsZoomed(false)}
              aria-label="Close image preview"
            >
              {/* Animasi membesar (scale) */}
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
                <span className="font-lora font-bold text-gray-900 text-sm md:text-base">
                  Sultan Abdul Fatah
                </span>
                <a
                  href="https://linkedin.com/in/sultan-fatahhh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-300"
                  aria-label="Connect"
                >
                  <Plus size={14} strokeWidth={2.5} />

                  {/* Tooltip Start */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm">
                    Connect with me!
                    {/* Segitiga panah kecil di bawah tooltip */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
                  </span>
                  {/* Tooltip End */}
                </a>
              </div>
              <div className="text-xs md:text-sm text-gray-500">
                Tangerang, Indonesia
              </div>
            </div>
          </div>
          {/* Author Info End */}

          {/* Content Body Start */}
          <article className="prose prose-base md:prose-xl font-lora text-gray-800 max-w-none">
            {/* Lead Paragraph Start */}
            <p className="lead text-lg md:text-xl text-gray-600 mb-8 md:mb-10">
              Mahasiswa Informatika yang fokus mengembangkan keterampilan
              praktis di bidang Kecerdasan Buatan dan Sains Data untuk
              memecahkan masalah nyata dan menyiapkan karier masa depan.
            </p>
            {/* Lead Paragraph End */}

            {/* Work Experiences Section Start */}
            <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900">
              Work Experiences
            </h3>
            <div className="mb-10 text-sm md:text-base">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                <span className="font-bold text-base md:text-lg text-gray-900">
                  Studio Yoga meMULAi
                  <br className="hidden md:block" />
                  <p className="text-gray-600 font-medium mt-1 md:mt-0 md:mb-3">
                    Software Engineer Intern
                  </p>
                </span>
                <span className="text-gray-500 text-xs md:text-sm mt-2 md:mt-0 text-left md:text-right">
                  Feb 2026 - May 2026
                  <br className="hidden md:block" />
                  <span className="md:hidden"> | </span>Jakarta, Indonesia
                  (Remote)
                </span>
              </div>
              <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700 mt-4 md:mt-0">
                <li>
                  Membangun pipeline Retrieval-Augmented Generation (RAG)
                  menggunakan Supabase dengan ekstensi pgvector,
                  mengintegrasikan vector similarity search dan full-text search
                  untuk meningkatkan akurasi pencarian data pada sistem
                  knowledge base.
                </li>
                <li>
                  Merancang dan mengelola struktur data pada Content Management
                  System (CMS) internal untuk menyimpan, memperbarui, dan
                  mengorganisir data Q&A berbasis embedding secara dinamis.
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
                  terstruktur untuk menghasilkan output data yang konsisten dan
                  aman.
                </li>
                <li>
                  Berkolaborasi dalam pengembangan arsitektur sistem end-to-end
                  menggunakan ekosistem Next.js dan Vercel, memastikan integrasi
                  antar komponen data berjalan lancar dari sisi backend ke
                  frontend.
                </li>
              </ul>
            </div>
            {/* Work Experiences Section End */}

            {/* Education Section Start */}
            <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900">
              Education
            </h3>
            <div className="mb-10 text-sm md:text-base">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h4 className="font-bold text-base md:text-lg text-gray-900">
                  Institut Teknologi Tangerang Selatan
                </h4>
                <span className="text-gray-500 text-xs md:text-sm mt-1 md:mt-0">
                  Sep 2024 - Sep 2028 (Expected)
                </span>
              </div>
              <p className="text-gray-700 mt-1">
                Bachelor of Informatics, 3.90/4.00
              </p>
            </div>
            {/* Education Section End */}

            {/* Organisational Experience Section Start */}
            <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900">
              Organisational Experience
            </h3>
            <div className="mb-10 text-sm md:text-base">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                <h4 className="font-bold text-base md:text-lg text-gray-900">
                  Coding Camp by DBS Foundation x Dicoding
                </h4>
                <span className="text-gray-500 text-xs md:text-sm mt-1 md:mt-0">
                  Feb 2026 - Jul 2026
                </span>
              </div>
              <p className="text-gray-600 font-medium mb-2">
                Data Science Awardee & Capstone Data Scientist
              </p>
              <p className="text-gray-700 mb-4 md:mb-3 text-sm">
                Program bootcamp intensif untuk mencetak talenta digital melalui
                pembelajaran end-to-end dan proyek kolaboratif.
              </p>
              <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700">
                <li>
                  Menyelesaikan bootcamp intensif Data Science dan meraih
                  sertifikat kompetensi teknis.
                </li>
                <li>
                  Berkolaborasi dalam tim untuk merancang sistem rekomendasi
                  berbasis kecerdasan buatan (context-aware) secara end-to-end,
                  mengeksekusi pra-pemrosesan data mentah hingga pemodelan
                  algoritma Machine Learning, dan meraih Skor Akhir 92.
                </li>
                <li>
                  Meraih skor Peer Review sempurna (100) atas kontribusi teknis
                  dan kolaborasi tim yang konsisten sepanjang proyek.
                </li>
              </ul>
            </div>
            {/* Organisational Experience Section End */}

            {/* Skills & Projects Section Start */}
            <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900">
              Skills, Projects & Achievements
            </h3>
            <div className="mb-10 text-sm md:text-base space-y-6">
              <div>
                <h4 className="font-bold text-gray-900">
                  DeepWell - Mental Health & Lifestyle Correlation Analysis
                  System (2026)
                </h4>
                <p className="text-gray-700 mt-1">
                  Membangun pipeline data end-to-end (data wrangling, cleaning,
                  SMOTE untuk class imbalance) menggunakan Python, serta
                  men-deploy dashboard analitik interaktif ke Streamlit Cloud
                  untuk visualisasi data ke stakeholder.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  SkyBite - Weather-Based Food Recommendation System (2026)
                </h4>
                <p className="text-gray-700 mt-1">
                  Merancang arsitektur client-server dengan FastAPI (backend)
                  dan Next.js (frontend) yang mengintegrasikan data cuaca
                  real-time via API eksternal, dengan waktu respons sistem di
                  bawah 300ms.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  Public Perception Analysis of Christopher Nolan - IMDB 50K
                  Sentiment Analysis (2025)
                </h4>
                <p className="text-gray-700 mt-1">
                  Mengolah dan membersihkan dataset IMDB 50K, menerapkan LLM IBM
                  Granite untuk klasifikasi opini, serta menyusun output
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
  );
}
