'use client';

import { useEffect, useState } from 'react';
import Search from '@components/search/Search';
import CardList from '@components/card-list/CardList';
import Pagination from '@components/pagination/Pagination';
import { useCountriesData } from '@utils/useCountriesData';
import { useLocalStorage } from '@utils/useLocalStorage';
import Loader from '@components/loader/Loader';
import Notification from '@components/notification/Notification';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './home.module.css';
import CountryCard from '@components/country-card/CountryCard';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useLocalStorage('value', '');
  const [loading, setLoading] = useState(false);

  const { searchData, result } = useCountriesData({
    onTotalPage: setTotalPages,
  });

  const details = searchParams?.get('details');
  const currentPage = Math.max(
    0,
    parseInt(searchParams?.get('page') ?? '1', 10) - 1
  );

  useEffect(() => {
    setLoading(true);
    searchData(searchValue, currentPage).finally(() => setLoading(false));
  }, [searchValue, currentPage, searchData]);

  const updateParams = (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    router.push(`/?${query}`);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    updateParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = { page: (newPage + 1).toString() };
    if (details) params.details = details;
    updateParams(params);
  };

  const setDetails = (value: string | null) => {
    const params: Record<string, string> = {
      page: (currentPage + 1).toString(),
    };
    if (value) params.details = value;
    updateParams(params);
  };

  const isCountryPage = Boolean(details);

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.countryList}>
        <Search onSearch={handleSearch} value={searchValue} />
        {loading && <Loader />}
        {!loading && result.length > 0 && (
          <>
            <CardList data={result} setDetails={setDetails} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              changePage={handlePageChange}
            />
          </>
        )}
        {!loading && result.length === 0 && (
          <p className={styles.resultFound}>Country not found</p>
        )}
      </div>

      {isCountryPage && (
        <CountryCard
          details={details ?? ''}
          data={result}
          setDetails={setDetails}
        />
      )}
      <Notification />
    </div>
  );
}
