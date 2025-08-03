import { useTheme } from '@utils/useTheme';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className={`theme-btn ${theme}`} onClick={toggleTheme}></button>
  );
};

export default ThemeButton;
