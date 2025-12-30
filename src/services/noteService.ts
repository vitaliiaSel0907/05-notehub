import axios from 'axios'
import type { NotesResponse } from '../types/NotesResponse'
import type { Note } from '../types/note'

const API_URL = 'https://notehub-public.goit.study/api/notes'
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN

interface FetchNotesParams {
  page: number
  perPage?: number
  search?: string
}

interface CreateNotePayload {
  title: string
  content: string | null
  tag: string
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>(API_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      page,
      perPage,
      search,
    },
  })

  return response.data
}

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const response = await axios.post<Note>(API_URL, payload, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })

  return response.data
}

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })

  return response.data
}
