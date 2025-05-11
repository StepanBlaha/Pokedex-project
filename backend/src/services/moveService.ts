import axios from 'axios';

export const getMoveList = async(page: number, limit: number) =>{
    const pageNum = page || 0 ;
    const limitNum = limit || 20;
    const offset = pageNum * limitNum;
    const res = await axios.get(`https://pokeapi.co/api/v2/move?limit=${limitNum}&offset=${offset}`);
    return res.data;
}

export const getMoveDetails = async(id:number) =>{
    const res = await axios.get(`https://pokeapi.co/api/v2/move/${id}`)
    return res.data;
}