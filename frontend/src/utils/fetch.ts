import { SearchedPokemonList, PokemonListResult, UserPokedexRecord, Pokemon } from "../types/pokemon"
import { FavouriteRecord } from "../types/favourite"
import { userLevelResult } from "../types/user"
import { MoveListResult, SearchedMoveList } from "../types/moves"
import { ItemResult, SearchedItemList } from "../types/items"
import { getCachedData } from "./cache"
import axios from "axios"
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// Function for fetching the pokemon
export const loadPokemon = async (page: number) =>{
    const res = await axios.get<PokemonListResult>(`${API_BASE_URL}/api/pokedex?page=${page}&limit=10`)
    return res.data
}
// Function for fetching searched pokemon
export const loadSearch = async(search: string) => {
    try {
        const res = await axios.post<SearchedPokemonList>("${API_BASE_URL}/api/searchPokedex", {
        search: search
        });;
        return res.data;
    } catch (error) {
        console.error('Error in loadSearch:', error);
    }
}
// Function for fetching users pokedex
export const loadUsersPokemon = async(id: string) => {
    const items = await axios.post<UserPokedexRecord>(`${API_BASE_URL}/api/userpokedex/get`, {
        userId: id,
    });
    return items.data.pokemonIds
}
// Function for updating users pokedex
export const updateUserPokedex = async(id: string, entries: number[]) => {
    const items = await axios.post<UserPokedexRecord>(`${API_BASE_URL}/api/userpokedex/update`, {
        userId: id,
        entries: entries
    });
    console.log(items.data.pokemonIds)
    return items.data.pokemonIds
}
// Function for loading users favourite data
export const loadFavourite = async(id: string, key: string) => {
    const items = await axios.post<FavouriteRecord>(`${API_BASE_URL}/api/favourite/get`, {
        userId: id,
        key: key
    });
    return items.data.value
}
// Function for updating users favourite data
export const updateFavourite = async(id: string, key: string, value: string | number ) => {
    const items = await axios.post<FavouriteRecord>(`${API_BASE_URL}/api/favourite/create`, {
        userId: id,
        key: key,
        value: value
    });
    return items.data.value
}
// Function for loading all pokemon in batches
export const fetchAllPokemonInBatches = async () => {
    const cache = getCachedData("sb_pokemon");
    if(cache !== null) return JSON.parse(cache);
    const limit = 100;
    let page = 0;
    let allResults: Pokemon[] = [];
    let hasMore = true;

    while (hasMore) {
        try {
        const res = await axios.get<PokemonListResult>(`${API_BASE_URL}/api/pokedex?page=${page}&limit=${limit}`);
        allResults = [...allResults, ...res.data.results];
        if (res.data.results.length < limit) {
            hasMore = false; // no more pages
        } else {
            page++;
        }
        } catch (error) {
        console.error("Error fetching batch:", error);
        hasMore = false;
        }
    }
    localStorage.setItem("sb_pokemon", JSON.stringify(allResults))
    return allResults;
}
// Function for updating user xp
export const UpdateUserLevel = async (id: string, xp:number) =>{
        const items = await axios.post<userLevelResult>(`${API_BASE_URL}/api/userlevel/create`, {
        userId: id,
        xp: xp
    });
    return items.data
}
// Function for getting user xp
export const GetUserLevel = async (id: string) =>{
        const items = await axios.post<userLevelResult>(`${API_BASE_URL}/api/userlevel/get`, {
        userId: id
    });
    return items.data
}
// Function for fetching all moves
export const loadMoves = async (page: number) =>{
    const res = await axios.get<MoveListResult>(`${API_BASE_URL}/api/moves?page=${page}&limit=10`)
    return res.data
}
// Function for fetching searched moves
export const loadSearchMoves = async(search: string) => {
    try {
        const res = await axios.post<SearchedMoveList>("${API_BASE_URL}/api/searchMoves", {
            search: search
        });
        return res.data;
    } catch (error) {
        console.error('Error in loadSearchMoves:', error);
    }
}
// Function for fetching all moves
export const loadItems = async (page: number) =>{
    const items = await axios.get<ItemResult>(`${API_BASE_URL}/api/items?page=${page}&limit=10`)
    return items.data
}
// Function for fetching searched moves
export const loadSearchItems = async(search: string) => {
    try {
        const res = await axios.post<SearchedItemList>("${API_BASE_URL}/api/searchItems", {
            search: search
        });
        return res.data;
    } catch (error) {
        console.error('Error in loadSearchItems:', error);
    }
}
// Function for getting pokemon data based on id
export const fetchPokemon = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/pokemon/${id}`);
    const pokemon = await response.json();
    return {
        name: pokemon.data.name,
        type: pokemon.data.types[0].type.name,
        description: pokemon.description.description,
        category: pokemon.description.genus,
        image: pokemon.data.sprites.front_default,
        height: pokemon.data.height * 10,
        weight: pokemon.data.weight / 10,
        ability: pokemon.data.abilities[0].ability.name,
        stats: pokemon.data.stats
    };
};
// Function for getting extra pokemon data based on id
export const fetchPokemonBackData = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/pokemon/back/${id}`);
    const data = await response.json();
    return {
        generation: data.data.generation,
        shape: data.data.shape,
        gender_rate: data.data.gender_rate,
        color: data.data.color,
        happiness: data.data.happiness,
        capture_rate: data.data.capture_rate,
        back_sprite: data.data.back_sprite,
        species: data.data.species,
        base_xp: data.data.base_xp,
        forms: data.data.forms,
        evolution_chain: data.data.evolution_chain
    };
};