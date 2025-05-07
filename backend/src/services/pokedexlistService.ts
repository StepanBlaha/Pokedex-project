import axios from 'axios';

export const getPokedexList = async(page: number, limit: number) =>{
    const pageNum = page || 0 ;
    const limitNum = limit || 20;
    const offset = pageNum * limitNum;
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limitNum}&offset=${offset}`);
    return res.data;
}

