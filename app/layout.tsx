import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});



export const metadata: Metadata = {
  title: "Zletto - Technician at Your Door in 20 Minutes",
  description: "Trusted electricians, plumbers & more in Thane",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.variable}
      >
        {children}
      </body>
    </html>
  );
}
