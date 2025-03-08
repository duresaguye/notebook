"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { generateChatResponse } from "@/lib/gemini";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface NoteAIChatProps {
  noteContent: string;
}

export function NoteAIChat({ noteContent }: NoteAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await generateChatResponse(input, noteContent);
      const aiMessage: Message = { role: "assistant", content: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI response failed:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] flex-col rounded-lg border bg-background shadow-sm">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Bot className="h-6 w-6 text-primary" />
        <div>
          <h3 className="font-semibold">Note AI Chat</h3>
          <p className="text-sm text-muted-foreground">Ask questions about this note</p>
        </div>
      </div>

      <ScrollArea 
        ref={scrollRef}
        className="flex-1 p-4"
        style={{ height: 'calc(100% - 136px)' }}
      >
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Bot className="h-6 w-6 flex-shrink-0 text-muted-foreground" />
              )}
              <div
                className={cn(
                  "max-w-[min(85%,600px)] rounded-xl p-4 text-sm",
                  message.role === "assistant" 
                    ? "bg-muted" 
                    : "bg-primary text-primary-foreground"
                )}
              >
                <div className="prose prose-sm max-w-none break-words">
                  {message.content}
                </div>
              </div>
              {message.role === "user" && (
                <User className="h-6 w-6 flex-shrink-0 text-muted-foreground" />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <Bot className="h-6 w-6 text-muted-foreground" />
              <Skeleton className="h-[84px] w-[300px] rounded-xl" />
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask a question about this note..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="rounded-lg bg-background"
          />
          <Button 
            type="submit" 
            size="default"
            disabled={isLoading}
            className="gap-2 rounded-lg"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          AI may occasionally generate incorrect information
        </p>
      </form>
    </div>
  );
}