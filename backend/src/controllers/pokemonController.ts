import { Request, Response } from 'express';
import { getPokemonData, getPokemonDescription } from '../services/pokemonService';

export const getRandomPokemon = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = await getPokemonData(id);
    const description = await getPokemonDescription(id);

    res.json({
      data,
      description,
    });
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data.' });
  }
};
