import { useCallback, useState } from 'react';
import { Data } from '@types';
import { fetchCountries } from '@utils/fetchCountries';
import { fetchCountriesSelected } from './fetchCountriesSelected';

const LIMIT = 6;

export function useCountriesData({
  onTotalPage,
}: {
  onTotalPage: (total: number) => void;
}) {
  const [result, setResult] = useState<Data['result']>([]);

  const searchData = useCallback(
    async (value: string, page: number) => {
      const { countries, totalCount } = await fetchCountries(value, page);
      setResult(countries);
      const totalPages = Math.ceil(totalCount / LIMIT);
      onTotalPage(totalPages);
    },
    [onTotalPage]
  );

  const getCountriesByNames = useCallback(
    async (names: string[]) => {
      if (names.length === 0) {
        setResult([]);
        onTotalPage(0);
        return;
      }

      const results = await fetchCountriesSelected(names);
      setResult(results);
      onTotalPage(1);
    },
    [onTotalPage]
  );

  return { result, searchData, getCountriesByNames };
}
