import React, { useState } from 'react'
import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
import SearchBox from '../SearchBox/SearchBox'
import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1) // додали стан для кількості сторінок

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Пагінація */}
        {pageCount > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
          />
        )}

        {/* Кнопка створення нотатки */}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {/* NoteList передаємо setPageCount для динамічної пагінації */}
      <NoteList
        searchTerm={searchTerm}
        currentPage={currentPage}
        setPageCount={setPageCount}
      />

      {/* Модальне вікно з формою */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}

export default App

