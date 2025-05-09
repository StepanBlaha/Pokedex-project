import express from 'express';
import { getPokedex, getSearchedPokemon } from '../controllers/pokedexlistController';
const router = express.Router();

router.get('/pokedex', getPokedex);
router.post('/searchPokedex', getSearchedPokemon)
export default router;
