"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { Note } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface NoteViewProps {
  note: Note
}

export function NoteView({ note }: NoteViewProps) {
  return (
    <div className="space-y-4">
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {note.updatedAt && (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Last updated {formatDate(note.updatedAt)}</span>
        </div>
      )}

      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
      </div>
    </div>
  )
}

