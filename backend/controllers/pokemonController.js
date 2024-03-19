const Pokemon = require("../models/Pokemon");

const getPokemonByName = async (req, res) => {
  const pokeName = req.params.name;
  try {
    const result = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}/`
    );
    const pokeApi = await result.json();
    const pokemon = await Pokemon.findOne({ name: pokeName });
    res
      .status(200)
      .json({ ...pokeApi, rank: pokemon.rank, rankings: pokemon.rankings });
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
        types: req.body.types,
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

const updateRanking = async (req, res) => {
  try {
    // Récupérez tous les Pokémon de la base de données et triez-les par nombre de votes décroissant
    const allPokemon = await Pokemon.find();
    allPokemon.sort((a, b) => b.votes.length - a.votes.length);

    // Parcourez tous les Pokémon et mettez à jour leur classement dans la base de données
    allPokemon.forEach(async (pokemon, index) => {
      pokemon.rank = index + 1;
      pokemon.rankings.push({ rank: index + 1 });
      await pokemon.save();
    });
    res
      .status(200)
      .json({ success: true, message: "Ranking updated successfully." });
    console.log("Ranking updated successfully.");
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error updating ranking:" });
    console.error("Error updating ranking:", err);
  }
};

const updateTypes = async (req, res) => {
  try {
    const allPokemon = await Pokemon.find();
    for (let i = 0; i < allPokemon.length; i++) {
      const pokemon = allPokemon[i];
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await response.json();
      const types = data.types;
      pokemon.types = types;
      await pokemon.save();
    }
    res.status(200).json({ success: true, message: "Types updated." });
  } catch (error) {
    res
      .status(500)
      .json({ succes: false, message: "Error occured when updating types" });
    console.error("Error occured when updating types", error);
  }
};

const getVotesByType = async (req, res) => {
  try {
    // Récupérer tous les Pokémon de la base de données
    const allPokemon = await Pokemon.find();

    // Initialiser un objet pour stocker le nombre de votes par type
    const votesByType = {};

    // Parcourir tous les Pokémon et mettre à jour le nombre de votes par type
    allPokemon.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        if (!votesByType[type.type.name]) {
          votesByType[type.type.name] = 0;
        }
        votesByType[type.type.name] += pokemon.votes.length;
      });
    });
    // Convertir l'objet en tableau d'objets avec la forme { type: "type-name", votes: 24 }
    const votesByTypeArray = Object.keys(votesByType).map((type) => ({
      type,
      votes: votesByType[type],
    }));
    votesByTypeArray.sort((a, b) => b.votes - a.votes);
    const top5Types = votesByTypeArray.slice(0,5);

    res.status(200).json(top5Types);
  } catch (error) {
    console.error("Erreur lors du comptage des votes par type :", error);
    res
      .status(500)
      .json({
        error:
          "Une erreur s'est produite lors de la récupération des votes par type.",
      });
  }
};

module.exports = {
  getBattle,
  newVote,
  getRankedList,
  getPokemonByName,
  updateRanking,
  getVotesByType,
  updateTypes,
};
