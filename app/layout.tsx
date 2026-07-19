import type { Metadata } from "next";
import { Inter, Lora, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Sultan Abdul Fatah - Portfolio",
  description: "Personal portfolio of a Data Scientist and Data Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      {/* Pastikan children dibungkus di dalam tag body dan html */}
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased bg-[#FAF9F6] text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
