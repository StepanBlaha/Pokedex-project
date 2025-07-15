import { SearchedPokemonList, PokemonListResult } from "../types/pokemon"
import { UserPokedexRecord } from "../types/pokemon"
import { FavouriteRecord } from "../types/favourite"
import axios from "axios"
// Function for fetching the pokemon
export const loadPokemon = async (page: number) =>{
    const res = await axios.get<PokemonListResult>(`http://localhost:5000/api/pokedex?page=${page}&limit=10`)
    return res.data
}

// Function for fetching searched pokemon
export const loadSearch = async(search: string) => {
    try {
        const res = await axios.post<SearchedPokemonList>("http://localhost:5000/api/searchPokedex", {
        search: search
        });;
        return res.data;
    } catch (error) {
        console.error('Error in loadSearch:', error);
    }
}
// Function for fetching users pokedex
export const loadUsersPokemon = async(id: string) => {
    const items = await axios.post<UserPokedexRecord>(`http://localhost:5000/api/userpokedex/get`, {
        userId: id,
    });
    return items.data.pokemonIds
}
// Function for updating users pokedex
export const updateUserPokedex = async(id: string, entries: number[]) => {
    const items = await axios.post<UserPokedexRecord>(`http://localhost:5000/api/userpokedex/update`, {
        userId: id,
        entries: entries
    });
    console.log(items.data.pokemonIds)
    return items.data.pokemonIds
}
// Function for loading users favourite data
export const loadFavourite = async(id: string, key: string) => {
    const items = await axios.post<FavouriteRecord>(`http://localhost:5000/api/favourite/get`, {
        userId: id,
        key: key
    });
    return items.data.value
}
// Function for updating users favourite data
export const updateFavourite = async(id: string, key: string, value: string | number ) => {
    const items = await axios.post<FavouriteRecord>(`http://localhost:5000/api/favourite/create`, {
        userId: id,
        key: key,
        value: value
    });
    return items.data.value
}