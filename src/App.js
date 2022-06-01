import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import CatchPokemon from './pages/CatchPokemon/CatchPokemon';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/catch-pokemon' element={<CatchPokemon />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
