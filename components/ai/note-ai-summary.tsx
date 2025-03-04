"use client";

import { useState, useEffect } from "react";
import { generateChatResponse } from "@/lib/gemini";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

interface NoteAISummaryProps {
  noteContent: string;
}

export function NoteAISummary({ noteContent }: NoteAISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateSummary = async () => {
      setIsLoading(true);
      try {
        const prompt = `Please provide a concise and well-formatted summary of the following note. Use bullet points (e.g., dashes or numbers) to list key points, insights, and actionable items in a clear and professional style. Avoid using literal asterisks in your formatting.\n\n"${noteContent}"`;
        const aiResponse = await generateChatResponse(prompt, noteContent);
        setSummary(aiResponse);
      } catch (error: unknown) { // Change any to unknown
        console.error("Failed to generate summary:", error);
        setSummary("Failed to generate summary. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    generateSummary();
  }, [noteContent]);

  return (
    <Card>
      <CardHeader className="flex items-center space-x-2">
        <Bot className="h-4 w-4" />
        <CardTitle>AI Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Generating summary...</p>
        ) : summary ? (
          <ul>
            {summary.split('\n').map((item, index) => {
              if (item.trim() !== '') {
                return <li key={index}>{item}</li>;
              }
              return null;
            })}
          </ul>
        ) : (
          <p>No summary available.</p>
        )}
      </CardContent>
    </Card>
  );
}