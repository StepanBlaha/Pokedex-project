
import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState } from 'react';
import "./index.css"


export default function MainPage(){
    const [pokemonName, setPokemonName] = useState("")
    useEffect(()=>{
        fetch('http://localhost:5000/api/randompokemon')
        .then((response) => response.json())
        .then((pokemon) => {
            console.log(pokemon)
            console.log(pokemon.pokemon.name)
            setPokemonName(pokemon.pokemon.name)
        }); 
    },[])
    return(
        <>
          <div className="section">
            <h1>Stair Edge Section</h1>
        </div>
        </>
    )
}
/*

import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState } from 'react';
import "./index.css"


export default function MainPage(){
    const [pokemonName, setPokemonName] = useState("")
    useEffect(()=>{
        fetch('http://localhost:5000/api/randompokemon')
        .then((response) => response.json())
        .then((pokemon) => {
            console.log(pokemon)
            console.log(pokemon.pokemon.name)
            setPokemonName(pokemon.pokemon.name)
        }); 
    },[])
    return(
        <>
        /
        <div>{pokemonName}s</div>
        <div className="center">
            <div className="mainBlock">
                <div className="mainHeader"></div>
                <div className="mainContent">
                    <div className="card"></div>
                </div>
            </div>
            <div className="sideBlock"></div>
        </div>
        </>
    )
}

*/