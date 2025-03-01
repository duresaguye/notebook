"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface NoteAISummaryProps {
  noteContent: string
}

export function NoteAISummary({ }: NoteAISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateSummary = async () => {
    setIsLoading(true)
    // Simulate AI summary generation
    setTimeout(() => {
      setSummary("This is a simulated AI summary of the note. Replace with actual AI integration.")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AI Summary</CardTitle>
        <Button variant="ghost" size="icon" onClick={generateSummary} disabled={isLoading}>
          <Sparkles className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Generating summary...</p>
        ) : summary ? (
          <p className="text-sm">{summary}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Click the sparkles to generate an AI summary</p>
        )}
      </CardContent>
    </Card>
  )
}

