import type { Metadata } from "next";

import "./globals.css";




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
        
      >
       
          {children}
     
      </body>
    </html>
  );
}
