import type { Note } from "./types"

const STORAGE_KEY = "digital-notebook-notes"

// Helper to safely parse JSON from localStorage
const safelyParseJSON = (json: string | null): Note[] => {
  if (!json) return []
  try {
    return JSON.parse(json)
  } catch (e) {
    console.error("Failed to parse notes from localStorage", e)
    return []
  }
}

// Get all notes from localStorage
export const getAllNotes = async (): Promise<Note[]> => {
  if (typeof window === "undefined") return []

  const notes = localStorage.getItem(STORAGE_KEY)
  return safelyParseJSON(notes)
}

// Get a single note by ID
export const getNoteById = async (id: string): Promise<Note | null> => {
  const notes = await getAllNotes()
  return notes.find((note) => note.id === id) || null
}

// Save a new note
export const saveNote = async (note: Note): Promise<void> => {
  const notes = await getAllNotes()
  notes.push(note)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

// Update an existing note
export const updateNote = async (updatedNote: Note): Promise<void> => {
  const notes = await getAllNotes()
  const index = notes.findIndex((note) => note.id === updatedNote.id)

  if (index !== -1) {
    notes[index] = updatedNote
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }
}

// Delete a note
export const deleteNote = async (id: string): Promise<void> => {
  const notes = await getAllNotes()
  const filteredNotes = notes.filter((note) => note.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes))
}

// Get all unique tags from notes
export const getAllTags = async (): Promise<string[]> => {
  const notes = await getAllNotes()
  const tagsSet = new Set<string>()

  notes.forEach((note) => {
    note.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet)
}

