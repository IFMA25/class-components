import { PaginationProps } from '@types';
import { Component } from 'react';

class Pagination extends Component<PaginationProps> {
  handlePrevClick = () => {
    const { currentPage, changePage } = this.props;
    if (currentPage > 0) {
      changePage(currentPage - 1);
    }
  };

  handleNextClick = () => {
    const { currentPage, changePage } = this.props;
    changePage(currentPage + 1);
  };

  render() {
    const { currentPage } = this.props;

    return (
      <div className="pagination">
        <button onClick={this.handlePrevClick} disabled={currentPage === 0}>
          {'<<'}
        </button>
        <span className="current-page">{currentPage + 1}</span>
        <button onClick={this.handleNextClick}>{'>>'}</button>
      </div>
    );
  }
}

export default Pagination;