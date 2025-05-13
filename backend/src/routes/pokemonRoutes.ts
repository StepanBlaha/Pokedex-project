import express from 'express';
import { getPokemon, getExtraPokemonCardData, getEvolutionChain} from '../controllers/pokemonController';
import { createPokedexEntries, getPokedexCount } from '../controllers/pokedexlistController';

const router = express.Router();
// Get pokemon data by id
router.get('/pokemon/:id', getPokemon);
// Extra data fr back of pokemon card
router.get('/pokemon/back/:id', getExtraPokemonCardData);
// Insert from api to own db !!!use only once!!!
router.post('/pokedb/entry', createPokedexEntries);
// Count number of pokemon in the pokedex db
router.get('/pokedb/count', getPokedexCount);

export default router;

/*
legacy

Get pokemon from mongo
router.get('/pokedb/all', getAllPokemon);
// Insert pokemon into mongo
router.post('/pokedb/add', createPokemon);
*/