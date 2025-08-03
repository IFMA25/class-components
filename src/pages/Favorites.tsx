import { useEffect, useState } from 'react';
import CardList from '@components/CardList';
import Loader from '@components/Loader';
import { useStore } from '@store/useStore';
import { Store } from '@types';
import { useCountriesData } from '@utils/useCountriesData';

const Favorites = () => {
  const selected = useStore((state: Store) => state.selected);
  const [, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const { result, getCountriesByNames } = useCountriesData({
    onTotalPage: setTotalPages,
  });

  useEffect(() => {
    if (selected.length === 0) return;

    setLoading(true);
    getCountriesByNames(selected).finally(() => setLoading(false));
  }, [selected, getCountriesByNames]);

  return (
    <main>
      <h1>Favorites country</h1>
      <div className="country-list">
        {loading && <Loader />}
        {!loading && result.length > 0 && <CardList data={result} />}
        {!loading && result.length === 0 && <p>Not found</p>}
      </div>
    </main>
  );
};

export default Favorites;
