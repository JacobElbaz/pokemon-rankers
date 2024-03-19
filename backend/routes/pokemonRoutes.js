const express = require('express');
const { getBattle, newVote, getRankedList, getPokemonByName, updateRanking, getVotesByType, updateTypes } = require('../controllers/pokemonController');

const router = express.Router();


router.get('/battle', getBattle);
router.post('/vote', newVote);
router.get('/rankedList', getRankedList);
router.get('/rankedList/:limit', getRankedList);
router.get('/update', updateRanking);
router.get('/getVotesByTypes', getVotesByType);
router.get('/:name', getPokemonByName);


module.exports = router;