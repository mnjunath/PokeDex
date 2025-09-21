import { useEffect, useState } from 'react';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon.jsx';
import axios from 'axios'; // typo fixed from axions → axios

function PokemonList() {
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

    const [pokemonList, setPokemonList] = useState([]);
    const [pokedexURL, setPokedexURL] = useState(DEFAULT_URL);
    const [nextURL, setNextURL] = useState(null);
    const [prevURL, setPrevURL] = useState(null);

    async function downloadPokemon() {
        const response = await axios.get(pokedexURL);

        const pokemonResults = response.data.results;
        setNextURL(response.data.next);
        setPrevURL(response.data.previous);

        const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonListData = await axios.all(pokemonPromise);

        const pokemonFinalList = pokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default 
                    || pokemon.sprites.other['official-artwork'].front_default 
                    || pokemon.sprites.front_default,
                type: pokemon.types
            };
        });

        setPokemonList(pokemonFinalList);
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokedexURL]);

    return (
        <div className='pokemon-list-wrapper'>
            <div><h1>Pokemon List</h1></div>
            <div className='page-controls'>
                <button disabled={!prevURL} onClick={() => setPokedexURL(prevURL)}>Prev</button>
                <button disabled={!nextURL} onClick={() => setPokedexURL(nextURL)}>Next</button>
            </div>
            <div className='pokemon-list'>
                {pokemonList.map(pokemon => (
                    <Pokemon 
                        key={pokemon.id} 
                        name={pokemon.name} 
                        image={pokemon.image} 
                        id={pokemon.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default PokemonList;
