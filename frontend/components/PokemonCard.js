import React from "react";

function PokemonCard({ pokemon, handleClick, single = false }) {
  const handleVote = async () => {
    const pokemonData = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other["official-artwork"].front_default,
      date: new Date(),
      user: null,
      types: pokemon.types,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/pokemon/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonData),
      });

      if (!response.ok) throw new Error("Vote error.");
      console.log("Vote success.");
      handleClick();
    } catch (error) {
      console.error("Error:", error);
      console.log("Vote error.");
    }
  };

  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel: "#9E9E9E",
    dark: "#000000",
  };

  return (
    <div className="pokemon-card-bg" style={single ? { width: "350px" } : {}}>
      <div
        className="pokemon-card"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${
            typeColor[pokemon.types[0].type.name]
          } 36%, #ffffff 36%)`,
        }}
      >
        <p className="hp">
          <span>HP </span>
          {pokemon.stats[0].base_stat}
        </p>
        <img
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt={pokemon?.name + "_image"}
        />
        <h2 className="poke-name">{pokemon?.name}</h2>
        <div className="types">
          {pokemon.types.map((slot) => (
            <span
              key={slot.slot}
              style={{
                backgroundColor: typeColor[slot.type.name] || "#E3E3E3",
              }}
            >
              {slot.type.name}
            </span>
          ))}
        </div>
        <div className="stats">
          <div>
            <h3>{pokemon.stats[1].base_stat}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>{pokemon.stats[2].base_stat}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>{pokemon.stats[3].base_stat}</h3>
            <p>Speed</p>
          </div>
        </div>
        {!single && (
          <button className="button-30 btn" onClick={handleVote}>
            VOTE
          </button>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
