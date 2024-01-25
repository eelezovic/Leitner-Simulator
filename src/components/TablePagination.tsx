import styles from './TablePagination.module.css'; 

type TablePaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

function TablePagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: TablePaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className={styles.paginationContainer}>
      <button className={styles.paginationButton} onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>
        &laquo;
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.paginationButton} ${currentPage === page ? styles.activePage : ''}`}
        >
          {page}
        </button>
      ))}
      <button className={styles.paginationButton} onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
        &raquo;
      </button>
    </div>
  );
}


export default TablePagination;
