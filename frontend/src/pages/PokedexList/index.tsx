import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./index.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';


export interface pPokemonListResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
    page?: number; 
  }




  interface Pokemon {
    name: string;
    url: string;
  }
  
  // Type for the response structure from the API (only interested in results here)
  // Type for the response structure from the API (only interested in results here)
  interface PokemonListResult {
    data:{
        results: Pokemon[];
        page: number
    };
  }
  

export default function PokedexList(){
    const [items, setItems] = useState<Pokemon[]>([]);
    const [page, setPage] = useState<number>(1)


    const loadPokemon = async () =>{
        const res = await axios.get<PokemonListResult>(`http://localhost:5000/api/pokedex?page=${page}&limit=10`)
        console.log(res.data)
        console.log(page)
        console.log(res.data.data.results)

        if (items.length >0) {
            setItems([...items, ...res.data.data.results]);
          } else {
            setItems(res.data.data.results);
          }
      

          // if the page isnt set update it based on the page in state
          if (res.data.data.page) {
            setPage(res.data.data.page);
          } else {
            setPage(prev => prev + 1);
          }
    }



    useEffect(()=>{
        loadPokemon()
    },[])


    return(
        <>
        
        <div className="center">
            <div className="mainBlock">
                <div className="mainHeader"></div>
                <div className="mainContent">

                    <div className="card">
                        <p>sds</p>
                    </div>
                    <Button onClick={()=>loadPokemon()}/>


                </div>
            </div>
        </div>



        </>
    )
}


