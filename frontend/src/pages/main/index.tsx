
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
        
        <div>{pokemonName}s</div>
        <div className="center">
            <div className="mainBlock">
                <div className="mainHeader"></div>
                <div className="mainContent">


                    <div className="card">

                        <div className="cardTitle">
                            <h2>Pikachu</h2>
                            <div className="cardType">
                                <div className="typeImage"></div>
                                <div className="typeName">Electric</div>
                            </div>
                            <div className="cardImage"></div>
                        </div>

                        <div className="cardInformations">
                            <div className="cardInfo">info</div>
                            <div className="cardInfo">info</div>
                            <div className="cardInfo">info</div>
                            <div className="cardInfo">info</div>
                        </div>

                        <div className="cardDescription">
                            <p>descsfd sfsf boneca ambalabu</p>
                        </div>

                        <div className="cardStats">
                            <div className="statGraph"></div>
                        </div>

                    </div>



                </div>
            </div>
            <div className="sideBlock"></div>
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



<div className="card">
  <div className="corner">
    <i data-corner="tl"></i>
    <i data-corner="br"></i>
    <div data-action="notif" className="action">
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
        ></path>
        <path
          d="M16 8m-3 0a3 3 0 1 0 8 0a3 3 0 1 0 -8 0"
          className="dot"
          fill="red"
        ></path>
      </svg>
    </div>
    
  </div>
</div>

        </>
    )
}




*/