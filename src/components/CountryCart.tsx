import { CardListProps } from '@types';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

function CountryCart() {
  const { countryName } = useParams<{ countryName: string }>();
  const { data } = useOutletContext<CardListProps>();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  if (!data) return <div>Loading...</div>;
  const country = data.find((c) => c.name.toLowerCase() === countryName);
  if (!country) return <div>Country not found</div>;

  return (
    <>
      <button onClick={handleClose}>X</button>
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
