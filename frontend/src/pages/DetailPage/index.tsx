
import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./index.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';


const fetchPokemon = async( id : number)=>{
    const response = await fetch(`http://localhost:5000/api/pokemon/${id}`);
    const pokemon = await response.json();
    return{
        name: pokemon.data.name,
        type: pokemon.data.types[0].type.name,
        description: pokemon.description.description,
        category: pokemon.description.genus,
        image: pokemon.data.sprites.front_default,
        height: pokemon.data.height * 10,
        weight: pokemon.data.weight / 10,
        ability: pokemon.data.abilities[0].ability.name
    }
}


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
    const pokemonTypeColors : { [key: string]: string } = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
      };
      
    



    return(
        <>
        <div className="App">
        <div className="center">
            <div className="mainBlock">
                <div className="mainHeader"></div>
                <div className="mainContent">


                    <div className="card">

                        <div className="cardTitle">
                                <h2>{name}</h2>
                            <div className="cardType">
                                <div className="typeImage"></div>
                                <div className="typeName">
                                    <p>{type}</p>
                                </div>
                            </div>
                                <div className="cardImage" style={{ backgroundImage: `url(${image})` }}></div>
                        </div>

                        <div className="cardInformations">

                            <div className="cardInfo">
                                <div className="cardInfoTitle"  style={{ color: `${pokemonTypeColors[type]} ` }}>
                                    <p>Height</p>
                                </div>
                                <div className="cardInfoContent">
                                    <p>{height} cm</p>
                                </div>
                            </div>

                            <div className="cardInfo">
                                <div className="cardInfoTitle" style={{ color: `${pokemonTypeColors[type]} ` }}>
                                    <p>Weight</p>
                                </div>
                                <div className="cardInfoContent">
                                    <p>{weight} kg</p>
                                </div>
                            </div>

                            <div className="cardInfo">
                                <div className="cardInfoTitle" style={{ color: `${pokemonTypeColors[type]} ` }}>
                                    <p>Category</p>
                                </div>
                                <div className="cardInfoContent">
                                    <p>{category}</p>
                                </div>
                            </div>

                            <div className="cardInfo">
                                <div className="cardInfoTitle" style={{ color: `${pokemonTypeColors[type]} ` }}>
                                    <p>Ability</p>
                                </div>
                                <div className="cardInfoContent">
                                    <p>{ability}</p>
                                </div>
                            </div>
                        </div>

                        <div className="cardDescription">
                            <p>{description}</p>
                        </div>

                        <div className="cardStats">
                            <div className="statGraph"></div>
                        </div>

                    </div>


                </div>
            </div>
            <div className="sideBlock"></div>
        </div>
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