
import React, { useEffect, useState, forwardRef  } from 'react';
import axios from "axios";
import styles from "./index.module.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import { MoveCardprops } from '../../../../types/card';
import { extractIdFromUrl } from '../../../../utils/url';
import { Link } from 'react-router-dom';


const Card = forwardRef<HTMLDivElement, MoveCardprops>(({ name, id, type, accuracy, pp, class_name, category, power }, ref)=>{
    const [isHovering, setIsHovering] = useState(false)
    const [hoverBgUrl, setHoverBgUrl] = useState("")
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
    <div className={styles.card} ref={ref}  
    onMouseEnter={()=>setIsHovering(true)}
    onMouseLeave={()=>setIsHovering(false)}
    >
        
        <div className={styles.typeImage}  style={{ backgroundImage: `url(/assets/typeBanners/${type}.png` }}></div>
        <div className={styles.cardTitle}>
            <p style={{ color: `${pokemonTypeColors[type]} ` }} >{name}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.cardCategory}>
            <p>Category</p>
            <p style={{ color: `${pokemonTypeColors[type]} ` }}>{category}</p>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.cardPower}>
            <p>Power</p>
            <p style={{ color: `${pokemonTypeColors[type]} ` }}>{power}</p>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.cardAccuracy}>
            <p>Accuracy</p>
            <p style={{ color: `${pokemonTypeColors[type]} ` }}>{accuracy}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.cardPP}>
            <p>PP</p>
            <p style={{ color: `${pokemonTypeColors[type]} ` }}>{pp}</p>
        </div>

        
    </div>
    )
})
 
export default Card;