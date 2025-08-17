'use client';

import { useEffect, useState } from 'react';
import Search from '../components/Search';
import CardList from '@components/CardList';
import Pagination from '@components/Pagination';
import CountryCart from '@components/CountryCart';
import Loader from '@components/Loader';
import Notification from '@components/Notification';
import { useLocalStorage } from '@utils/useLocalStorage';
import './home.module.css';

const LIMIT = 6;

export default function Home() {
  const [searchValue, setSearchValue] = useLocalStorage('value', '');
  const [countries, setCountries] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [details, setDetails] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch(
        `/api/countries?search=${searchValue}&page=${currentPage + 1}`
      );
      const data = await res.json();
      setCountries(data.countries);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchValue, currentPage]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const isCountryPage = Boolean(details);

  return (
    <main>
      <div className="country-list">
        <Search onSearch={handleSearch} value={searchValue} />
        {isLoading && <Loader />}
        {isError && <p>Error data fetch</p>}
        {!isLoading && countries.length > 0 && (
          <>
            <CardList data={countries} setDetails={setDetails} />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / LIMIT)}
              changePage={handlePageChange}
            />
          </>
        )}
        {!isLoading && countries.length === 0 && (
          <p className="result-found">Country not found</p>
        )}
      </div>

      {isCountryPage && (
        <div className="country-details">
          <CountryCart
            details={details}
            data={countries}
            setDetails={setDetails}
          />
        </div>
      )}
      <Notification />
    </main>
  );
}
