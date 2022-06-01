import React, { useEffect, useState } from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import './PokeCard.css';
import axios from 'axios';
import useToken, { API_URL } from '../../api/api';

const PokeCard = ({ pokemon, showData = false }) => {
  const { token } = useToken();
  const [color, setColor] = useState('');

  useEffect(() => {
    switch (pokemon.type) {
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
  }, [pokemon.type]);

  const releasePokemon = async () => {
    const wildPokemon = { ...pokemon, captured: false, level: 0 };

    try {
      const item = await axios.post(
        `${API_URL}pokemon/addpokemon/${pokemon.id}`,
        wildPokemon,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (item?.status === 201) {
        console.log(item);
      }
    } catch (error) {
      console.log(error);
    }

    window.location.replace(window.location.href);
  };

  return (
    <div
      className={`${!showData && pokemon.captured ? 'card disabled' : 'card'}`}
      style={{
        background: color,
        opacity: !showData && pokemon.captured ? 0.5 : 1,
      }}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <div className='name'>{pokemon.name}</div>
      {showData && (
        <div className='info-section'>
          <div className='info'>
            <div className='hp'>
              <span>HP</span>
              <span>
                <FavoriteIcon />
                {pokemon.hp}
              </span>
            </div>
            <div className='attack'>
              <span>ATTACK</span>
              <span>
                <BoltIcon />
                {pokemon.attack}
              </span>
            </div>
            <div className='defense'>
              <span>DEFENSE</span>
              <span>
                <SecurityIcon />
                {pokemon.defense}
              </span>
            </div>
          </div>
          <div className='level'>Level {pokemon.level}</div>
          {/* <div className='type' style={{ color: color }}>
            Type {type}
          </div> */}
          <div className='release-btn' onClick={releasePokemon}>
            Release Pokemon
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeCard;
