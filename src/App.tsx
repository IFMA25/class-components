import { Component, createRef } from 'react';
import './App.css';
import Header from '@components/Header';
import CardList from '@components/CardList';
import Pagination from '@components/Pagination';
import { AppState } from '@types';


class App extends Component<{}, AppState> {
  cardListRef = createRef<CardList>();
  
  state: AppState = {
    currentPage: Number(localStorage.getItem('page')) || 0,
  };

  handlePageChange = (newPage: number) => {
    localStorage.setItem('page', newPage.toString());
    this.setState({ currentPage: newPage }, () => {
      this.cardListRef.current?.searchData();
    });
  };

  handleSearch = () => {
    this.setState({ currentPage: 0 }, () => {
      this.cardListRef.current?.searchData();
    });
  };

  render() {
    return (
      <>
        <Header onSearch={this.handleSearch} />
        <main>
          <CardList 
            ref={this.cardListRef} 
            currentPage={this.state.currentPage} 
          />
        </main>
        <Pagination 
          currentPage={this.state.currentPage}
          changePage={this.handlePageChange}
        />
      </>
    );
  }
}

export default App;