import express from 'express';
import { getRandomPokemon } from '../controllers/pokemonController';

const router = express.Router();

router.get('/pokemon/:id', getRandomPokemon);

export default router;
