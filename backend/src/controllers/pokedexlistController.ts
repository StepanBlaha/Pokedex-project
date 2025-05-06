import { Request, Response } from 'express';
import { getPokedexList } from '../services/pokedexlistService';

export const getPokedex = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string || '1');
    const limit = parseInt(req.query.limit as string || '10');
    const data = await getPokedexList(page, limit);

    res.json({
        page,
        data,
    });
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data.' });
  }
};
