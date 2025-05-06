import axios from 'axios';
import { PokemonData, PokemonSpeciesData } from '../types/pokemonTypes';

export const getPokemonData = async (id: number) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  };
  
  export const getPokemonDescription = async (id: number): Promise<{ description: string; genus: string }> => {
    const res = await axios.get<PokemonSpeciesData>(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    console.log(res.data)
    const entry = res.data.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );

    const genusEntry = res.data.genera.find(
      (g) => g.language.name === 'en'
    );


    return {
      description: entry ? entry.flavor_text.replace(/\s+/g, ' ') : 'No description found.',
      genus: genusEntry ? genusEntry.genus : 'No category found', 
    };
};