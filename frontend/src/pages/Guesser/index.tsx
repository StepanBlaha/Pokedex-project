import styles from "./index.module.css"
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { randomIntFromInterval } from "../../utils/random";
import { fetchPokemon, fetchPokemonBackData } from "../../utils/fetch";
const Card = lazy(() => import('./components/Card'));

export default function GuessThePokemon(){
    const [id, setId] = useState<number>(randomIntFromInterval(1, 1025)); // generate randoim index
    const {data, refetch, isFetching, error} = useQuery({
        queryKey: ["pokemon", id],
        queryFn:()=> fetchPokemon(Number(id)),
    })
    const {data: backData, refetch: backFetch, isFetching: isFetchingBack, error: backError} = useQuery({
        queryKey: ["pokemon_extra", id],
        queryFn:()=> fetchPokemonBackData(Number(id)),
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
                            <Link to={"/home"}>
                                <div className={styles.backHome}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
                                    <p>Home</p>
                                </div>
                            </Link>
                        </div>
                        {data && backData && <Card data={data} backData={backData} id={Number.toString()} newId={()=>setId(randomIntFromInterval(1, 1025))}/>}
                        </div>
                    </div>
                <Footer/>
            </div>
        </div>
        </>
    )
}