import type { Metadata } from "next";
import { Inter, Lora, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Sultan Abdul Fatah - Portfolio",
  description:
    "Sultan's personal website. A place where he shares his journey, projects, and insights in the world of technology and data science.",
  keywords: [
    "Sultan Abdul Fatah",
    "Portfolio",
    "Artificial Intelligence",
    "Data Science",
    "Machine Learning",
    "Software Engineer",
    "Next.js Developer",
    "Data Enthusiast",
  ],
  authors: [{ name: "Sultan Abdul Fatah" }],
  creator: "Sultan Abdul Fatah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased bg-[#FAF9F6] dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
