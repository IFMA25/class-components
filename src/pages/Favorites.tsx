import { useStore } from '@store/useStore';
import CardList from '@components/CardList';
import Loader from '@components/Loader';

const Favorites = () => {
  const countriesData = useStore((state) => state.countriesData);
  const selected = useStore((state) => state.selected);

  const loading = selected.length > 0 && countriesData.length < selected.length;

  return (
    <>
      <h1>Favorites country</h1>
      <main>
        <div className="country-list">
          {loading && <Loader />}
          {!loading && countriesData.length === selected.length && (
            <CardList data={countriesData} />
          )}
          {!loading && countriesData.length === 0 && <p>Not found</p>}
        </div>
      </main>
    </>
  );
};

export default Favorites;
