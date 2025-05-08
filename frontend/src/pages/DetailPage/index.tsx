
import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Link, useParams } from "react-router-dom";
import "./index.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import Spinner from "../../components/Spinner";
import axios from 'axios';


const Card = lazy(() => import('./components/Card'));


const fetchPokemon = async (id: number) => {
    const response = await fetch(`http://localhost:5000/api/pokemon/${id}`);
    const pokemon = await response.json();
    return {
      name: pokemon.data.name,
      type: pokemon.data.types[0].type.name,
      description: pokemon.description.description,
      category: pokemon.description.genus,
      image: pokemon.data.sprites.front_default,
      height: pokemon.data.height * 10,
      weight: pokemon.data.weight / 10,
      ability: pokemon.data.abilities[0].ability.name
    };
  };

export default function DetailPage(){
    const { id } = useParams();
    const {data, refetch, isFetching, error} = useQuery({
        queryKey: ["pokemon"],
        queryFn:()=> fetchPokemon(Number(id)),
    })
    const name = data?.name || "";
    const type = data?.type || "";
    const description = data?.description || "";
    const category = data?.category || "";
    const image = data?.image || "";
    const height = data?.height || "";
    const weight = data?.weight || "";
    const ability = data?.ability || "";


    if (isFetching) return <Spinner />;

    


    return(
        <>
        <div className="App">
        <div className="center">
            <div className="mainBlock">
                <div className="mainHeader"></div>
                <div className="mainContent">

                <Suspense fallback={<Spinner />}>
                    {data && <Card data={data} />}
                </Suspense>

                <Link to={"/"}>
                    <Button />
                </Link>
                </div>
            </div>
            <div className="sideBlock"></div>
        </div>
        </div>


        </>
    )
}



