import React from 'react';
import './Home.css';

const Home = () => {
  const tabClick = (e) => {
    let active = document.getElementsByClassName('active-tab');
    if (active.length !== 0) active[0].classList.remove('active-tab');
    let target = e.target.querySelector('div');
    target.classList.add('active-tab');
    console.log(target);
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
      <div className='poke-list'></div>
    </div>
  );
};

export default Home;
