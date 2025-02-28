"use client"

import { NoteEditor } from "@/components/note-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { saveNote } from "@/lib/notes-storage"
import type { Note } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"

export default function NewNotePage() {
  const router = useRouter()

  const handleSave = async (title: string, content: string, tags: string[]) => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await saveNote(newNote)
    router.push(`/notes/${newNote.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/notes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">New Note</h2>
      </div>
      <NoteEditor onSave={handleSave} />
    </div>
  )
}

