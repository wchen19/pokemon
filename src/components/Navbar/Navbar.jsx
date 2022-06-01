import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useToken from '../../api/api';

const Navbar = () => {
  const { token } = useToken();
  const [mediaQuery, setMediaQuery] = useState(
    window.innerWidth > 600 ? false : true
  );

  const navClick = (e) => {
    let active = document.getElementsByClassName('active');
    if (active.length !== 0) active[0].classList.remove('active');
    let target = e.target.querySelector('div');
    target?.classList.add('active');
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.replace(window.location.origin);
  };

  useEffect(() => {
    if (window.location.pathname === '/catch-pokemon' && token !== undefined) {
      const catchPokemon = document.getElementById('catch');
      let active = document.getElementsByClassName('active');
      if (active.length !== 0) active[0].classList.remove('active');
      catchPokemon.querySelector('div').classList.add('active');
    }
  }, [token]);

  const renderElement = () => {
    if (token !== undefined) {
      return (
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
      );
    } else {
      return (
        <ul hidden>
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
      );
    }
  };

  const renderButton = () => {
    if (token !== undefined) {
      return (
        <div className='user' onClick={logout}>
          Logout
        </div>
      );
    } else {
      return (
        <Link to={'/login'}>
          <div className='login'>Login</div>
        </Link>
      );
    }
  };

  useEffect(() => {
    function handleResize(e) {
      if (e.srcElement.innerWidth <= 600) {
        setMediaQuery(true);
      } else {
        setMediaQuery(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(token !== undefined);
  return (
    <div className='navbar'>
      <div className='left-navbar'>
        <Link to={'/'}>
          <img src={Logo} alt='Logo' />
        </Link>
        {mediaQuery && renderButton()}
        {/* <span>Catch 'em All</span> */}
      </div>
      <div className='right-navbar'>
        <ul style={{ display: token === undefined ? 'none' : 'flex' }}>
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

        {!mediaQuery && renderButton()}
      </div>
    </div>
  );
};

export default Navbar;
