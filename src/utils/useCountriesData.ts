import { useCallback, useState } from 'react';
import { Data } from '@types';
import { fetchCountries } from '@utils/fetchCountries';

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

  return { result, searchData };
}
