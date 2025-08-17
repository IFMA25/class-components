// __tests__/Header.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect, afterEach } from 'vitest';
import CardList from '@components/card-list/CardList';

const mockTotalPage = vi.fn();

const mockResponse = {
  data: [
    { name: 'Country-1', code: 'test-1', wikiDataId: '1' },
    { name: 'Country-2', code: 'test-2', wikiDataId: '2' },
    { name: 'Country-3', code: 'test-3', wikiDataId: '3' },
  ],
  metadata: { totalCount: 12 },
};

const mockFetch = () =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  });

vi.mock('@utils/wikiData', () => ({
  default: vi.fn((wikiDataId) => {
    if (wikiDataId === '1') {
      return Promise.resolve({ capitalName: 'capital-1', population: 1000 });
    }
    if (wikiDataId === '2') {
      return Promise.resolve({ capitalName: 'capital-2', population: 2000 });
    }
    return Promise.resolve({ capitalName: 'N/A', population: 'N/A' });
  }),
}));

beforeEach(() => {
  localStorage.setItem('value', '');
  mockTotalPage.mockClear();
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('CardList', () => {
  it('renders correct number of items', async () => {
    render(<CardList currentPage={0} onTotalPage={mockTotalPage} />);

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items.length).toBe(3);
    });

    expect(screen.getByText('Country-1')).toBeInTheDocument();
    expect(screen.getByText('Country-2')).toBeInTheDocument();
    expect(screen.getByText('Country-3')).toBeInTheDocument();

    expect(screen.getByText('Capital: capital-1')).toBeInTheDocument();
    expect(screen.getByText('Population: 1000')).toBeInTheDocument();

    expect(screen.getByText('Capital: capital-2')).toBeInTheDocument();
    expect(screen.getByText('Population: 2000')).toBeInTheDocument();

    expect(screen.getByText('Capital: N/A')).toBeInTheDocument();
    expect(screen.getByText('Population: N/A')).toBeInTheDocument();
  });

  it('calls onTotalPage with calculated total pages', async () => {
    render(<CardList currentPage={0} onTotalPage={mockTotalPage} />);

    await waitFor(() => {
      expect(mockTotalPage).toHaveBeenCalledWith(2);
    });
  });
});
