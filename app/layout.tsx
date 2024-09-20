import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google'
import Nav from "@/components/nav";
import AuthStatus from "../components/authStatus"
import SessionProviderWrapper from '@/utils/sessionProviderWrapper'

const inter = Inter({ subsets: ['latin'] })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Login",
  description: "casino Web3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body
          className={inter.className}
        >
          <div className="flex flex-row">
            <div className="w-4/5 p-3 h-screen bg-white">
              {children}
            </div>
            <div className="w-1/5 p3 h-screen bg-gray-700">
              <h2 className="text-3xl">
                Demo - frontend
              </h2>
              <AuthStatus />
              <hr />
              <Nav />
            </div>
          </div>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
