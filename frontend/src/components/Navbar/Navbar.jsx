import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navClick = (e) => {
    let active = document.getElementsByClassName('active');
    if (active.length !== 0) active[0].classList.remove('active');
    let target = e.target.querySelector('div');
    target.classList.add('active');
  };

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
              <li onClick={navClick}>
                Catch Pokemon
                <div></div>
              </li>
              <li onClick={navClick}>
                Pokemon Storage
                <div className='active'></div>
              </li>
            </ul>
            <div className='user' onClick={() => setIsLoggedIn(false)}>
              Wilbert Chen
            </div>
          </>
        ) : (
          <div className='login' onClick={() => setIsLoggedIn(true)}>
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
