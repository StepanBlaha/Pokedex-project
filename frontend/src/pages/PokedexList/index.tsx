import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import { Pokemon, PokemonListResult, SearchedPokemon, SearchedPokemonList } from "../../types/pokemon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { usePokemon } from "../../context/pokemonContext";
import { pokemonTypes } from "../../constants/types";
import Select from "../../components/Select";
import { defaultFilters } from "../../constants/filters";
import { useFilter } from "../../context/filterContext";
import { matchesFilters } from "../../utils/filter";
import { genList } from "../../constants/gens";
import { loadSearch, loadPokemon } from "../../utils/fetch";
import { isEqualFilters } from "../../utils/filter";

export default function PokedexList(){
  const { pokemon, loading } = usePokemon(); // Pokemon context
  const { filters, handleFilter } = useFilter(); // Filter data
  const [inputValue, setInputValue] = useState(""); // Search bar value
  const [items, setItems] = useState<Pokemon[]>([]); // Search result
  const [page, setPage] = useState<number>(0); // Current page for infinity scroll
  const lastRef = useRef<HTMLDivElement | null>(null); // Ref for last card in infinity scroll

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
    if(filters !== defaultFilters) return; 
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
                    <Select onChange={(val)=> handleFilter("type", val?.toString() ?? null)}  data={pokemonTypes} defaultText="Type" selected={filters.type}/>
                    <Select onChange={(val) =>  handleFilter("gen", val === "" || val === null || val === undefined ? null : Number(val))} data={genList} defaultText="Generation" selected={filters.gen?.toString()}/>
                  </div>

                  <div className={styles.mainContent}>
                    {!isEqualFilters(filters, defaultFilters) ? (
                      <List data={pokemon.filter(pok => matchesFilters(pok, filters))} lastCardRef={lastRef}/>
                    ):(
                      <List data={items} lastCardRef={lastRef}/>

                    )}
                      {isFetching && (
                        <div className={styles.Loader}>
                          <p>Loading more...</p>
                        </div>
                        )}
                  </div>

              </div>
              <Footer/>
          </div>
        </div>
        </>
    )
}


