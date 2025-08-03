import fetchWikidataInfo from '@utils/wikiData';
import { WikiData } from '@types';

const LIMIT = 6;
const API_KEY = 'd5ebf57eb0msh4ef41a534f69977p199d40jsna3a04db98b72';
const API_HOST = 'wft-geo-db.p.rapidapi.com';

export async function fetchCountries(value: string, page: number) {
  const offset = page * LIMIT;

  const url = value.trim()
    ? `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=${LIMIT}&namePrefix=${value}`
    : `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?offset=${offset}&limit=${LIMIT}`;

  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
  });

  const fetchData = await res.json();

  if (!Array.isArray(fetchData.data)) return { countries: [], totalCount: 0 };

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
  console.log(countries, fetchData.metadata.totalCount);

  return {
    countries,
    totalCount: fetchData.metadata.totalCount,
  };
}
