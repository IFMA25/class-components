const CODE_CAPITAL = 'P36';
const CODE_POPULATION = 'P1082';

export default async function fetchWikidataInfo(wikiDataId: string) {
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${wikiDataId}.json`;
  const res = await fetch(url);
  const data = await res.json();

  const claims = data.entities[wikiDataId].claims;

  const capitalClaim = claims[CODE_CAPITAL]?.[0];
  const capitalId = capitalClaim?.mainsnak.datavalue?.value?.id;

  const populationClaim = claims[CODE_POPULATION]?.[0];

  let population: number | null = null;
  if (populationClaim) {
    const popValue = populationClaim.mainsnak.datavalue.value;
    population = popValue.amount ? parseInt(popValue.amount) : null;
  }

  let capitalName: string | null = null;
  if (capitalId) {
    const capitalUrl = `https://www.wikidata.org/wiki/Special:EntityData/${capitalId}.json`;
    const capitalRes = await fetch(capitalUrl);
    const capitalData = await capitalRes.json();

    const capitalEntity = capitalData.entities[capitalId];
    capitalName = capitalEntity?.labels?.en?.value || null;
  }

  return { capitalName, population };
}
