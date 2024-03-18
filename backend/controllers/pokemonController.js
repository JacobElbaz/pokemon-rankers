const Pokemon = require("../models/Pokemon");

const getPokemonByName = async (req, res) => {
  const pokeName = req.params.name;
  try {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`);
    const pokeApi = await result.json();
    const pokemon = await Pokemon.findOne({ name: pokeName });
    res.status(200).json({ ...pokeApi, rank: pokemon.rank, rankings: pokemon.rankings});
  } catch (error) {
    console.log("Error findOne", error);
    res.status(404).json({ success: false, message: error });
  }
};

const getBattle = async (req, res) => {
  let pokemons = [];
  for (let index = 0; index < 2; index++) {
    const randomId = Math.floor(Math.random() * (897 - 1) + 1);
    try {
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}/`
      );
      pokemons[index] = await result.json();
      console.log("Success");
    } catch (error) {
      console.log(`Error getting pokemon id: ${randomId}`, error);
    }
  }
  res.send(pokemons);
};

const newVote = async (req, res) => {
  try {
    // Verify if the pokemon already exists in the db
    let pokemon = await Pokemon.findOne({ name: req.body.name });

    if (pokemon) {
      // Update the existing pokemon by adding req.body.user and req.body.date to its votes parameter
      console.log("pokemon exist");
      pokemon.votes.push({ user: req.body.user, date: req.body.date });
      await pokemon.save();
      res
        .status(200)
        .json({ success: true, message: "Vote added to existing Pokemon" });
    } else {
      // Create and add a new pokemon to the database with the new vote
      pokemon = new Pokemon({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        votes: [{ user: req.body.user, date: req.body.date }],
      });
      await pokemon.save();
      res
        .status(201)
        .json({ success: true, message: "New Pokemon created with vote" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getRankedList = async (req, res) => {
  const limit = req.params.limit;
  try {
    // Obtenez tous les Pokémon de la base de données
    let pokemonList = await Pokemon.find();

    // Triez les Pokémon en fonction du nombre de votes dans leur tableau de votes
    pokemonList.sort((a, b) => b.votes.length - a.votes.length);

    // Slice
    if (limit !== "undefined") {
      pokemonList = pokemonList.slice(0, limit);
    }

    // Envoyez la liste triée de Pokémon en réponse
    res.status(200).json({ success: true, pokemonList });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getBattle, newVote, getRankedList, getPokemonByName };
