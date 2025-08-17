'use client';

import { useStore } from '@store/useStore';
import { useEffect, useRef, useState } from 'react';
import Loader from '@components/loader/Loader';
import styles from './style.module.css';

const Notification = () => {
  const { selected, clearAll } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const downloadCSVRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setIsVisible(selected.length > 0);
  }, [selected]);

  const exportToCSV = async () => {
    if (!selected.length) return;

    setLoading(true);
    try {
      const params = selected
        .map((name) => `name=${encodeURIComponent(name)}`)
        .join('&');
      const res = await fetch(`/api/export-csv?${params}`);

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        if (downloadCSVRef.current) {
          downloadCSVRef.current.href = url;
          downloadCSVRef.current.download = `${selected.length}_selected_countries.csv`;
          downloadCSVRef.current.click();
          window.URL.revokeObjectURL(url);
        }
      } else {
        throw new Error('Error generating CSV');
      }
    } catch (err) {
      console.error('Error generating CSV', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.notification}>
      <button className="close-button" onClick={() => setIsVisible(false)}>
        X
      </button>
      <p>
        Selected countries: <strong>{selected.length}</strong>
      </p>
      {loading ? (
        <div>
          <Loader />
          <p>Loading selected countries...</p>
        </div>
      ) : (
        <div className={styles.notificationButtons}>
          <button onClick={clearAll}>Clear all</button>
          <button onClick={exportToCSV}>Export to CSV</button>
        </div>
      )}
      <a ref={downloadCSVRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Notification;
