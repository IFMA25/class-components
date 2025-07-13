import { Data, WikiData } from '@types';
import { Component } from 'react';
import fetchWikidataInfo from '@utils/wikiData';

const LIMIT = 6;
const API_KEY = 'd5ebf57eb0msh4ef41a534f69977p199d40jsna3a04db98b72';
const API_HOST = 'wft-geo-db.p.rapidapi.com';

interface CardListProps {
  currentPage: number;
}

class CardList extends Component<CardListProps, Data> {
  state: Data = {
    result: [],
  };

  componentDidMount(): void {
    this.searchData();
  }

  componentDidUpdate(prevProps: CardListProps) {
    if (this.props.currentPage !== prevProps.currentPage) {
      this.searchData();
    }
  }

  searchData = async () => {
    const value = localStorage.getItem('value') || '';
    const offset = this.props.currentPage * LIMIT;
    
    const urlApi = value.trim()
      ? `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?&limit=${LIMIT}&namePrefix=${value}`
      : `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?offset=${offset}&limit=${LIMIT}`;

    try {
      const res = await fetch(urlApi, {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      });
      
      const fetchData = await res.json();
      
      if (!Array.isArray(fetchData.data)) {
        console.error('API error:', fetchData);
        return;
      }

      const countries = await Promise.all(
        fetchData.data.map(async (item: WikiData) => {
          const wikidataInfo = await fetchWikidataInfo(item.wikiDataId);
          return {
            name: item.name,
            flag: `https://flagcdn.com/w320/${item.code.toLowerCase()}.png`,
            capital: wikidataInfo.capitalName || 'N/A',
            population: wikidataInfo.population || 'N/A',
          };
        })
      );
      
      this.setState({ result: countries });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  render() {
    return (
      <ul className="card-list">
        {this.state.result.map((item, index) => (
          <li key={index}>
            <img src={item.flag} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Capital: {item.capital}</p>
            <p>Population: {item.population}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default CardList;