import type { Metadata } from "next";
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
            <a href="/" className="brand">
              the product
            </a>
            <a href="/changelog">changelog</a>
            <a href="/roadmap">roadmap</a>
            <a href="/org">the org</a>
            <a href="/status">status</a>
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
