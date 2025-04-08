"use client"

import { useState } from "react"
import { NoteEditor } from "@/components/note-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { saveNote } from "@/lib/notes-storage"
import type { Note } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"

export default function NewNotePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async (title: string, content: string, tags: string[]) => {
    try {
      setIsLoading(true)
      const newNote: Note = {
        id: uuidv4(),
        title,
        content,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      await saveNote(newNote)
      toast.success("Note created successfully!")
      router.push(`/notes/${newNote.id}`)
    } catch (error) {
      console.error("Failed to save note:", error)
      toast.error("Failed to create note. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/notes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">New Note</h2>
      </div>
      <NoteEditor onSave={handleSave} isLoading={isLoading} />
    </div>
  )
}

