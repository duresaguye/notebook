// filepath: /home/dura/web/digital/digital-note/components/notes-list.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import type { Note } from "@/lib/types"
import { getAllNotes } from "@/lib/notes-storage"
import { formatDate } from "@/lib/utils"

export function NotesList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const tagFilter = searchParams.get("tag")
  const searchQuery = searchParams.get("search") || ""; // Get the search query

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      const allNotes = await getAllNotes()

      // Filter by tag if needed
      let filteredNotes = tagFilter ? allNotes.filter((note) => note.tags.includes(tagFilter)) : allNotes

      // Filter by search query
      if (searchQuery) {
        filteredNotes = filteredNotes.filter((note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort by updated date (newest first)
      filteredNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

      setNotes(filteredNotes)
      setLoading(false)
    }

    fetchNotes()
  }, [tagFilter, searchQuery]) // Add searchQuery to the dependency array

  if (loading) {
    return <div className="text-center p-8">Loading notes...</div>
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Link key={note.id} href={`/notes/${note.id}`}>
          <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2">{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground mb-4">{note.content.replace(/[#*`_~]/g, "")}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>Updated {formatDate(note.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}