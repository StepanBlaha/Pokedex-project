import {PokemonDetailCardProps} from "../../../../types/pokemon"
import BarChart from "../../../../components/Charts/BarChart";
import { ChartData, scales } from 'chart.js';
import styles from "./index.module.css"
import React, { useEffect, useState, Suspense, lazy } from 'react';
import Button from "../../../../components/Button";
import EvolutionList from "../EvolutionList";


export default function Card({data, backData}: PokemonDetailCardProps){
    const [flipped, setFlipped] = useState(false)
    const [statLabels, setStatLabels] = useState<string[]>([])
    const [statValues, setStatValues] = useState<number[]>([])
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

    useEffect(()=>{
        if(data?.stats){
            const statNames = data.stats?.map(stat => stat.stat.name)
            setStatLabels(statNames)
            const statVals = data.stats?.map(stat => stat.base_stat)
            setStatValues(statVals)
        }
        
    },[data])
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
    
    return(
        <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>

                <div className={styles.front}>
                    <div className={styles.cardTitle}>
                            <h2>{data.name}</h2>
                        <div className={styles.cardType}>
                            <div className={styles.typeImage}  style={{ backgroundImage: `url(/assets/typeBanners/${data.type}.png` }}></div>
                        </div>
                        <div className={styles.cardImage} style={{ backgroundImage: `url(${data.image})` }}></div>
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
                            <div className={styles.cardImage} style={{ backgroundImage: `url(${backData.back_sprite})` }}></div>
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
        </div>
    )
}