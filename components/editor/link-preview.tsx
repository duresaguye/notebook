"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LinkPreviewProps {
  url: string
}

export function LinkPreview({ url }: LinkPreviewProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  // Extract domain from URL for display
  const domain = url.replace(/^https?:\/\//, "").split("/")[0]

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs">
            {domain.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-muted-foreground">{domain}</span>
        </div>
      </CardContent>
    </Card>
  )
}

