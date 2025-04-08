"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { NoteEditor } from "@/components/note-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Note } from "@/lib/types"
import { getNoteById, updateNote } from "@/lib/notes-storage"

export default function EditNotePage() {
  const params = useParams()
  const router = useRouter()
  const [note, setNote] = useState<Note | null>(null)
  const id = params.id as string

  useEffect(() => {
    const fetchNote = async () => {
      const foundNote = await getNoteById(id)
      if (foundNote) {
        setNote(foundNote)
      } else {
        router.push("/notes")
      }
    }

    fetchNote()
  }, [id, router])

  const handleSave = async (title: string, content: string, tags: string[]) => {
    if (!note) return

    const updatedNote: Note = {
      ...note,
      title,
      content,
      tags,
      updatedAt: new Date().toISOString(),
    }

    await updateNote(updatedNote)
    router.push(`/notes/${id}`)
  }

  if (!note) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/notes/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">Edit Note</h2>
      </div>
      <NoteEditor initialTitle={note.title} initialContent={note.content} initialTags={note.tags} onSave={handleSave} />
    </div>
  )
}

