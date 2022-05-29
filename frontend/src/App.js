import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import CatchPokemon from './pages/CatchPokemon/CatchPokemon';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    false || JSON.parse(localStorage.getItem('isLoggedIn'))
  );

  return (
    <div className='app'>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path='/login'
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path='/catch-pokemon' element={<CatchPokemon />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
