"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface ImageUploadProps {
  open: boolean
  onClose: () => void
  onImageSelected: (imageUrl: string) => void
}

export function ImageUpload({ open, onClose, onImageSelected }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [uploading, setUploading] = useState(false)

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imageUrl.trim()) {
      onImageSelected(imageUrl.trim())
      onClose()
      setImageUrl("")
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    // Check file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB")
      return
    }

    try {
      setUploading(true)
      // Here you would typically upload to your storage service
      // For now, we'll create a local URL
      const url = URL.createObjectURL(file)
      onImageSelected(url)
      onClose()
    } catch (error) {
      toast.error("Failed to upload image")
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">Image URL</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="url">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <Input placeholder="Enter image URL..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              <Button type="submit" className="w-full">
                Add Image
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="upload">
            <div className="space-y-4">
              <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

