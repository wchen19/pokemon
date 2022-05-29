import React, { useState } from 'react';
import PokeCard from '../../components/PokeCard/PokeCard';
import { pokemons } from '../../api/api';
import './Home.css';

const Home = ({ isLoggedIn }) => {
  const [showGallery, setShowGallery] = useState(true);

  const tabClick = (e) => {
    let active = document.getElementsByClassName('active-tab');
    if (active.length !== 0) active[0].classList.remove('active-tab');
    let target = e.target.querySelector('div');
    target.classList.add('active-tab');

    if (e.target.innerText === 'Pokemon Gallery') {
      setShowGallery(true);
    } else {
      setShowGallery(false);
    }
  };

  return (
    <div className='home'>
      <div className='option-tab'>
        <div className='tab' onClick={tabClick}>
          Pokemon Gallery<div className='active-tab'></div>
        </div>
        <div className='tab' onClick={tabClick}>
          My Pokemon<div></div>
        </div>
      </div>
      <div className='poke-list'>
        {isLoggedIn && showGallery
          ? pokemons.map((pokemon, key) => (
              <PokeCard
                key={key}
                name={pokemon.name}
                hp={pokemon.hp}
                attack={pokemon.attack}
                defense={pokemon.defense}
                type={pokemon.type}
                captured={pokemon.captured}
              />
            ))
          : pokemons.map(
              (pokemon, key) =>
                pokemon.captured && (
                  <PokeCard
                    key={key}
                    name={pokemon.name}
                    hp={pokemon.hp}
                    attack={pokemon.attack}
                    defense={pokemon.defense}
                    type={pokemon.type}
                  />
                )
            )}
      </div>
    </div>
  );
};

export default Home;
