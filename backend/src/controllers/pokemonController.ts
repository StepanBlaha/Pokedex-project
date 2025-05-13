import { Request, Response } from 'express';
import { getPokemonData, getPokemonDescription, getExtraPokemonData, getEvolutionChainData } from '../services/pokemonService';
import Pokemon from '../models/Pokemon';
import Pokedex from '../models/Pokedex';
import { EvoChainLink, EvoChain } from '../types/evolutionTypes';
import { traverseChain } from '../utils/evolutionChain';

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

export const getExtraPokemonCardData = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    const data = await getExtraPokemonData(id) as {
      generation: {name:String},
      shape: {name:String},
      gender_rate:Number,
      color: {name:String},
      base_happiness:Number,
      capture_rate:Number,
      evolution_chain:{url:string}
    }
    const additionalData = await getPokemonData(id) as {
      sprites: {back_default:String},
      species: {name:String},
      base_experience: Number,
      forms: [{name:String, url:String}]
    }

    // Get evolution chain url and get the line
    const segments = data.evolution_chain.url.split('/');
    const evolutionChainId = parseInt(segments[segments.length - 2]);
    const evoData = await getEvolutionChainData(evolutionChainId)

    const evolutionList = traverseChain(evoData.chain)




    const ExtraData = {
      generation: data.generation.name,
      shape: data.shape.name,
      gender_rate:data.gender_rate,
      color: data.color.name,
      happiness: data.base_happiness,
      capture_rate: data.capture_rate,
      back_sprite: additionalData.sprites.back_default,
      species: additionalData.species.name,
      base_xp: additionalData.base_experience,
      forms: additionalData.forms,
      evolution_chain: evolutionList,
    }
    res.json({
      data:ExtraData
    });
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data.' });
  }
};

export const getEvolutionChain = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    const data = getEvolutionChainData(id)
    res.json({
      data
    });
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data.' });
  }
};