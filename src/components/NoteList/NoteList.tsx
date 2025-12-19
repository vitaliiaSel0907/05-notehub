import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import type { Note } from '../../types/note'
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

  const { data, isLoading, isError } = useQuery<Note[], Error>({
    queryKey: ['notes', searchTerm, currentPage],
    queryFn: () =>
      fetchNotes({ page: currentPage, perPage, search: searchTerm }),
  })

  
  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.length / perPage)) 
    }
  }, [data, perPage, setPageCount])

  if (isLoading) return <p>Loading notes...</p>
  if (isError) return <p>Error loading notes!</p>
  if (!data || data.length === 0) return <p>No notes found</p>

  return (
    <ul className={css.list}>
      {data.map((note: Note) => (
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
