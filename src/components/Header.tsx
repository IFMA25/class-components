import { Component, createRef } from 'react';
import type { HeaderProps } from '@types';

class Header extends Component<HeaderProps> {
  inputRef = createRef<HTMLInputElement>();

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('value', this.inputRef.current?.value || '');
    this.props.onSearch();
  };
  render() {
    return (
      <header className="header">
        <form onSubmit={this.handleSubmit}>
          <label>
            <p className="label-search">Enter country name</p>
            <input
              type="text"
              className="input-search"
              defaultValue={localStorage.getItem('value') || ''}
              ref={this.inputRef}
            />
          </label>
          <button type="submit" className="button-search">
            Search
          </button>
        </form>
      </header>
    );
  }
}

export default Header;
