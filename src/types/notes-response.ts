import type { Note } from '../types/note'  

export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

