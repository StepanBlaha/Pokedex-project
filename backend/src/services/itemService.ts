import axios from 'axios';
import { Item } from '../types/itemTypes';

export const getItemList = async(page: number, limit: number) =>{
    const pageNum = page || 0 ;
    const limitNum = limit || 20;
    const offset = pageNum * limitNum;
    const res = await axios.get(`https://pokeapi.co/api/v2/item?limit=${limitNum}&offset=${offset}`);
    return res.data;
}
export const getItemDetails = async(id:number) =>{
    const res = await axios.get<Item>(`https://pokeapi.co/api/v2/item/${id}`)
    return res.data;
}