import React, { useState } from 'react';
import './GameBox.css';

const GameBox = ({ name, state, setState }) => {
  const [chances, setChances] = useState(3);
  const [randomNum, setRandomNum] = useState(0);
  const [number, setNumber] = useState(0);
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

  const handleClick = () => {
    switch (state) {
      case 'start':
        setState('guess');
        generateRandomNum();
        break;
      case 'guess':
        guessNum();
        break;
      default:
        break;
    }
  };

  return (
    <div className='game-box'>
      {state === 'start' ? (
        <div className='desc'>
          To capture the wild {name} you need to correctly guess the random
          number between 1 - 20 within 3 chances, if failed the wild {name} will
          run away.
        </div>
      ) : state === 'guess' ? (
        <>
          <div className='chances'>
            <div className='chance'>{chances === 3 ? 'O' : 'X'}</div>
            <div className='chance'>{chances >= 2 ? 'O' : 'X'}</div>
            <div className='chance'>{chances >= 1 ? 'O' : 'X'}</div>
          </div>
          <div className='desc'>{msg !== '' && msg}</div>
          <div className='input'>
            <input
              type='number'
              value={String(number)}
              onChange={(e) => setNumber(Number(e.target.value))}
            />
          </div>
        </>
      ) : state === 'win' ? (
        <div className='desc'>
          You did it! The correct number is {randomNum}.
        </div>
      ) : (
        state === 'lose' && (
          <div className='desc'>
            Ouch, almost got it! The correct number is {randomNum}.
          </div>
        )
      )}
      <div className='btn' onClick={handleClick}>
        {state === 'start'
          ? 'Start'
          : state === 'guess'
          ? 'Guess'
          : state === 'win'
          ? 'Search another wild pokemon'
          : state === 'lose' && 'Search another wild pokemon'}
      </div>
    </div>
  );
};

export default GameBox;
