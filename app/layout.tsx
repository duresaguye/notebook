import type { Metadata } from "next";

import "./globals.css";
import { Inter } from "next/font/google"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Notebook",
  description: "A comprehensive digital notebook for all your note-taking needs",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
         className={inter.className}
      >
       
          {children}
     
      </body>
    </html>
  );
}
