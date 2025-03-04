"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Bold,
  Code,
  ImageIcon,
  Italic,
  Link,
  ListOrdered,
  ListOrderedIcon as ListUnordered,
  Strikethrough,
} from "lucide-react"

interface ToolbarProps {
  onInsert: (text: string) => void
  onImageUpload: () => void
}

export function Toolbar({ onInsert, onImageUpload }: ToolbarProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onInsert("**text**")}>
              <Bold className="h-4 w-4" />
              <span className="sr-only">Bold</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Make text bold</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onInsert("*text*")}>
              <Italic className="h-4 w-4" />
              <span className="sr-only">Italic</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Make text italic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onInsert("~~text~~")}>
              <Strikethrough className="h-4 w-4" />
              <span className="sr-only">Strikethrough</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Strikethrough text</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onInsert("`text`")}>
              <Code className="h-4 w-4" />
              <span className="sr-only">Code</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert code</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onInsert("[text](url)")}>
              <Link className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert link</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onInsert("\n- ")}>
              <ListUnordered className="h-4 w-4" />
              <span className="sr-only">Unordered List</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert unordered list</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onInsert("\n1. ")}>
              <ListOrdered className="h-4 w-4" />
              <span className="sr-only">Ordered List</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert ordered list</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onImageUpload}>
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Image</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert image</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

