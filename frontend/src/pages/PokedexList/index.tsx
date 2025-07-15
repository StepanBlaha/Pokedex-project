import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import { Pokemon } from "../../types/pokemon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { usePokemon } from "../../context/pokemonContext";
import { pokemonTypes } from "../../constants/types";
import Select from "../../components/Select";
import { defaultFilters } from "../../constants/filters";
import { useFilter } from "../../context/filterContext";
import { matchesFilters } from "../../utils/filter";
import { genList } from "../../constants/gens";
import { loadPokemon, loadSearch } from "../../utils/fetch";
import { isEqualFilters } from "../../utils/filter";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";

export default function PokedexList(){
  const { pokemon, loading } = usePokemon(); // Pokemon context
  const { filters, handleFilter } = useFilter(); // Filter data
  const [inputValue, setInputValue] = useState(""); // Search bar value
  const [items, setItems] = useState<Pokemon[]>([]); // Search result
  const [page, setPage] = useState<number>(0); // Current page for infinity scroll
  const lastRef = useRef<HTMLDivElement | null>(null); // Ref for last card in infinity scroll
  const [ sort, setSort ] = useState<"asc" | "desc" | null>(null); // Sort state

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
    if(!isEqualFilters(filters, defaultFilters)) return; 
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

  // Handle which list to show
  const filteredItems = (() => {
    // If searching
    if (inputValue !== "" && searchedPokemon?.searchedPokemon) {
      const searchResults = searchedPokemon.searchedPokemon;
      return !isEqualFilters(filters, defaultFilters)
        ? searchResults.filter(pok => matchesFilters(pok, filters))
        : searchResults;
    }
    // If filters applied (but no search)
    if (!isEqualFilters(filters, defaultFilters)) {
      return pokemon.filter(pok => matchesFilters(pok, filters));
    }
    // No search/filters
    if (sort === null) {
      // Let infinite scroll work
      return items;
    }
    // If sorting is applied (but no filters or search), we need full data
    return pokemon;
  })();
  // Handle sorting items
  const sortedItems = (() => {
    if (sort === "asc") {
      return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "desc") {
      return [...filteredItems].sort((a, b) => b.name.localeCompare(a.name));
    }
    return filteredItems; // untouched
  })();

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
                      <div className={styles.Sort} onClick={() => {
                        if (sort === "desc") {
                          setSort(null);
                        } else if (sort === "asc") {
                          setSort("desc");
                        } else {
                          setSort("asc");
                        }
                      }}>
                        A
                        {sort === 'asc' && <ChevronUp/>}
                        {sort === 'desc' && <ChevronDown/>}
                        {sort === null && <Minus/>}
                      </div>
                  </div>
                  <div className={styles.mainContent}>
                      <List data={sortedItems} lastCardRef={lastRef}/>
                    
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