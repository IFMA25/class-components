import { Store } from '@types';
import { create } from 'zustand';

export const useStore = create<Store>((set) => ({
  selected: [],
  toggleSelected: (name) =>
    set((state) => {
      const isSelected = state.selected.includes(name);
      const newSelected = isSelected
        ? state.selected.filter((n) => n !== name)
        : [...state.selected, name];

      console.log('Selected now:', newSelected);

      return { selected: newSelected };
    }),
}));
