import axios from 'axios';


export const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      return result.data;
    } catch (err) {
      console.error('Error in getRandomPokemon:', err);
      throw err;
    }
  };