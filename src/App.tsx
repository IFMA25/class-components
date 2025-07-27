import Header from '@components/Header';
import About from './pages/About';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import CountryCart from '@components/CountryCart';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="country/:countryName" element={<CountryCart />} />
        </Route>
        <Route path="about" element={<About />} />
      </Routes>
    </>
  );
}
export default App;
