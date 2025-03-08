import { useState } from "react";
import { generateChatResponse } from "@/lib/gemini";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PROMPT_OPTIONS = [
  {
    title: "Summarize",
    instruction: "Summarize the following note in key points. Use concise language and bullet points:",
    placeholder: "Click to generate summary"
  },
  {
    title: "Explain",
    instruction: "Explain the following content in simple terms suitable for a beginner:",
    placeholder: "Click to generate explanation"
  },
  {
    title: "Simplify",
    instruction: "Simplify this text while maintaining all crucial information. Use clear, straightforward language:",
    placeholder: "Click to simplify content"
  },
  {
    title: "Study Guide",
    instruction: "Create a study guide from this content with key concepts and examples:",
    placeholder: "Click to generate study guide"
  },
  {
    title: "Action Items",
    instruction: "Extract actionable tasks and next steps from this content:",
    placeholder: "Click to extract action items"
  },
];

export function NoteAISummary({ noteContent }: { noteContent: string }) {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(PROMPT_OPTIONS[0]);

  const handleProcessContent = async () => {
    if (!noteContent) return;
    
    setIsLoading(true);
    try {
      const fullPrompt = `${selectedPrompt.instruction}\n\n"${noteContent}"`;
      const aiResponse = await generateChatResponse(fullPrompt, noteContent);
      setResult(aiResponse);
    } catch (error) {
      console.error("Processing failed:", error);
      setResult("Failed to process content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <Bot className="h-6 w-6 " />
          <div className="space-y-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1">
                <CardTitle className="text-xl font-semibold">
                  {selectedPrompt.title}
                </CardTitle>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {PROMPT_OPTIONS.map((prompt) => (
                  <DropdownMenuItem
                    key={prompt.title}
                    onSelect={() => setSelectedPrompt(prompt)}
                  >
                    {prompt.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-sm text-gray-500">
              {selectedPrompt.placeholder}
            </p>
          </div>
        </div>
        <Button 
          onClick={handleProcessContent} 
          variant="outline" 
          disabled={isLoading}
          className="rounded-ful transition-colors"
          aria-label={`Generate ${selectedPrompt.title.toLowerCase()}`}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin " />
          ) : (
            <Bot className="h-5 w-5 " />
          )}
        </Button>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="italic">Analyzing content...</span>
          </div>
        ) : result ? (
          <div className="space-y-3 prose max-w-none">
            {result.split('\n').map((item, index) => {
              const cleanItem = item
                .replace(/\*\*/g, '') 
                .replace(/\*/g, '')   
                .replace(/•/g, '')     
                .trim();

              return cleanItem !== '' ? (
                <div 
                  key={index}
                  className="flex space-x-2 text-gray-700 leading-relaxed"
                >
                  <span className="text-blue-600">•</span>
                  <span className="flex-1">
                    {cleanItem.startsWith('**') ? (
                      <strong className="text-gray-900 font-medium">
                        {cleanItem.replace(/\*\*/g, '')}
                      </strong>
                    ) : (
                      cleanItem
                    )}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            Select a processing type and click the AI icon
          </p>
        )}
      </CardContent>
    </Card>
  );
}