"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { Note } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface NoteViewProps {
  note: Note
}

export function NoteView({ note }: NoteViewProps) {
  // Function to convert markdown to HTML (simplified version)
  const renderMarkdown = (text: string) => {
    // Basic markdown conversion
    return (
      text
        // Headers
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        // Bold
        .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
        // Italic
        .replace(/\*(.*?)\*/gim, "<em>$1</em>")
        // Strikethrough
        .replace(/~~(.*?)~~/gim, "<del>$1</del>")
        // Links
        .replace(/\[(.*?)\]$$(.*?)$$/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // Images
        .replace(/!\[(.*?)\]$$(.*?)$$/gim, '<img src="$2" alt="$1" class="rounded-lg max-h-96 object-cover" />')
        // Lists
        .replace(/^\s*\n\*/gim, "<ul>\n*")
        .replace(/^(\*.+)\s*\n([^*])/gim, "$1\n</ul>\n\n$2")
        .replace(/^\*(.+)/gim, "<li>$1</li>")
        // Ordered lists
        .replace(/^\s*\n\d\./gim, "<ol>\n1.")
        .replace(/^(\d\..+)\s*\n([^\d.])/gim, "$1\n</ol>\n\n$2")
        .replace(/^\d\.(.+)/gim, "<li>$1</li>")
        // Code blocks
        .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
        // Inline code
        .replace(/`(.*?)`/gim, "<code>$1</code>")
        // Blockquotes
        .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
        // Paragraphs
        .replace(/\n\s*\n/gim, "\n<br/>\n")
        // Line breaks
        .split("\n")
        .join("<br/>")
    )
  }

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

      <div
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }}
      />
    </div>
  )
}

