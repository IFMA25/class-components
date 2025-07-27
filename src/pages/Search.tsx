import { SearchProps } from '@types';
import { useState, useEffect } from 'react';

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
        <p className="label-search">Enter country name</p>
        <input
          type="text"
          className="input-search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit" className="button-search" data-testid="search">
        Search
      </button>
    </form>
  );
}

export default Search;
