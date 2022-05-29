import React, { useEffect, useState } from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import './PokeCard.css';

const PokeCard = ({
  name,
  image,
  hp,
  attack,
  defense,
  type,
  captured = false,
  showGallery = false,
}) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    switch (type) {
      case 'Grass':
        setColor('#67F70A');
        break;
      case 'Fire':
        setColor('#F8B80E');
        break;
      case 'Water':
        setColor('#36AFF6');
        break;
      case 'Normal':
        setColor('#CCC9AA');
        break;
      case 'Electric':
        setColor('#FFFA24');
        break;
      case 'Ground':
        setColor('#EDE293');
        break;
      case 'Fighting':
        setColor('#D36063');
        break;
      case 'Rock':
        setColor('#776A3E');
        break;
      case 'Psychich':
        setColor('#F55792');
        break;
      default:
        setColor('gray');
        break;
    }
  }, [type]);

  return (
    <div
      className={`${captured ? 'card disabled' : 'card'}`}
      style={{ background: color, opacity: captured ? 0.5 : 1 }}
    >
      <img src={image} alt={name} />
      <div className='name'>{name}</div>
      {showGallery && (
        <div className='info-section'>
          <div className='info'>
            <div className='hp'>
              <span>HP</span>
              <span>
                <FavoriteIcon />
                {hp}
              </span>
            </div>
            <div className='attack'>
              <span>ATTACK</span>
              <span>
                <BoltIcon />
                {attack}
              </span>
            </div>
            <div className='defense'>
              <span>DEFENSE</span>
              <span>
                <SecurityIcon />
                {defense}
              </span>
            </div>
          </div>
          <div className='type' style={{ color: color }}>
            {type}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeCard;
