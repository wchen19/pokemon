import React, { useEffect, useState } from 'react';
import { pokemons } from '../../api/api';
import GameBox from '../../components/GameBox/GameBox';
import './CatchPokemon.css';

const CatchPokemon = () => {
  const [state, setState] = useState('start');
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [captured, setCaptured] = useState();

  useEffect(() => {
    const pokemon = () => {
      const wildPokemons = pokemons.filter(
        (pokemon) => !pokemon.captured && pokemon
      );
      const num = Math.floor(Math.random() * wildPokemons.length);
      setName(wildPokemons[num].name);
      setImage(wildPokemons[num].image);
      setCaptured(wildPokemons[num].captured);
    };
    pokemon();
  }, []);

  return (
    <div className='catch-pokemon'>
      <div className='title'>
        {state === 'start' || state === 'guess'
          ? `A wild ${name} has appeared!`
          : state === 'win'
          ? `Gotcha!
      ${name} was caught!`
          : state === 'lose' && `Oh no! The wild ${name} fled.`}
      </div>
      <img src={image} alt={name} />
      <GameBox
        name={name}
        captured={captured}
        state={state}
        setState={setState}
      />
    </div>
  );
};

export default CatchPokemon;
