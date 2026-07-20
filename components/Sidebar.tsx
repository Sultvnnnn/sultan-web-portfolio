"use client";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-40 overflow-hidden transition-[width] duration-300 ease-in-out ${
          isOpen ? "w-72" : "w-0"
        }`}
      >
        <div className="w-72 h-full flex flex-col p-6 overflow-y-auto">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-8">
            <span className="font-lora font-bold text-2xl dark:text-white">
              Contact & Links
            </span>
          </div>
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
        </div>
      </aside>
    </>
  );
}
