import { CountryCartProps } from '@types';

function CountryCart({ details, data, setDetails }: CountryCartProps) {
  if (!data) return <div>Loading...</div>;
  if (!details) return null;

  const handleClose = () => {
    setDetails(null);
  };

  const country = data.find(
    (c) => c.name.toLowerCase() === details.toLowerCase()
  );
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
