import { Request, Response } from 'express';
import { getPokedexList } from '../services/pokedexlistService';
import { getPokemonData } from '../services/pokemonService';
import Pokedex from '../models/Pokedex';

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
 
// Insert pokedex entry into mongo - run only once
export const createPokedexEntries  =  async (req: Request, res: Response) => {
  try {
    // Get all the pokemon
    const page = parseInt("0");
    const limit = parseInt("100000");
    const data = await getPokedexList(page, limit) as { results: { name: string, url: string }[] };

    // Load the unregistered ones into db
    const detailedData = await Promise.all(data.results.map(async (pokemon: {name: string, url: string})=>{
      // Get the id
      const segments = pokemon.url.split('/');
      const id = parseInt(segments[segments.length - 2]);
      // See if a record exists
      const exists = await Pokedex.exists({id})

      if(exists){
        return null;
      }

      // Get the pokemon data
      const data = await getPokemonData(id) as { 
        id: number;
        name: string;
        sprites: { front_default: string };
        types: { type: { name: string } }[];
      };
      // Generate new entry data
      const newEntry = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),

      }
      // Create new db entry
      const pokedexEntry = new Pokedex(newEntry)
      await pokedexEntry.save();
      return newEntry;
    }));
    // Get the data of all the inserted pokemon
    const insertedPokemon = detailedData.filter(p => p !== null);

    // return the data
    res.json({
      page,
      insertedCount: insertedPokemon.length,
      inserted: insertedPokemon
    });
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data.' });
  }
};

// Count number of pokemon in the pokedex db
export const getPokedexCount = async (req: Request, res: Response) => {
  try {
    const count = await Pokedex.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting entries:', error);
    res.status(500).json({ error: 'Failed to count Pokedex entries.' });
  }
};