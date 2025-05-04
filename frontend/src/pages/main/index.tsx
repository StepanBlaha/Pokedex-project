
import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState } from 'react';


export default function MainPage(){
    const [pokemonName, setPokemonName] = useState("")
    useEffect(()=>{
        fetch('http://localhost:5000/api/randompokemon')
        .then((response) => response.json())
        .then((pokemon) => {
            console.log(pokemon)

        }); 
    },[])
    return(
        <div>{pokemonName}s</div>
    )
}