import { CardListProps } from '@types';
import './style.css';

function CardList({ data, setDetails }: CardListProps) {
  return (
    <ul className="card-list">
      {data.map((item) => (
        <li
          key={item.name}
          onClick={() => setDetails(item.name)}
          className="card-item"
        >
          <div className="card-img">
            <img src={item.flag} alt={item.name} />
          </div>
          <div className="card-info">
            <h3>{item.name}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CardList;
