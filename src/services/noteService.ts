import axios from 'axios'
import type { NotesResponse } from '../types/note'

const API_URL = 'https://notehub-public.goit.study/api/notes'
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN


interface FetchNotesParams {
  page: number
  perPage: number
  search?: string
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<NotesResponse> => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      page,
      perPage,
      search,
    },
  })


  return response.data as NotesResponse
}


