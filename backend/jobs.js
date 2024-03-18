const Agenda = require("agenda");
const Pokemon = require("./models/Pokemon");

const agenda = new Agenda({
  db: {
    address: process.env.MONGO_DB_URI,
  },
});

// define the job to update the ranking
agenda.define("update ranking", async job => {
  try {
    // Récupérez tous les Pokémon de la base de données et triez-les par nombre de votes décroissant
    const allPokemon = await Pokemon.find().sort((a, b) => b.votes.length - a.votes.length);

    // Parcourez tous les Pokémon et mettez à jour leur classement dans la base de données
    allPokemon.forEach(async (pokemon, index) => {
      pokemon.rank = index + 1;
      pokemon.rankings.push({ rank: index + 1 });
      await pokemon.save();
    });

    console.log("Ranking updated successfully.");
  } catch (err) {
    console.error("Error updating ranking:", err);
  }
});

// Start Agenda.js
(async function () {
  await agenda.start();
  // Schedule the job to run once per day
  await agenda.every("1 day", "update ranking");
})();
