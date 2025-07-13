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

export type CardListProps = {
  currentPage: number;
  onTotalPage: (totalPages: number) => void;
}