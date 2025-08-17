import { useStore } from '@store/useStore';
import { CardListProps } from '@types';
import Image from 'next/image';
import styles from './style.module.css';

function CardList({ data, setDetails }: CardListProps) {
  const selected = useStore((state) => state.selected);
  const toggleSelected = useStore((state) => state.toggleSelected);

  return (
    <ul className={styles.cardList}>
      {data.map((item) => {
        const isChecked = selected.includes(item.name);

        return (
          <li
            key={item.name}
            onClick={() => {
              if (setDetails) {
                setDetails(item.name);
              }
            }}
            className={styles.cardItem}
          >
            <input
              className={styles.favoriteCard}
              type="checkbox"
              checked={isChecked}
              onClick={(e) => e.stopPropagation()}
              onChange={() => {
                toggleSelected(item.name);
              }}
            />
            <div className={styles.cardImg}>
              <Image src={item.flag} alt={item.name} width={320} height={200} />
            </div>
            <div className={styles.cardInfo}>
              <h3>{item.name}</h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CardList;
