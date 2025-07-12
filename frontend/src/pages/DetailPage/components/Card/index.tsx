import {PokemonDetailCardProps} from "../../../../types/pokemon"
import BarChart from "../../../../components/Charts/BarChart";
import { ChartData, scales } from 'chart.js';
import styles from "./index.module.css"
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { PokemonListResult, UserPokedexRecord } from "../../../../types/pokemon";
import { FavouriteRecord } from "../../../../types/favourite";
import Button from "../../../../components/Button";
import EvolutionList from "../EvolutionList";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Star } from 'lucide-react';
import { pokemonTypeColors } from "../../../../constants/types";
import { Sparkle } from 'lucide-react';
// Load users caught pokemon
const loadUsersPokemon = async(id: string) => {
    const items = await axios.post<UserPokedexRecord>(`http://localhost:5000/api/userpokedex/get`, {
    userId: id,
    });
    return items.data.pokemonIds
}
// Load favourite data
const loadFavourite = async(id: string, key: string) => {
    const items = await axios.post<FavouriteRecord>(`http://localhost:5000/api/favourite/get`, {
    userId: id,
    key: key
    });
    return items.data.value
}
// Update favourite data
const updateFavourite = async(id: string, key: string, value: string | number ) => {
    const items = await axios.post<FavouriteRecord>(`http://localhost:5000/api/favourite/create`, {
    userId: id,
    key: key,
    value: value
    });
    return items.data.value
}
export default function Card({data, backData, id}: PokemonDetailCardProps){
    const [flipped, setFlipped] = useState(false); // Card flipped state
    const [statLabels, setStatLabels] = useState<string[]>([]); // Labels for pokemon stats
    const { user, isLoaded } = useUser(); // User auth data
    const [statValues, setStatValues] = useState<number[]>([]); // Pokemons stats
    const [ userPokedex, setUserPokedex] = useState<number[]>([]); // Users pokedex
    const [showShiny, setShowShiny] = useState<boolean>(false);
    const backShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`
    const shiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
    const generationMap: {[key:string]:number} = {
        "generation-i": 1,
        "generation-ii": 2,
        "generation-iii": 3,
        "generation-iv": 4,
        "generation-v": 5,
        "generation-vi": 6,
        "generation-vii": 7,
        "generation-viii": 8,
        "generation-ix": 9
    };
    // Favourite pokemon
    const [favourite, setFavourite] = useState({
        Pokemon:""
    })

    useEffect(()=>{
        if(data?.stats){
            const statNames = data.stats?.map(stat => stat.stat.name)
            setStatLabels(statNames)
            const statVals = data.stats?.map(stat => stat.base_stat)
            setStatValues(statVals)
        }
        
    },[data])
    // If user is logged in load his pokedex
    useEffect(()=>{
        if(user){
            loadUsersPokemon(user?.id)
            .then(data => setUserPokedex(data))
        }
    }, [user])
    // Define the data for the bar chart and the setup
    const barData: ChartData<'bar'> = {
        labels: statLabels,
        datasets: [
            {
            label: '',
            data: statValues,
            backgroundColor: `${pokemonTypeColors[data.type]}`,
            },
        ],
    };
    
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 3,
        plugins: {
            title: {
            display: false
            },
            legend: {
            display: false,
            },
        },
        scales: {
            y: {
                display: false, 
                grid: {
                  display: false
                }
              },
              x: {
                grid: {
                  display: false 
                }
              }
        }
    };
  
    // Fallback for when backsprite doesnt exist
    useEffect(()=>{
        if(backData.back_sprite == null){
            backData.back_sprite = data.image
    }
    },[])
    // Handle changing favourite
    const handleFavourite = (key: string, value: string | number) => {
        if(!user) return
        console.log(value)
        updateFavourite(user?.id, key, value)
        setFavourite(prev => ({
            ...prev,
            [key]: value
        }));
    }
    // Set default favourite
    useEffect(()=>{
        if(!user) return
        const fetchFavs = async () => {
            try {
                const [pokemon] = await Promise.all([
                    loadFavourite(user.id, "Pokemon")
                ]);
                setFavourite({ Pokemon: pokemon});
            } catch (err) {
                console.error("Chyba při načítání oblíbeného:", err);
            }
        };
        fetchFavs();
    },[user])

    return(
        <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>

                <div className={styles.front}>
                    <div className={styles.cardTitle}>
                        <div className={styles.cardTitleGroup}>
                            <h2>{data.name}</h2>
                            {userPokedex.length > 0 && userPokedex.includes(Number(id)) ? (
                                <>
                                <div className={styles.pokeball}>
                                    <span className={styles.text}>
                                        <span className={styles.tooltip}>Pokemon caught</span>
                                    </span>
                                </div>
                                </>
                            ): ""}
                            {user && (
                                <div className={styles.Fav} onClick={()=>{Number(favourite.Pokemon) === Number(id) ? handleFavourite("Pokemon",0) : handleFavourite("Pokemon",Number(id))}}>
                                    <Star fill={Number(favourite.Pokemon) === Number(id) ? "black" : "none"}/>
                                    <span className={styles.textFav}>
                                        <span className={styles.tooltipFav}>Favourite</span>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={styles.cardType}>
                            <div className={styles.typeImage}  style={{ backgroundImage: `url(/assets/typeBanners/${data.type}.png` }}></div>
                        </div>
                        {showShiny === true ? (
                            <div className={styles.cardImage} style={{ backgroundImage: `url(${shiny})` }}></div>
                        ) : (
                            <div className={styles.cardImage} style={{ backgroundImage: `url(${data.image})` }}></div>
                        )}
                        
                    </div>

                    <div className={styles.cardInformations}>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle}  style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Height</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{data.height} cm</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle} style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Weight</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{data.weight} kg</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle} style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Category</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{data.category}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle} style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Ability</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{data.ability}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cardDescription}>
                        <p>{data.description}</p>
                    </div>

                    <div className={styles.cardStats}>
                        <div className={styles.statGraph} >
                            <BarChart data={barData} options={{
                            ...barOptions,
                            plugins: {
                                ...barOptions.plugins,
                                datalabels: {
                                anchor: 'start', 
                                align: 'end',    
                                color: 'black',  
                                font: {
                                    size: 14, 
                                    weight: 'bold'
                                },
                                formatter: (value) => value 
                                }
                            }
                            }}/>
                        </div>
                    </div>
                </div>

                <div className={styles.back}>
                    
                    <div className={styles.cardTitle}>
                            <h2>{data.name}</h2>
                        <div className={styles.cardType}>
                            <div className={styles.typeImage}  style={{ backgroundImage: `url(/assets/typeBanners/${data.type}.png` }}></div>

                        </div>
                            {showShiny === true ? (
                                <div className={styles.cardImage} style={{ backgroundImage: `url(${backShiny})` }}></div>
                            ) : (
                                <div className={styles.cardImage} style={{ backgroundImage: `url(${backData.back_sprite})` }}></div>
                            )}
                    </div>

                    <div className={styles.cardInformationsBack}>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle}  style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Shape</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{backData.shape}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle} style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Color</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{backData.color}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle} style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Generation</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{generationMap[backData.generation]}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle} style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Base Happiness</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{backData.happiness}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle} style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Capture rate</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{backData.capture_rate}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoTitle} style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                                <p>Species</p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{backData.species}</p>
                            </div>
                        </div>

                    </div>

                    <div className={styles.cardEvolutions}>
                        <EvolutionList evolutions={backData.evolution_chain} title_color={pokemonTypeColors[data.type]}/>
                    </div>

                </div>
            
            <Button onClick={()=>setFlipped(!flipped)} className={styles.flipButton}   style={{ backgroundColor: `${pokemonTypeColors[data.type]} ` }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-left-icon lucide-arrow-right-left"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
            </Button>
            <div className={styles.ShinyToggle} onClick={()=>setShowShiny(!showShiny)}>
                <Sparkle fill={showShiny === true?  "black" : "none"}/>
                <span className={styles.textShiny}>
                    <span className={styles.tooltipShiny}>Shiny</span>
                </span>
            </div>
        </div>
    )
}