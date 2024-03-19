const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    rank: { type: Number },
    votes: { type: [Object] },
    rankings: [{
        date: { type: Date, default: Date.now },
        rank: Number
    }],
    types: { type: [Object] },
})

module.exports = mongoose.model('Pokemon', pokemonSchema);