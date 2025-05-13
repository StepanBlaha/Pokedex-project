import { Request, Response } from 'express';
import { getRandomPokemon } from '../services/randompokemonService';

export const getRandomPokemonData = async (req: Request, res: Response) => {
  try {
    const pokemon = await getRandomPokemon();
    res.json({ pokemon }); 
  } catch (error) {
    console.error('Error fetching pokemon data:', error);
    res.status(500).json({ error: 'Failed to fetch pokemon data' });
  }
};
