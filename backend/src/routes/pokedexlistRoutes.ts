import express from 'express';
import { getPokedex } from '../controllers/pokedexlistController';
const router = express.Router();

router.get('/pokedex', getPokedex);

export default router;
