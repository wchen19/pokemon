import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
              <li>Catch Pokemon</li>
              <li>Pokemon Collection</li>
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
