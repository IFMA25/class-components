import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination from '@components/Pagination';
import { afterEach } from 'node:test';

const changePageMock = vi.fn();

beforeEach(() => {
  changePageMock.mockClear();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Pagination component', () => {
  it('renders buttons and current page correctly', () => {
    render(
      <Pagination currentPage={2} totalPages={5} changePage={changePageMock} />
    );

    expect(screen.getByText('<<')).toBeInTheDocument();
    expect(screen.getByText('>>')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('disables prev button on first page', () => {
    render(
      <Pagination currentPage={0} totalPages={5} changePage={changePageMock} />
    );
    expect(screen.getByText('<<')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination currentPage={4} totalPages={5} changePage={changePageMock} />
    );
    expect(screen.getByText('>>')).toBeDisabled();
  });

  it('calls changePage', () => {
    render(
      <Pagination currentPage={2} totalPages={5} changePage={changePageMock} />
    );
    fireEvent.click(screen.getByText('<<'));
    expect(changePageMock).toHaveBeenCalled();
  });

  it('calls changePage with currentPage + 1 on next click', () => {
    render(
      <Pagination currentPage={2} totalPages={5} changePage={changePageMock} />
    );
    fireEvent.click(screen.getByText('>>'));
    expect(changePageMock).toHaveBeenCalledWith(3);
  });

  it('does not call changePage if prev button disabled', () => {
    render(
      <Pagination currentPage={0} totalPages={5} changePage={changePageMock} />
    );
    fireEvent.click(screen.getByText('<<'));
    expect(changePageMock).not.toHaveBeenCalled();
  });

  it('does not call changePage if next button disabled', () => {
    render(
      <Pagination currentPage={4} totalPages={5} changePage={changePageMock} />
    );
    fireEvent.click(screen.getByText('>>'));
    expect(changePageMock).not.toHaveBeenCalled();
  });
});
