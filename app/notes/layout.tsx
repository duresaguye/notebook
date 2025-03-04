import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b flex items-center justify-between px-4">
          <h1 className="text-xl font-semibold"></h1>
          <ModeToggle />
        </header>
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  )
}

