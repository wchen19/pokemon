import React, { useEffect, useState } from 'react';
import { pokemons } from '../../api/api';
import './CatchPokemon.css';

const CatchPokemon = () => {
  const [state, setState] = useState('start');
  const [number, setNumber] = useState(0);
  const [chances, setChances] = useState(3);
  const [randomNum, setRandomNum] = useState(0);
  const [name, setName] = useState();
  const [msg, setMsg] = useState('');

  const generateRandomNum = () => {
    const num = Math.floor(Math.random() * 20) + 1;
    setRandomNum(num);
  };

  const guessNum = () => {
    if (number === randomNum) {
      setState('win');
    } else if (number <= randomNum) {
      setChances(chances - 1);
      setMsg(`Wrong guess, ${number} is too low.`);
      setNumber(0);
      if (chances === 1) {
        setState('lose');
      }
    } else if (number >= randomNum) {
      setChances(chances - 1);
      setMsg(`Wrong guess ${number} is too high.`);
      setNumber(0);
      if (chances === 1) {
        setState('lose');
      }
    }
  };

  useEffect(() => {
    const pokemon = () => {
      const wildPokemons = pokemons.filter(
        (pokemon) => !pokemon.captured && pokemon
      );
      const num = Math.floor(Math.random() * wildPokemons.length);
      setName(wildPokemons[num].name);
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
      {state === 'start' ? (
        <div className='game-box'>
          <div className='desc'>
            To capture the wild {name} you need to correctly guess the random
            number between 1 - 20 within 3 chances, if failed the wild {name}{' '}
            will run away.
          </div>
          <div
            className='start-btn'
            onClick={() => {
              setState('guess');
              generateRandomNum();
            }}
          >
            Start
          </div>
        </div>
      ) : state === 'guess' ? (
        <div className='game-box'>
          <div className='chances'>
            <div className='chance'>{chances === 3 ? 'O' : 'X'}</div>
            <div className='chance'>{chances >= 2 ? 'O' : 'X'}</div>
            <div className='chance'>{chances >= 1 ? 'O' : 'X'}</div>
          </div>
          <div className='hint'>{msg !== '' && msg}</div>
          <div className='input'>
            <input
              type='number'
              value={String(number)}
              onChange={(e) => setNumber(Number(e.target.value))}
            />
            <div
              className='submit-btn'
              onClick={() => {
                guessNum();
              }}
            >
              Guess
            </div>
          </div>
        </div>
      ) : state === 'win' ? (
        <div className='win-box'>
          <div className='win'>
            You did it! The correct number is {randomNum}.
          </div>
          <div className='again-btn'>Search another wild pokemon</div>
        </div>
      ) : (
        state === 'lose' && (
          <div className='lose-box'>
            <div className='lose'>
              Ouch, almost got it! The correct number is {randomNum}.
            </div>
            <div className='retry-btn'>Search another wild pokemon</div>
          </div>
        )
      )}
    </div>
  );
};

export default CatchPokemon;
