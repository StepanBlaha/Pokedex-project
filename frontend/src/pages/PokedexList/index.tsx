import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import "./index.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";


  interface Pokemon {
    name: string;
    url: string;
  }
  
  // Type for the response structure from the API (only interested in results here)
  // Type for the response structure from the API (only interested in results here)
  interface PokemonListResult {
    data:{
        results: Pokemon[];
      };
      page: number
  }

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
      // Update page if needed
      /*if (data.page !== undefined) {
        setPage(data.page + 1);
      }
        */
    }
  }, [data]);





  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching) {
        console.log("sigma");
        setPage(prev => prev + 1);
      }
    }, {
      threshold: 0.5, // Trigger when 50% of the card is in view
    });

    if (lastRef.current) {
      observer.observe(lastRef.current);
    }

    // Cleanup observer when the component unmounts or updates
    return () => {
      if (lastRef.current) {
        observer.unobserve(lastRef.current);
      }
    };
  }, [isFetching]);
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


