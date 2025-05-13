
"use client"
import { useState } from "react"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { NoteView } from "@/components/note-view"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const CoolTextarea = dynamic(
  () => import('./RichTextEditor').then(mod => mod.CoolTextarea),
  { 
    ssr: false,
    loading: () => <div className="h-[300px] animate-pulse bg-muted rounded-md" />
  }
)

interface NoteEditorProps {
  initialTitle?: string
  initialContent?: string
  initialTags?: string[]
  isLoading?: boolean
  onSave: (title: string, content: string, tags: string[]) => Promise<void>
}

export function NoteEditor({
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  isLoading = false,
  onSave,
}: NoteEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [newTag, setNewTag] = useState("")
  const [activeTab, setActiveTab] = useState("edit")

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
      toast.success("Note saved successfully!")
      router.push('/notes')
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
          <CoolTextarea
            value={content}
            onChange={setContent}
            placeholder="Start writing your note..."
            className="min-h-[300px]"
            characterLimit={5000}
          />
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
    </form>
  )
}