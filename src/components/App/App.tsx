
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'

import css from './App.module.css'

import NoteList from '../NoteList/NoteList'
import SearchBox from '../SearchBox/SearchBox'
import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'

import { fetchNotes } from '../../services/noteService'
import type { NotesResponse } from '../../types/note'


const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)


  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

 
  // Запит до бекенду
 
const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
  queryKey: ['notes', currentPage, debouncedSearchTerm],
  queryFn: () =>
    fetchNotes({
      page: currentPage,
      perPage: 12,
      search: debouncedSearchTerm,
    }),
})

  // Логіка для loading/error

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading notes</p>
  }

 
  const pageCount = data?.totalPages ?? 1

  return (
    <div className={css.app}>
   
      <header className={css.toolbar}>
     
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


        {pageCount > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
          />
        )}

 
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

    <NoteList
  searchTerm={debouncedSearchTerm}
  currentPage={currentPage}
  setPageCount={() => {}} 
/>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}

export default App


