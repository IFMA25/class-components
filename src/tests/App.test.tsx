import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PaginationProps } from '@types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CardListMock, searchDataMock } from './mock-utils/CardListMock';
import App from '../App';

vi.mock('@components/CardList', () => ({
  default: CardListMock,
}));

vi.mock('@components/Header', () => ({
  default: ({ onSearch }: { onSearch: () => void }) => (
    <button onClick={onSearch}>Search</button>
  ),
}));

vi.mock('@components/Pagination', () => ({
  default: ({ currentPage, totalPages, changePage }: PaginationProps) => (
    <div>
      <button
        aria-label="prev"
        disabled={currentPage === 0}
        onClick={() => changePage(currentPage - 1)}
      >
        {'<<'}
      </button>
      <span>{currentPage + 1}</span>
      <button
        aria-label="next"
        disabled={currentPage + 1 >= totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        {'>>'}
      </button>
    </div>
  ),
}));

beforeEach(() => {
  searchDataMock.mockClear();
  localStorage.clear();
});

describe('App Component', () => {
  it('render Header, CardList и Pagination', () => {
    render(<App />);

    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('CardList Mock')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('by default sets currentPage from localStorage', () => {
    localStorage.setItem('page', '3');
    render(<App />);
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('calls searchData when search is triggered', async () => {
    render(<App />);
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(searchDataMock).toHaveBeenCalled();
    });
  });
});
