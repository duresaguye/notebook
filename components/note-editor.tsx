"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { NoteView } from "@/components/note-view"
import { Toolbar } from "@/components/editor/toolbar"
import { ImageUpload } from "@/components/editor/image-upload"
import { toast } from "sonner"

interface NoteEditorProps {
  initialTitle?: string
  initialContent?: string
  initialTags?: string[]
  isLoading?: boolean
  onSave: (title: string, content: string, tags: string[]) => void
}

export function NoteEditor({
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  isLoading = false,
  onSave,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [newTag, setNewTag] = useState("")
  const [activeTab, setActiveTab] = useState("edit")
  const [showImageUpload, setShowImageUpload] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault()
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()])
      }
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const insertText = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const beforeText = content.substring(0, start)
    const afterText = content.substring(end)

    // Handle different types of insertions
    let insertedText = text
    if (text === "**text**" || text === "*text*" || text === "~~text~~" || text === "[text](url)") {
      const selectedText = content.substring(start, end)
      insertedText = selectedText ? text.replace("text", selectedText) : text
    }

    setContent(beforeText + insertedText + afterText)

    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + insertedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleImageSelected = (imageUrl: string) => {
    insertText(`![Image](${imageUrl})\n`)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Please enter a title for your note")
      return
    }

    if (!content.trim()) {
      toast.error("Please enter some content for your note")
      return
    }

    try {
      await onSave(title.trim(), content.trim(), tags)
    } catch (error) {
      console.error("Error saving note:", error)
      toast.error("Failed to save note. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold"
          disabled={isLoading}
          required
        />
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 rounded-full hover:bg-muted"
                disabled={isLoading}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag} tag</span>
              </button>
            </Badge>
          ))}
          <Input
            placeholder="Add tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-24 flex-grow"
            disabled={isLoading}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="mt-2">
          <div className="space-y-2">
            <Toolbar onInsert={insertText} onImageUpload={() => setShowImageUpload(true)} />
            <Textarea
              ref={textareaRef}
              placeholder="Write your note content here... Markdown is supported!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] font-mono"
              disabled={isLoading}
              required
            />
          </div>
        </TabsContent>
        <TabsContent value="preview" className="mt-2">
          <div className="border rounded-md min-h-[300px] p-4">
            <NoteView
              note={{
                id: "",
                title,
                content,
                tags,
                createdAt: "",
                updatedAt: "",
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Note"}
        </Button>
      </div>

      <ImageUpload
        open={showImageUpload}
        onClose={() => setShowImageUpload(false)}
        onImageSelected={handleImageSelected}
      />
    </form>
  )
}

