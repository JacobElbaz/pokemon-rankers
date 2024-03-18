"use client";
import PokemonCard from "../../components/PokemonCard.js";
import React from "react";
import { getRandomPokemons } from "@/services/pokemonServices.js";

function Battle() {
  const [pokemons, setPokemons] = React.useState([]);
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleClick = async () => {
    const poke = await getRandomPokemons();
    setPokemons(poke);
    console.log("clicked");
  };
  React.useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsPending(true);
      try {
        const poke = await getRandomPokemons();
        setPokemons(poke);
        console.log(poke);
      } catch (error) {
        setError(error);
      }
      setIsPending(false);
    };
    fetchData();
  }, []);

  return (
    <div className="battle-container">
      <h1>Pokémon Battle</h1>
      {isPending && <div>Loading....</div>}
      {error && <div>{error}</div>}
      {pokemons.length > 0 && (
        <div className="cards-container">
          <PokemonCard pokemon={pokemons[0]} handleClick={handleClick} />
          <PokemonCard pokemon={pokemons[1]} handleClick={handleClick} />
        </div>
      )}
      <p className="text">
        Simply choose your favorite from the pair and cast your vote. Your
        opinion matters, as your vote will help determine the ultimate Pokémon
        champion! Keep voting to see which Pokémon rises to the top!
      </p>
    </div>
  );
}

export default Battle;
