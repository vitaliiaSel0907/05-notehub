import React from 'react'
import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  pageCount: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, pageCount }) => {
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1) // React Paginate нумерує з 0
  }

  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousLabel="<"
      nextLabel=">"
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      breakLabel="..."
      breakClassName={css.pageItem}
      activeClassName={css.active}
    />
  )
}

export default Pagination
