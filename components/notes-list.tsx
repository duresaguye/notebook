"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Loader2 } from "lucide-react"
import type { Note } from "@/lib/types"
import { getAllNotes } from "@/lib/notes-storage"
import { formatDate } from "@/lib/utils"

export function NotesList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const tagFilter = searchParams.get("tag")
  const searchQuery = searchParams.get("search") || ""

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      const allNotes = await getAllNotes()

      let filteredNotes = tagFilter ? allNotes.filter((note) => note.tags.includes(tagFilter)) : allNotes
      if (searchQuery) {
        filteredNotes = filteredNotes.filter((note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      filteredNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

      setNotes(filteredNotes)
      setLoading(false)
    }

    fetchNotes()
  }, [tagFilter, searchQuery])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground mb-4">No notes found</p>
        <Link href="/notes/new" className="text-primary hover:underline">
          Create your first note
        </Link>
      </div>
    )
  }
  
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
      {notes.map((note) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: typeof window !== 'undefined' && window.matchMedia("(hover: hover)").matches ? 1.02 : 1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Link href={`/notes/${note.id}`} className="block active:scale-95">
            {/* Simplified Corner Animation for Mobile */}
            <div className="absolute inset-0 flex justify-between items-between pointer-events-none">
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 border border-primary rounded-tl-lg"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 border border-primary rounded-tr-lg"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 flex justify-between pointer-events-none">
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 border border-primary rounded-bl-lg"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 border border-primary rounded-br-lg"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
            </div>
            
            {/* Mobile-optimized Card */}
            <Card className="h-full bg-background relative z-10 p-2 sm:p-3 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-1 sm:pb-2 px-2 sm:px-3">
                <CardTitle className="line-clamp-2 text-sm sm:text-base font-medium">
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-3">
                <p className="line-clamp-3 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed">
                  {note.content.replace(/[#*`_~]/g, "")}
                </p>
                <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                  {note.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="text-[10px] sm:text-xs px-1.5 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3 min-w-3" />
                  <span className="truncate">Updated {formatDate(note.updatedAt)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}