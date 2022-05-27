import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import CatchPokemon from './pages/CatchPokemon/CatchPokemon';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      {/* <Home /> */}
      <CatchPokemon />
    </div>
  );
};

export default App;
