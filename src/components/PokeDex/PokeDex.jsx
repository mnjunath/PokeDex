import './pokedex.css';
import Search from '../Search/Search.jsx';
import PokemonList from '../PokemonList/PokemonList.jsx';
import { useState } from 'react';

function pokedex() {

    const [ searchTerm, setSearchTerm ] = useState('');

    return (
        <div className="pokedex-wrapper">
            <h1>POKEDEX</h1>
            <Search updateSearchTerm={setSearchTerm} />
            { <PokemonList />}
        </div>
    )
}

export default pokedex;