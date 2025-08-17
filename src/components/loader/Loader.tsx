import styles from './style.module.css';

const Loader = () => {
  return (
    <p className={styles.loader}>
      Loading
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </p>
  );
};

export default Loader;
