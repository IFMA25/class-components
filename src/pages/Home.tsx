import { useEffect, useState } from 'react';
import Search from './Search';
import CardList from '@components/CardList';
import Pagination from '@components/Pagination';
import { useCountriesData } from '@utils/useCountriesData';
import './Home.css';
import { Outlet } from 'react-router-dom';

function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState(() => {
    return localStorage.getItem('value') || '';
  });
  const [loading, setLoading] = useState(false);
  const { searchData, result } = useCountriesData({
    onTotalPage: setTotalPages,
  });

  useEffect(() => {
    setLoading(true);
    searchData(searchValue, currentPage).finally(() => setLoading(false));
  }, [searchValue, currentPage]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    localStorage.setItem('value', value);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <main>
        <div>
          <Search onSearch={handleSearch} />
          {loading && (
            <p className="loader">
              Loading<span>.</span>
              <span>.</span>
              <span>.</span>
            </p>
          )}
        {!loading && result.length > 0 && <CardList data={result} />}
          {!loading && result.length === 0 && (
            <p className="result-found">Country not found</p>
        )}
      </div>
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={handlePageChange}
        />
    </main>
      <div>
      <Outlet context={{ countries: result }} />
      </div>
  </>
  );
}

export default Home;
