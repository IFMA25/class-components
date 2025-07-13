import { Data, WikiData } from '@types';
import { Component } from 'react';
import fetchWikidataInfo from '@utils/wikiData';

const LIMIT = 6;
const API_KEY = 'd5ebf57eb0msh4ef41a534f69977p199d40jsna3a04db98b72';
const API_HOST = 'wft-geo-db.p.rapidapi.com';

class CardList extends Component {
  state: Data = {
    result: [],
  };

  componentDidMount(): void {
    this.searchData();
  }
  searchData = async () => {
    const value = localStorage.getItem('value') || '';
    const urlApi = value.trim()
      ? `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=${LIMIT}&namePrefix=${encodeURIComponent(value)}`
      : `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=${LIMIT}`;
    const res = await fetch(urlApi, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    const fetchData = await res.json();

    const countries = await Promise.all(
      fetchData.data.map(async (item: WikiData) => {
        console.log(item)
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
  };
  render() {
    return (
      <ul className="card-list">
        {this.state.result.map((item, index) => (
          <li key={index}>
            <img src={item.flag} />
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
