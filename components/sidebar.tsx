"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Book, FileText, FolderOpen, Hash, Menu, PlusCircle, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAllTags } from "@/lib/notes-storage"
import { useTheme } from "next-themes"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [tags, setTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter(); // Initialize useRouter

  const { theme } = useTheme()

  useEffect(() => {
    const loadTags = async () => {
      const allTags = await getAllTags()
      setTags(allTags)
    }

    loadTags()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Navigate to /notes with the search query as a parameter
    router.push(`/notes?search=${e.target.value}`);
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 md:relative",
          isOpen ? "left-0 w-72" : "-left-72 md:left-0 md:w-16",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className={cn("flex items-center gap-2", !isOpen && "md:justify-center")}>
            <Book className="h-6 w-6" />
            <span className={cn("font-semibold", !isOpen && "md:hidden")}>Notebook</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className={cn("p-4", !isOpen && "md:items-center md:p-2")}>
          <Link href="/notes/new" className={cn(!isOpen && "md:w-full md:justify-center")}>
            <Button className={cn("w-full", !isOpen && "md:w-10 md:px-0")}>
              <PlusCircle className="mr-2 h-4 w-4 md:mr-0" />
              <span className={cn(!isOpen && "md:hidden")}>New Note</span>
            </Button>
          </Link>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2", !isOpen && "md:justify-center md:px-2")}>
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange} // Use the new handler
            className={cn("h-8", !isOpen && "md:hidden")}
          />
        </div>
        <ScrollArea className="flex-1 overflow-auto">
          <nav className="flex flex-col gap-2 p-2">
            <Link href={`/notes${searchQuery ? `?search=${searchQuery}` : ""}`}>
              <Button
                variant={pathname === "/notes" ? "secondary" : "ghost"}
                className={cn("w-full justify-start", !isOpen && "md:justify-center")}
              >
                <FileText className="mr-2 h-4 w-4 md:mr-0" />
                <span className={cn(!isOpen && "md:hidden")}>All Notes</span>
              </Button>
            </Link>
            <Link href="/notes?view=folders">
              <Button
                variant={pathname === "/notes" && pathname.includes("?view=folders") ? "secondary" : "ghost"}
                className={cn("w-full justify-start", !isOpen && "md:justify-center")}
              >
                <FolderOpen className="mr-2 h-4 w-4 md:mr-0" />
                <span className={cn(!isOpen && "md:hidden")}>Folders</span>
              </Button>
            </Link>
            <Separator className="my-2" />
            <div className={cn("px-2 text-xs font-medium text-muted-foreground", !isOpen && "md:hidden")}>Tags</div>
            {tags.map((tag) => (
  <Link key={tag} href={`/notes?tag=${tag}`}>
    <Button variant="ghost" className={cn("w-full justify-start", !isOpen && "md:justify-center")}>
      <Hash className="mr-2 h-4 w-4 md:mr-0" />
      <span className={cn(!isOpen && "md:hidden")}>{tag}</span>
    </Button>
  </Link>
))}
          </nav>
          <div className="p-2 text-xs text-muted-foreground">Current theme: {theme}</div>
        </ScrollArea>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-3 z-30 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}