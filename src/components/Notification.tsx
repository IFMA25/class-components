import { useStore } from '@store/useStore';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { useCountriesData } from '@utils/useCountriesData';
import Loader from './Loader';

const Notification = () => {
  const { selected, countriesData, clearAll, setCountriesData } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const [, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const { getCountriesByNames } = useCountriesData({
    onTotalPage: setTotalPages,
  });

  useEffect(() => {
    if (selected.length === 0) return;

    setLoading(true);

    getCountriesByNames(selected)
      .then((data) => {
        if (data) {
          setCountriesData(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selected, getCountriesByNames, setCountriesData]);

  useEffect(() => {
    setIsVisible(selected.length > 0);
  }, [selected]);

  const exportToCSV = () => {
    if (countriesData.length === 0) return;

    const headers = ['Name', 'Capital', 'Population', 'Flag URL'];
    const rows = countriesData.map((country) => [
      `"${country.name}"`,
      `"${country.capital}"`,
      `"${country.population}"`,
      `"${country.flag}"`,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');
    const fileName = `${selected.length}_selected_countries.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
  };

  if (!isVisible) return null;

  return (
    <div className="notification">
      <button className="close-button" onClick={() => setIsVisible(false)}>
        ×
      </button>
      <p>
        Selected countries: <strong>{selected.length}</strong>
      </p>
      {loading ? (
        <div className="notification-loading">
          <Loader />
          <p>Loading selected countries...</p>
        </div>
      ) : (
        <div className="notification-buttons">
          <button onClick={clearAll}>Clear all</button>
          <button onClick={exportToCSV}>Export to CSV</button>
        </div>
      )}
    </div>
  );
};

export default Notification;
