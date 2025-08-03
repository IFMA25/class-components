import { ThemeContextType } from '@types';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextType | null>(null);
