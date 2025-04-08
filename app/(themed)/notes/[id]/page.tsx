"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NoteView } from "@/components/note-view";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash,Loader2 } from "lucide-react";
import Link from "next/link";
import type { Note } from "@/lib/types";
import { getNoteById, deleteNote } from "@/lib/notes-storage";
import { NoteAISummary } from "@/components/ai/note-ai-summary";
import { NoteAIChat } from "@/components/ai/note-ai-chat";

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const id = params.id as string;

  useEffect(() => {
    const fetchNote = async () => {
      const foundNote = await getNoteById(id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        router.push("/notes");
      }
    };

    fetchNote();
  }, [id, router]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteNote(id);
      router.push("/notes");
    }
  };

  if (!note) {
    return  <Loader2 className="animate-spin h-8 w-8 text-primary" />;
  }

  return (
    <div className="container mx-auto max-w-6xl p-4">
      {/* Header: stacks on small screens, rows on md+ */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link href="/notes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-2xl font-bold break-words">{note.title}</h2>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Link href={`/notes/${id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </header>

      {/* Main content: single column on sm, two-column grid on md+ */}
      <main className="grid gap-6 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <NoteView note={note} />
          </div>
          <NoteAISummary noteContent={note.content} />
        </div>
        <div className="overflow-auto">
          <NoteAIChat noteContent={note.content} />
        </div>
      </main>
    </div>
  );
}
