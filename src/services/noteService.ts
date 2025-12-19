import axios from 'axios'
import type { Note } from '../types/note'

// URL для роботи з нотатками
const API_URL = 'https://notehub-public.goit.study/api/notes'

// Токен з .env
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN

// Інтерфейс для параметрів запиту
interface FetchNotesParams {
  page: number
  perPage: number
  search?: string
}

// Отримати список нотаток з пагінацією та пошуком
export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<Note[]> => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params: { page, perPage, search },
  })
  return response.data.notes as Note[] // якщо бекенд повертає { notes: Note[], totalCount: number }
}

// Створити нову нотатку
export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const response = await axios.post(API_URL, note, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  return response.data as Note
}

// Видалити нотатку за ID
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  return response.data as Note
}
