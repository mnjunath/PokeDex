import './App.css';
import Pokedex from './components/PokeDex/PokeDex.jsx';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails/PokemonDetails.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="*" element={<h1>Wrong URL</h1>} />
      </Routes>
    </>
  )
}

export default App
