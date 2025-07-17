import React, { createContext, useState, useEffect, useContext } from "react";
import { PokemonListResult, Pokemon, PokemonContextType } from "../types/pokemon";
import { getCachedData } from "../utils/cache";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PokemonContext = createContext<PokemonContextType>({
    pokemon: [],
    loading: true
});

// Load all pokemon
const fetchAllPokemonInBatches = async () => {
    const cache = getCachedData("sb_pokemon");
    if(cache !== null) return JSON.parse(cache);
    const limit = 100;
    let page = 0;
    let allResults: Pokemon[] = [];
    let hasMore = true;

    while (hasMore) {
        try {
            console.log(API_BASE_URL)
        const res = await axios.get<PokemonListResult>(`https://pokelog-production.up.railway.app/api/pokedex?page=${page}&limit=${limit}`);
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

export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
    const [ pokemon, setPokemon] = useState<Pokemon[]>([]); // Pokemon
    const [loading, setLoading] = useState<boolean>(true); // Pokemon loading flag

    // Fetch pokemon on load
    useEffect(() => {
        fetchAllPokemonInBatches()
            .then((data) => {
                setPokemon(data); 
            })
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false));
    }, []);

    return(
        <PokemonContext.Provider value={{pokemon, loading}}>
            {children}
        </PokemonContext.Provider>
    )
}
// Hook to get Pokemon
export const usePokemon = () => useContext(PokemonContext);