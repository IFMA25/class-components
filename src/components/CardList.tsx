import { CardListProps } from '@types';
import { useNavigate } from 'react-router-dom';
import './style.css';

function CardList({ data }: CardListProps) {
  const navigate = useNavigate();

  const handleClick = (name: string) => {
    navigate(`/countries/${encodeURIComponent(name.toLowerCase())}`);
  };

  return (
    <ul className="card-list">
      {data.map((item, index) => (
        <li key={index} onClick={() => handleClick(item.name)}>
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
