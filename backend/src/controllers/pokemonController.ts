import { Request, Response } from 'express';
import { getPokemonData, getPokemonDescription } from '../services/pokemonService';
import Pokemon from '../models/Pokemon';
import Pokedex from '../models/Pokedex';

export const getPokemon = async (req: Request, res: Response) => {
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
/*  legacy
export const getAllPokemon = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Pokemon.find();
    res.json(data); 
  } catch (error) {
    console.log(error);  
    res.status(500).json({ error: error });  
  }
};

export const createPokemon =  async (req: Request, res: Response) => {
  const newPokemon = new Pokemon(req.body)
  await newPokemon.save();
  res.status(201).json(newPokemon);
};
*/