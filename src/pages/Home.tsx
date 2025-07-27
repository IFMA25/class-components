import { useEffect, useState } from 'react';
import Search from './Search';
import CardList from '@components/CardList';
import Pagination from '@components/Pagination';
import CountryCart from '@components/CountryCart';
import { useCountriesData } from '@utils/useCountriesData';
import './Home.css';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState(() => {
    return localStorage.getItem('value') || '';
  });
  const [loading, setLoading] = useState(false);
  const { searchData, result } = useCountriesData({
    onTotalPage: setTotalPages,
  });

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: '1' });
    }
  }, []);

  const details = searchParams.get('details');
  const currentPage = Math.max(
    0,
    parseInt(searchParams.get('page') || '1', 10) - 1
  );

  useEffect(() => {
    setLoading(true);
    searchData(searchValue, currentPage).finally(() => setLoading(false));
  }, [searchValue, currentPage]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    localStorage.setItem('value', value);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = { page: (newPage + 1).toString() };
    if (details) params.details = details;
    setSearchParams(params);
  };

  const setDetails = (value: string | null) => {
    const params: Record<string, string> = {
      page: (currentPage + 1).toString(),
    };
    if (value) params.details = value;
    setSearchParams(params);
  };

  const isCountryPage = Boolean(details);

  return (
    <main>
      <div className="country-list">
        <Search onSearch={handleSearch} />
        {loading && <p className="loader">Loading...</p>}
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
        {!loading && result.length === 0 && <p className='result-found'>Country not found</p>}
      </div>

      {isCountryPage && (
        <div className="country-details">
          <CountryCart
            details={details}
            data={result}
            setDetails={setDetails}
          />
        </div>
      )}
    </main>
  );
}

export default Home;
