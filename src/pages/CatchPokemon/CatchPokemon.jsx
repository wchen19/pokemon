import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useToken, { API_URL } from '../../api/api';
import GameBox from '../../components/GameBox/GameBox';
import './CatchPokemon.css';

const CatchPokemon = () => {
  const { token } = useToken();
  const [state, setState] = useState('start');
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [wildPokemon, setWildPokemon] = useState({});

  const getWildPokemon = async () => {
    try {
      const wildPokemons = await axios.get(`${API_URL}pokemon/unownedpokemon`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (wildPokemons?.status === 200) {
        const num = Math.floor(Math.random() * wildPokemons.data.length);
        setWildPokemon(wildPokemons.data[num]);
        setName(wildPokemons.data[num].name);
        setImage(wildPokemons.data[num].image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWildPokemon();
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
      <GameBox wildPokemon={wildPokemon} state={state} setState={setState} />
    </div>
  );
};

export default CatchPokemon;
