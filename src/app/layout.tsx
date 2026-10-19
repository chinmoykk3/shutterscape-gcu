import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/components/ui/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shutterscape — GCU Photography Club",
    template: "%s | Shutterscape",
  },
  description:
    "The official photography club of GCU — capturing moments, crafting stories through the lens.",
  keywords: ["photography", "club", "GCU", "shutterscape", "gallery", "campus"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
