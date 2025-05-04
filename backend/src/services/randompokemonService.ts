import axios from 'axios';

export const getRandomPokemon = async()=>{
    const randomId = Math.floor(Math.random() * 898) + 1;
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    const data = result.data
    return data;
}