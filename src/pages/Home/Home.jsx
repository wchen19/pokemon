import React, { useEffect, useState } from 'react';
import PokeCard from '../../components/PokeCard/PokeCard';
// import { pokemons } from '../../api/api';
import './Home.css';
import useToken, { API_URL } from '../../api/api';
import axios from 'axios';

const Home = () => {
  const { token } = useToken();
  const [pokemons, setPokemons] = useState([]);
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

  const getAllPokemon = async () => {
    try {
      const item = await axios.get(`${API_URL}pokemon/allpokemon`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (item?.status === 200) {
        setPokemons(item.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPokemon = async () => {
    try {
      const item = await axios.get(`${API_URL}pokemon/mypokemon`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (item?.status === 200) {
        setPokemons(item.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token !== undefined) {
      showGallery ? getAllPokemon() : getMyPokemon();
    }
  }, [showGallery]);

  const renderElement = () => {
    if (token !== undefined) {
      if (showGallery) {
        return pokemons.map((pokemon, key) => (
          <PokeCard key={key} pokemon={pokemon} />
        ));
      } else {
        return pokemons.map(
          (pokemon, key) =>
            pokemon.captured && (
              <PokeCard key={key} pokemon={pokemon} showData={true} />
            )
        );
      }
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
      <div className='poke-list'>{renderElement()}</div>
    </div>
  );
};

export default Home;
