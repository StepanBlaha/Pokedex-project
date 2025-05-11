import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import { Pokemon, PokemonListResult, SearchedPokemon, SearchedPokemonList } from "../../types/pokemon";
import Header from "../../components/Header";
import { Moves } from "../../types/moves";

  // Function for fetching the pokemon
  const loadPokemon = async (page: number) =>{
    const res = await axios.get<PokemonListResult>(`http://localhost:5000/api/pokedex?page=${page}&limit=10`)
    console.log(res.data)
    return res.data
  }

  const loadMoves = async (page: number) =>{
      const res = await axios.get<Moves>(`http://localhost:5000/api/moves?page=${page}&limit=10`)
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
  

export default function MovePage(){
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
  useEffect(()=>{
    loadMoves(1)
  },[])


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


