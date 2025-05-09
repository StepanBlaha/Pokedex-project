
import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Link, useParams } from "react-router-dom";
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import Spinner from "../../components/Spinner";
import axios from 'axios';
import BarChart from "../../components/Charts/BarChart";
import Header from "../../components/Header";

const Card = lazy(() => import('./components/Card'));


const fetchPokemon = async (id: number) => {
    const response = await fetch(`http://localhost:5000/api/pokemon/${id}`);
    const pokemon = await response.json();
    console.log(pokemon)
    console.log(pokemon.data.stats)
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

export default function DetailPage(){
    const { id } = useParams();
    const {data, refetch, isFetching, error} = useQuery({
        queryKey: ["pokemon"],
        queryFn:()=> fetchPokemon(Number(id)),
    })
    if (isFetching) return <Spinner />;

 


    return(
        <>
        <div className={styles.App}>
        <div className={styles.center}>
            <Header/>
            <div className={styles.mainBlock}>
                <div className={styles.mainContent}>
                    <div className={styles.backHomeDiv}>
                        <Link to={"/"}>
                            <div className={styles.backHome}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
                                <p>Back</p>
                            </div>
                     </Link>
                    </div>

                    <Suspense fallback={<Spinner />}>
                        {data && <Card data={data} />}
                    </Suspense>

                </div>
            </div>
        </div>
        </div>


        </>
    )
}



