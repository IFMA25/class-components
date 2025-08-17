import { SearchProps } from '@types';
import { useState, useEffect } from 'react';
import styles from './style.module.css';

function Search({ onSearch, value }: SearchProps & { value: string }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p className={styles.labelSearch}>Enter country name</p>
        <input
          type="text"
          className={styles.inputSearch}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit" data-testid="search">
        Search
      </button>
    </form>
  );
}

export default Search;
