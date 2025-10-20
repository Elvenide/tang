import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppServiceProvider } from "@/lib/app-service";
import "./globals.css";
import FloatingNav from "@/components/FloatingNav";
import { IconHome, IconBook, IconFilePlus } from "@tabler/icons-react";

const pages = [
  { id: "home", title: "Home", icon: <IconHome />, href: "/" },
  { id: "my_recipes", title: "My Recipes", icon: <IconBook />, href: "/my_recipes" },
  { id: "create_recipe", title: "Create Recipe", icon: <IconFilePlus />, href: "/create_recipe" }
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tang",
    template: "%s | Tang"
  },
  description: "Tang is a recipe creation, management, and sharing platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <AppServiceProvider>{children}</AppServiceProvider>
        <FloatingNav items={pages} />
      </body>
    </html>
  );
}
