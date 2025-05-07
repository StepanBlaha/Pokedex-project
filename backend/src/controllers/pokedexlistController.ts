import { Request, Response } from 'express';
import { getPokedexList } from '../services/pokedexlistService';
import { getPokemonData } from '../services/pokemonService';


export const getPokedex = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string || '1');
    const limit = parseInt(req.query.limit as string || '10');
    const data = await getPokedexList(page, limit) as { results: { name: string, url: string }[] };

    // Promise.all executes multiple async requests at once
    const detailedData = await Promise.all(data.results.map(async (pokemon: {name: string, url: string})=>{
      // Extract url
      const segments = pokemon.url.split('/');
      const id = parseInt(segments[segments.length - 2]);
      // Get the data
      const data = await getPokemonData(id) as { 
        id: number;
        name: string;
        sprites: { front_default: string };
        types: { type: { name: string } }[];
      };
      // Return the data
      return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
      };
    }));

    res.json({
        page,
        results: detailedData,
    });
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data.' });
  }
};
 