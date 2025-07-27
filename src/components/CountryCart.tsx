import { ItemData } from '@types';
import fetchWikidataInfo from '@utils/wikiData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CountryCart() {
  const { countryName } = useParams();
  const [country, setCountry] = useState<ItemData | null>(null);

  useEffect(() => {
    if (countryName) {
      
    }
  }, [countryName]);

  if (!country) return <div>Loading...</div>;
  return (
    <>
      <div className="card-img">
        <img src={country.flag} alt={country.name} />
      </div>
      <div className="card-detail">
        <h2>{country.name}</h2>
        <img src={country.flag} alt={country.name} />
        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
        <p>
          <strong>Population:</strong> {country.population}
        </p>
      </div>
    </>
  );
}

export default CountryCart;
