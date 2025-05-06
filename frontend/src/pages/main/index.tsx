
import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState } from 'react';
import "./index.css"
import { url } from "inspector";


export default function MainPage(){
    const [pokemonName, setPokemonName] = useState("")
    const [pokemonImage, setPokemonImage] = useState("")
    const [pokemonType, setPokemonType] = useState("")
    const [pokemonHeight, setPokemonHeight] = useState("")
    const [pokemonWeight, setPokemonWeight] = useState("")
    const [pokemonCategory, setPokemonCategory] = useState("")
    const [pokemonAbility, setPokemonAbility] = useState("")
    useEffect(()=>{
        fetch('http://localhost:5000/api/randompokemon')
        .then((response) => response.json())
        .then((pokemon) => {
            console.log(pokemon)
            console.log(pokemon.pokemon.name)
            setPokemonName(pokemon.pokemon.name)
            setPokemonImage(pokemon.pokemon.sprites.front_default)
            setPokemonType(pokemon.pokemon.types[0].type.name)
            setPokemonHeight(pokemon.pokemon.height)
            setPokemonWeight(pokemon.pokemon.weight)
            setPokemonCategory(pokemon.pokemon.species.name)
            setPokemonAbility(pokemon.pokemon.abilities[0].ability.name)
        }); 
    }, [])
    



    return(
        <>
        
        <div>{pokemonName}s</div>
        <div className="center">
            <div className="mainBlock">
                <div className="mainHeader"></div>
                <div className="mainContent">


                    <div className="card">

                        <div className="cardTitle">
                                <h2>{pokemonName}</h2>
                            <div className="cardType">
                                <div className="typeImage"></div>
                                <div className="typeName">
                                    <p>{pokemonType}</p>
                                </div>
                            </div>
                                <div className="cardImage" style={{ backgroundImage: `url(${pokemonImage})` }}></div>
                        </div>

                        <div className="cardInformations">

                            <div className="cardInfo">
                                <div className="cardInfoTitle">
                                    <p>Height</p>
                                </div>
                                <div className="cardInfoContent">
                                    <p>{pokemonHeight} cm</p>
                                </div>
                            </div>

                            <div className="cardInfo">
                                <div className="cardInfoTitle">
                                    <p>Weight</p>
                                </div>
                                <div className="cardInfoContent">
                                    <p>{pokemonWeight} g</p>
                                </div>
                            </div>

                            <div className="cardInfo">
                                <div className="cardInfoTitle">
                                    <p>Category</p>
                                </div>
                                <div className="cardInfoContent">
                                    <p>{pokemonCategory}</p>
                                </div>
                            </div>

                            <div className="cardInfo">
                                <div className="cardInfoTitle">
                                    <p>Ability</p>
                                </div>
                                <div className="cardInfoContent">
                                    <p>{pokemonAbility}</p>
                                </div>
                            </div>
                        </div>

                        <div className="cardDescription">
                            <p>Whenever PIKACHU comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it’s evidence that this POKéMON mistook the intensity of its charge.</p>
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