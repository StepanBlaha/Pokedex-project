import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import { Pokemon, PokemonListResult, SearchedPokemon, SearchedPokemonList, UserPokedexRecord } from "../../types/pokemon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useUser } from "@clerk/clerk-react";

  // Function for fetching the pokemon
const loadPokemon = async (page: number) =>{
    // tohle pujde pryc
    const items = await axios.get(`http://localhost:5000/api/items?page=${page}&limit=10`)
    console.log(items.data)
    // tohle pujde pryc
    const res = await axios.get<PokemonListResult>(`http://localhost:5000/api/pokedex?page=${page}&limit=10`)
    return res.data
}
const loadUsersPokemon = async(id: string) => {
    const items = await axios.post<UserPokedexRecord>(`http://localhost:5000/api/userpokedex/get`, {
    userId: id,
    });
    console.log(items.data.pokemonIds)
    return items.data.pokemonIds
}

  // Function for fetching searched pokemon
const loadSearch = async(search: string) => {
    try {
        const res = await axios.post<SearchedPokemonList>("http://localhost:5000/api/searchPokedex", {
            search: search
        });;
        return res.data;
    } catch (error) {
        console.error('Error in loadSearch:', error);
    }
}
const updateUserPokedex = async(id: string, entries: number[]) => {
    const items = await axios.post<UserPokedexRecord>(`http://localhost:5000/api/userpokedex/update`, {
    userId: id,
    entries: entries
    });
    console.log(items.data.pokemonIds)
    return items.data.pokemonIds
}


export default function Pokedex(){
    // States and refs
    const [inputValue, setInputValue] = useState("")
    const [items, setItems] = useState<Pokemon[]>([]);
    const [page, setPage] = useState<number>(0) // Current infinity scroll page
    const lastRef = useRef<HTMLDivElement | null>(null); 
    const { user, isLoaded } = useUser(); // User auth data
    const [ userPokedex, setUserPokedex] = useState<number[]>([]); // Users pokedex
    
    useEffect(()=>{
        if(user){
            loadUsersPokemon(user?.id)
            .then(data => setUserPokedex(data))
        }
    }, [user])

    const {data, refetch, isFetching, error} = useQuery({
        queryKey: ["pokemon", page],
        queryFn:()=> loadPokemon(page),
        enabled: false,
    })

    const {data: searchedPokemon, refetch: searchPokemon, isFetching: isSearching, error: searchError} = useQuery({
        queryKey: ["pokemonSearch", inputValue],
        queryFn:()=> loadSearch(inputValue),
        enabled: false,
    })
    // Update state when data changes
    useEffect(() => {
        if (data?.results) {
            // Update Items - only add the not existing ones
            setItems((prev) => [...prev, ...data.results.filter(p => !prev.some(existing => existing.id === p.id))]);
        }
        if(searchedPokemon?.searchedPokemon){
            setItems(searchedPokemon.searchedPokemon);
        }
    }, [data, searchedPokemon]);

  // Effect for the infinity scroll - maybe create custom hook
    useEffect(() => {
        if (!lastRef.current) return;
        if (data?.results) {
        const observer = new IntersectionObserver((entries) => {
            // Entries contains list of observed items
            // isInteracting is true if item is on screen
            if (entries[0].isIntersecting && !isFetching) {
            console.log('Fetching more data...');
            setPage((prev) => prev + 1); 
            }
        },
        {
            threshold: 0.5, 
        });

        // Set observer
        const current = lastRef.current;
        observer.observe(current);

        // Cleanup observer when the component unmounts or updates
        return () => {
            if (current) observer.unobserve(current);
        };
        }
        // Run when isFetching or items changes
        // Items - to make sure it loads after the initial load
    }, [items, isFetching]); 

    // Load more posts when page is updated
    useEffect(() => {
        if (inputValue === "") {
        refetch();
        }
    }, [page]);

// This is for the search ----------------------------------------------------------
    useEffect(() => {
        if (inputValue !== "") {
        searchPokemon();
        // For searching purposes
        setPage(1);   
        } else {
        // Reset the search
        if(page !== 0){
            setItems([]);    
            setPage(0);        
        }
        }
    }, [inputValue]);
// This is for the search ----------------------------------------------------------

    const handleToggle = async (id: number, add: boolean) => {
        if (!user || !userPokedex) {
            return
        }
        let newEntries = [...userPokedex];
        if(add){
            newEntries.push(id);
            setUserPokedex(newEntries)
            updateUserPokedex(user.id, newEntries);
        }else{
            newEntries = newEntries.filter(entry => entry !== id)
            setUserPokedex(newEntries)
            updateUserPokedex(user.id, newEntries);
        }

    };

    return(
        <>
            <div className={styles.App}>
            <div className={styles.center}>
                <Header/>


                <div className={styles.mainBlock}>

                    <div className={styles.sideContent}>
                        <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e)=> setInputValue(e.target.value)}
                        className={styles.searchInput}
                        placeholder="Charizard..."
                        />
                        <p>{userPokedex?.length}/1025</p>
                    </div>

                    <div className={styles.mainContent}>
                        <List 
                        data={items} 
                        lastCardRef={lastRef} 
                        userData={userPokedex}
                        onToggle={handleToggle}
                        />
                    </div>

                </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}


