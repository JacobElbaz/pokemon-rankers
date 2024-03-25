const express = require('express');
const { getBattle, newVote, getRankedList, getPokemonByName, updateRanking, getVotesByType, updateTypes, getBattleByType } = require('../controllers/pokemonController');

const router = express.Router();


router.get('/battle/all', getBattle);
router.get('/battle/:type', getBattleByType);
router.post('/vote', newVote);
router.get('/rankedList', getRankedList);
router.get('/rankedList/:limit', getRankedList);
router.get('/update', updateRanking);
router.get('/getVotesByTypes', getVotesByType);
router.get('/:name', getPokemonByName);


module.exports = router;