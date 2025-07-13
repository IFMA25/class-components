import { Component, createRef } from 'react';
import './App.css';
import Header from '@components/Header';
import CardList from '@components/CardList';

class App extends Component {
  cardListRef = createRef<CardList>();
  handleSearch = () => {
    this.cardListRef.current?.searchData();
  };
  render() {
    return (
      <>
        <Header onSearch={this.handleSearch} />
        <main>
          <CardList ref={this.cardListRef} />
        </main>
      </>
    );
  }
}

export default App;
