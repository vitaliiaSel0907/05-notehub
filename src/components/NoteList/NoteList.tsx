import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '../../services/noteService'
import type { Note } from '../../types/note'
import css from './NoteList.module.css'

interface NoteListProps {
  notes: Note[]
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const handleDelete = (id: string) => {
    mutation.mutate(id)
  }

  if (!notes || notes.length === 0) return <p>No notes found</p>

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NoteList



