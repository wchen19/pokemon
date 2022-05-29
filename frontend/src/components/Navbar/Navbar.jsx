import React, { useEffect } from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navClick = (e) => {
    let active = document.getElementsByClassName('active');
    if (active.length !== 0) active[0].classList.remove('active');
    let target = e.target.querySelector('div');
    target.classList.add('active');
  };

  useEffect(() => {
    if (window.location.pathname === '/catch-pokemon') {
      const catchPokemon = document.getElementById('catch');
      let active = document.getElementsByClassName('active');
      if (active.length !== 0) active[0].classList.remove('active');
      catchPokemon.querySelector('div').classList.add('active');
    }
  }, []);

  return (
    <div className='navbar'>
      <div className='left-navbar'>
        <img src={Logo} alt='Logo' />
        {/* <span>Catch 'em All</span> */}
      </div>
      <div className='right-navbar'>
        {isLoggedIn ? (
          <>
            <ul>
              <Link to={'/catch-pokemon'}>
                <li id='catch' onClick={navClick}>
                  Catch Pokemon
                  <div></div>
                </li>
              </Link>
              <Link to={'/'}>
                <li onClick={navClick}>
                  Pokemon Storage
                  <div className='active'></div>
                </li>
              </Link>
            </ul>
            <div
              className='user'
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.setItem('isLoggedIn', JSON.stringify(false));
              }}
            >
              Wilbert Chen
            </div>
          </>
        ) : (
          <Link to={'/login'}>
            <div className='login'>Login</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
