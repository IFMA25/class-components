import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
