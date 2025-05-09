import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import { Pokemon, PokemonListResult, SearchedPokemon, SearchedPokemonList } from "../../types/pokemon";

  // Function for fetching the pokemon
  const loadPokemon = async (page: number) =>{
    const res = await axios.get<PokemonListResult>(`http://localhost:5000/api/pokedex?page=${page}&limit=10`)
    console.log(res.data)
    return res.data
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
  

export default function PokedexList(){
  // States and refs
  const [inputValue, setInputValue] = useState("")
  const [items, setItems] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(0)
  const lastRef = useRef<HTMLDivElement | null>(null); 

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
    return(
        <>
        <div className={styles.App}>
          <div className={styles.center}>
              <div className={styles.mainHeader}>
                <div className={styles.headerLogoPart}>

                    <div className={styles.headerLogo}>
                      <h1>PokeLog</h1>
                    </div>


                    <div className={styles.headerSwampert}></div>
                    <div className={styles.headerVenusaur}></div>
                    <div className={styles.headerCharizard}></div>
                    <div className={styles.headerBlastoise}></div>





                    <div className={styles.headerGyarados}></div>
                    <div className={styles.headerSnorlax}></div>
                    <div className={styles.headerTyranitar}></div>
                    <div className={styles.headerLucario}></div>
                    <div className={styles.headerBidoof}></div>
                    <div className={styles.headerEmpoleon}></div>
                    <div className={styles.headerEevee}></div>
                    <div className={styles.headerElectivire}></div>
                    <div className={styles.headerZacian}></div>
                    <div className={styles.headerConkeldurr}></div>
                    <div className={styles.headerMimikyu}></div>
                    <div className={styles.headerMeltan}></div>
                    <div className={styles.headerPansage}></div>
                    <div className={styles.headerHaxorus}></div>
                    <div className={styles.headerRayquaza}></div>
                    <div className={styles.headerRotom}></div>
                    <div className={styles.headerRegirock}></div>
                    <div className={styles.headerArticuno}></div>
                    <div className={styles.headerHooh}></div>
                    <div className={styles.headerBreloom}></div>

                    <div className={styles.headerDitto}></div>
                    <div className={styles.headerButterfree}></div>
                    <div className={styles.headerCombee}></div>
                    <div className={styles.headerGengar}></div>


                </div>

                <div className={styles.headerContentPart}></div>

              </div>


              <div className={styles.mainBlock}>
                  <div className={styles.sideContent}>
                    <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e)=> setInputValue(e.target.value)}
                    />

                  </div>
                  <div className={styles.mainContent}>
                      <List data={items} lastCardRef={lastRef}/>

                  </div>


                  
              </div>


          </div>
        </div>



        </>
    )
}


