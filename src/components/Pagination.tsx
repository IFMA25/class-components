import { PaginationProps } from '@types';

function Pagination(props: PaginationProps) {
  const { currentPage, changePage, totalPages } = props;

  const handlePrevClick = () => {
    if (currentPage > 0) {
      changePage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage + 1 < totalPages) {
      changePage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevClick} disabled={currentPage === 0}>
        {'<<'}
      </button>
      <span className="current-page">{currentPage + 1}</span>
      <button
        onClick={handleNextClick}
        disabled={currentPage + 1 >= totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
}

export default Pagination;
