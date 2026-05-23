import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-display",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "the product",
  description: "the product organization of the product, which exists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <div className="frame">
          <nav className="nav">
            <Link href="/" className="brand">
              the product
            </Link>
            <Link href="/changelog">changelog</Link>
            <Link href="/roadmap">roadmap</Link>
            <Link href="/research">research</Link>
            <Link href="/org">the org</Link>
            <Link href="/status">status</Link>
          </nav>
          {children}
          <footer className="foot">
            the product is the product · all rights are the rights
          </footer>
        </div>
      </body>
    </html>
  );
}
