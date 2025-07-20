// __tests__/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@components/Header';
import { describe, it, beforeEach, vi, expect } from 'vitest';

const onSearch = vi.fn();

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    onSearch.mockClear();
  });

  it('test search input and button', () => {
    render(<Header onSearch={onSearch} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    const button = screen.getByTestId('search');

    expect(button).toBeInTheDocument();
  });

  it('local storage content is displayed in the search input', () => {
    localStorage.setItem('value', 'Test Country');
    render(<Header onSearch={onSearch} />);

    expect(screen.getByRole('textbox')).toHaveValue('Test Country');
  });

  it('if localStorage is empty that search value is empty too', () => {
    localStorage.removeItem('value');
    render(<Header onSearch={onSearch} />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('when submitted is called onSearch', () => {
    render(<Header onSearch={onSearch} />);
    const button = screen.getByTestId('search');
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalled();
  });

  it('changes value in localStorage on new search', () => {
    localStorage.setItem('value', 'Country-1');
    render(<Header onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'Country-2' } });
    fireEvent.click(button);

    expect(localStorage.getItem('value')).toBe('Country-2');
  });
});
