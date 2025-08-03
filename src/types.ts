export type HeaderProps = {
  onSearch: (value: string) => void;
};

export type ItemData = {
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
  wikiDataId: string;
};

export type AppState = {
  currentPage: number;
  totalPages: number;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
};

export type SearchProps = {
  onSearch: (value: string) => void;
};

export type CardListProps = {
  data: ItemData[];
  setDetails?: (name: string) => void;
};

export type CountryCartProps = {
  details: string | null;
  data: ItemData[];
  setDetails: (value: string | null) => void;
};

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export type Store = {
  selected: string[];
  countriesData: ItemData[];
  toggleSelected: (name: string) => void;
  setCountriesData: (data: ItemData[]) => void;
  clearAll: () => void;
};
