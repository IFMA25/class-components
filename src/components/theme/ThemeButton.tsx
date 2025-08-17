import { useTheme } from '@utils/useTheme';
import styles from './style.module.css';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={`${styles.themeBtn} ${styles[theme]}`}
      onClick={toggleTheme}
    ></button>
  );
};

export default ThemeButton;
