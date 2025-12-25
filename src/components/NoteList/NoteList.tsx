import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import type { NotesResponse } from '../../types/note'
import css from './NoteList.module.css'

interface NoteListProps {
  searchTerm: string
  currentPage: number
  setPageCount: (count: number) => void
}

const NoteList: React.FC<NoteListProps> = ({
  searchTerm,
  currentPage,
  setPageCount,
}) => {
  const perPage = 12

  const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', searchTerm, currentPage],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage,
        search: searchTerm,
      }),
  })

  useEffect(() => {
    if (data?.notes) {
      setPageCount(data.totalPages)
    }
  }, [data, setPageCount])

  if (isLoading) return <p>Loading notes...</p>
  if (isError) return <p>Error loading notes</p>
  if (!data?.notes || data.notes.length === 0) return <p>No notes found</p>

  return (
    <ul className={css.list}>
      {data.notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NoteList


