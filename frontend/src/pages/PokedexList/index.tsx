import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import "./index.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import { Pokemon, PokemonListResult } from "../../types/pokemon";

  // Function for fetching the pokemon
  const loadPokemon = async (page: number) =>{
    const res = await axios.get<PokemonListResult>(`http://localhost:5000/api/pokedex?page=${page}&limit=10`)
    return res.data
  }
  

export default function PokedexList(){
  const [items, setItems] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(0)
  const lastRef = useRef<HTMLDivElement | null>(null); 

  const {data, refetch, isFetching, error} = useQuery({
    queryKey: ["pokemon", page],
    queryFn:()=> loadPokemon(page),
    enabled: false,
  })

  // Update state when data changes
  useEffect(() => {
    if (data?.data.results) {
      // Update Items
      setItems((prev) => [...prev, ...data.data.results]);
    }
  }, [data]);

  // Effect for the infinity scroll - maybe create custom hook
  useEffect(() => {
    if (!lastRef.current) return;
    if (data?.data.results) {
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
    refetch()
  }, [page]);


    return(
        <>
        
        <div className="center">
            <div className="mainBlock">
                <div className="mainHeader"></div>
                <div className="mainContent">
                    <List data={items} lastCardRef={lastRef}/>

                    <Button onClick={()=>refetch()} disabled={isFetching}/>


                </div>
            </div>
        </div>



        </>
    )
}


