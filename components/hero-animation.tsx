"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"


export default function HeroAnimation() {
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress((prev) => Math.min(prev + 100 / 30, 100)) 
    })

    return () => cancelAnimationFrame(frame)
  }, [progress])

  const tabs = [
    {
      title: "Take Notes",
      content: (
        <div className="p-4 space-y-3 text-sm">
          <h4 className="font-semibold text-base">Biology 101: Cell Structure</h4>
          <p>• Cell membrane: Controls what enters and exits the cell</p>
          <p>• Nucleus: Contains DNA and controls cell activities</p>
          <p>• Mitochondria: Produces energy through cellular respiration</p>
          <p>• Endoplasmic reticulum: Transports materials within the cell</p>
          <p>• Golgi apparatus: Packages and distributes proteins</p>
        </div>
      ),
    },
    {
      title: "Get Summaries",
      content: (
        <div className="p-4 space-y-3 text-sm">
          <div className="bg-primary/10 rounded-lg p-3">
            <h4 className="font-semibold mb-2">Summary: Cell Structure</h4>
            <p>
              Cells are the basic units of life with specialized components. The cell membrane regulates material flow,
              while the nucleus houses DNA and controls cellular activities. Mitochondria generate energy, and the ER
              and Golgi apparatus handle protein processing and transport.
            </p>
          </div>
          <div className="flex justify-end">
            <div className="bg-muted rounded-md px-3 py-1 text-xs">Generated in 2.3 seconds</div>
          </div>
        </div>
      ),
    },
    {
      title: "Chat with AI",
      content: (
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
              <span className="text-xs font-medium">AI</span>
            </div>
            <div className="bg-slate-100 rounded-lg p-3 text-sm">
              <p>How can I help with your cell biology notes today?</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center">
              <span className="text-xs font-medium">You</span>
            </div>
            <div className="bg-slate-100 rounded-lg p-3 text-sm">
              <p>What's the difference between mitochondria and chloroplasts?</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
              <span className="text-xs font-medium">AI</span>
            </div>
            <div className="bg-slate-100 rounded-lg p-3 text-sm">
              <p>
                Mitochondria produce energy through cellular respiration in all cells, while chloroplasts perform
                photosynthesis only in plant cells. Both have their own DNA, but chloroplasts convert light to chemical
                energy, while mitochondria convert chemical energy from food.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="rounded-xl border bg-card shadow-2xl overflow-hidden transition-all hover:shadow-3xl">
      <div className="flex border-b relative">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cn(
              "flex-1 py-3 text-sm font-medium relative z-10 transition-colors duration-300",
              activeTab === index ? "text-primary" : "text-muted-foreground hover:text-primary/80"
            )}
            onClick={() => {
              setActiveTab(index)
              setProgress(0)
            }}
          >
            {tab.title}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-left-8 duration-300" />
            )}
          </button>
        ))}
        <div className="absolute bottom-0 left-0 h-0.5 bg-border transition-all duration-300" style={{
          width: `${progress}%`,
          transform: `translateX(${(activeTab * 100)}%)`
        }} />
      </div>
      
      <div className="p-1">
        <Card className="border-none shadow-none overflow-hidden">
          <div className="animate-in fade-in duration-300">
            {tabs[activeTab].content}
          </div>
        </Card>
      </div>

      <div className="bg-slate-50 p-4 flex justify-between items-center border-t">
        <div className="h-2 w-1/3 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary/50 transition-all duration-100 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
          <span className="text-xs font-medium text-primary">AI</span>
        </div>
      </div>
    </div>
  )
}

