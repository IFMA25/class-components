import { Store } from '@types';
import { create } from 'zustand';

export const useStore = create<Store>((set) => ({
  selected: [],
  countriesData: [],
  toggleSelected: (name) =>
    set((state) => ({
      selected: state.selected.includes(name)
        ? state.selected.filter((n) => n !== name)
        : [...state.selected, name],
    })),
  setCountriesData: (data) => set({ countriesData: data }),
  clearAll: () => set({ selected: [], countriesData: [] }),
}));
