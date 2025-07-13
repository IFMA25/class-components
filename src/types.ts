export type HeaderProps = {
  onSearch: () => void;
};

type ItemData = {
  name: string;
  flag: string;
  capital: string;
  population: string;
};
export type Data = {
  result: Array<ItemData>;
};

export type WikiData = {
    code: string;
    currencyCodes: string[];
    name: string;
    wikiDataId: string
}