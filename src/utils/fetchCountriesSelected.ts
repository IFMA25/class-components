import { fetchCountries } from './fetchCountries';
import { wait } from './wait';

export const fetchCountriesSelected = async (names: string[]) => {
  const results = [];
  for (const name of names) {
    const { countries } = await fetchCountries(name.toString(), 0);
    results.push(countries[0] || null);
    await wait(200);
  }
  return results.filter(Boolean);
};
