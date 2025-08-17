import Image from 'next/image';
import { CountryCardProps } from '@types';
import styles from './style.module.css';

function CountryCard({ details, data, setDetails }: CountryCardProps) {
  if (!details) return null;

  const handleClose = () => {
    setDetails(null);
  };

  const country = data.find(
    (c) => c.name.toLowerCase() === details.toLowerCase()
  );
  if (!country) return <div>Country not found</div>;

  return (
    <div className={styles.countryDetails}>
      <button onClick={handleClose} className="close-button">
        X
      </button>
      <h2>{country.name}</h2>
      <Image src={country.flag} alt={country.name} width={320} height={200} />
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Population:</strong> {country.population}
      </p>
    </div>
  );
}

export default CountryCard;
