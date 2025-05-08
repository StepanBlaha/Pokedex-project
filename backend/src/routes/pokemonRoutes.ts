import express from 'express';
import { getPokemon, getAllPokemon, createPokemon } from '../controllers/pokemonController';

const router = express.Router();

router.get('/pokemon/:id', getPokemon);
// Get pokemon from mongo
router.get('/pokedb/all', getAllPokemon);
// Insert pokemon into mongo
router.post('/pokedb/add', createPokemon);

export default router;
