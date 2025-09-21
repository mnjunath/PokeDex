import { useEffect, useState } from 'react';
import './PokemonDetails.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PokemonDetails() {
  const { id } = useParams();

  const POKEMON_DETAILS_URL = `https://pokeapi.co/api/v2/pokemon/`;

  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  async function downloadPokemon() {
    try {
      const response = await axios.get(POKEMON_DETAILS_URL + id);
      const data = response.data;
      setPokemon({
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types,
        image: data.sprites.other.dream_world.front_default,
      });
    } catch (err) {
      setError("Failed to fetch Pokémon details. Please try again.");
      console.error(err);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, [id]);

  return (
    <>
      <h1 className='pokedex-redirector'>
        <Link to="/">PokeDex</Link>
      </h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon ? (
        <div className="pokemon-details-wrapper">
          <div className="pokemon-detail-name">{pokemon.name}</div>
          <div className="pokemon-image">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
          <div className="pokemon-stats">
            <div className="pokemon-height">Height: {pokemon.height}</div>
            <div className="pokemon-weight">Weight: {pokemon.weight}</div>
          </div>
          <div className="pokemon-types">
            <h1>Types:</h1>
            {pokemon.types.map((t) => (
              <span className="type" key={t.type.name}>
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      ) : !error && (
        <p>Loading Pokémon details...</p>
      )}
    </>
  );
}

export default PokemonDetails;
