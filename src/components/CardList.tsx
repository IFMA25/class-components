import { useStore } from '@store/useStore';
import { CardListProps } from '@types';
import './style.css';

function CardList({ data, setDetails }: CardListProps) {
  const selected = useStore((state) => state.selected);
  const toggleSelected = useStore((state) => state.toggleSelected);

  return (
    <ul className="card-list">
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
            className="card-item"
          >
            <input
              className="favorite-card"
              type="checkbox"
              checked={isChecked}
              onClick={(e) => e.stopPropagation()}
              onChange={() => {
                toggleSelected(item.name);
              }}
            />
            <div className="card-img">
              <img src={item.flag} alt={item.name} />
            </div>
            <div className="card-info">
              <h3>{item.name}</h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CardList;
