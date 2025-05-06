import express from 'express';
import { getPokemon } from '../controllers/pokemonController';

const router = express.Router();

router.get('/pokemon/:id', getPokemon);

export default router;
