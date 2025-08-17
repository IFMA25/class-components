'use client';

import Link from 'next/link';
import ThemeButton from '../theme/ThemeButton';
import { useTheme } from '@utils/useTheme';
import { usePathname } from 'next/navigation';
import styles from './style.module.css';

export default function Header() {
  const { theme } = useTheme();
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <nav className={styles.headerNav}>
        <Link href="/" className={linkClass('/')}>
          Home
        </Link>
        <Link href="/favorites" className={linkClass('/favorites')}>
          Favorites
        </Link>
        <Link href="/about" className={linkClass('/about')}>
          About
        </Link>
      </nav>
      <ThemeButton />
    </header>
  );
}
