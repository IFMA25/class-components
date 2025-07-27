import { useEffect, useState } from 'react';
import Search from './Search';
import CardList from '@components/CardList';
import Pagination from '@components/Pagination';
import { useCountriesData } from '@utils/useCountriesData';
import './Home.css';
import { Outlet, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const isCountryPage = location.pathname.includes('/country/');

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
    <main>
      <div className="country-list">
        <Search onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {!loading && result.length > 0 && <CardList data={result} />}
        {!loading && result.length === 0 && <p>Country not found</p>}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={handlePageChange}
        />
      </div>

      {isCountryPage && (
        <div className="country-details">
          <Outlet context={{ data: result }} />
        </div>
      )}
    </main>
  );
}

export default Home;
