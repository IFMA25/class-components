import { SearchProps } from '@types';
import { useRef } from 'react';

function Search({ onSearch }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value || '';
    localStorage.setItem('value', inputValue);
    onSearch(inputValue);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p className="label-search">Enter country name</p>
        <input
          type="text"
          className="input-search"
          defaultValue={localStorage.getItem('value') || ''}
          ref={inputRef}
        />
      </label>
      <button type="submit" className="button-search" data-testid="search">
        Search
      </button>
    </form>
  );
}

export default Search;
