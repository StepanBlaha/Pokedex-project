import express from 'express';
import { getRandomPokemonData } from '../controllers/randompokemonController';

const router = express.Router();

router.get('/randompokemon', getRandomPokemonData);

export default router;
