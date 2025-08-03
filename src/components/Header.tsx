import { NavLink } from 'react-router-dom';
import ThemeButton from './ThemeButton';
import { useTheme } from '@utils/useTheme';

function Header() {
  const { theme } = useTheme();

  return (
    <header className={`header ${theme}`}>
      <nav className="header-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          Favorites
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          About
        </NavLink>
      </nav>
      <ThemeButton />
    </header>
  );
}

export default Header;
