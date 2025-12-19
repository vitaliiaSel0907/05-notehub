import React, { useState } from 'react'
import css from './NoteForm.module.css'

interface NoteFormProps {
  onClose: () => void
}

const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('Todo')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Тимчасово просто лог у консоль
    console.log({ title, content, tag })
    onClose()
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className={css.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.select}
          value={tag}
          onChange={e => setTag(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  )
}

export default NoteForm


