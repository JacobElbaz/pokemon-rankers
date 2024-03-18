const express = require('express');
const { getBattle, newVote, getRankedList, getPokemonByName } = require('../controllers/pokemonController');

const router = express.Router();


router.get('/battle', getBattle);
router.post('/vote', newVote);
router.get('/rankedList', getRankedList);
router.get('/rankedList/:limit', getRankedList);
router.get('/:name', getPokemonByName);

module.exports = router;