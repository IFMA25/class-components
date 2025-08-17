import Header from '@components/header/Header';
import Link from 'next/link';

function App() {
  return (
    <>
      <Header />
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/favorites">Favorites</Link>
    </>
  );
}
export default App;
