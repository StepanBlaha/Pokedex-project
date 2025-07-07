import React, { useEffect, useState, forwardRef  } from 'react';
import styles from "./index.module.css"
import { CardProps } from '../../../../types/card';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { UserPokedexRecord } from '../../../../types/pokemon';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';



  // Func
const Card = forwardRef<HTMLDivElement, CardProps>(({ name, id, type, caught = true, entries, onToggle }, ref)=>{
    const [localEntries, setLocalEntries] = useState<number[]>(entries ?? []);
    useEffect(() => {
        setLocalEntries(entries ?? []);
    }, [entries])
    const { user, isLoaded } = useUser(); // User auth data
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
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    // Make sure the hover url exists
    useEffect(() => {
        const testUrl = `https://play.pokemonshowdown.com/sprites/gen5ani/${name.toLowerCase()}.gif`;
        const img = new Image();
        // Set listeners
        img.onload = () => {
            setHoverBgUrl(testUrl); // Exists
        };
        img.onerror = () => {
            setHoverBgUrl(spriteUrl); // Doenst exist
        };
        // Test
        img.src = testUrl;
    }, [name, spriteUrl]);


    const HandlePokedexChange = (add: boolean) => {
    if(!user || !onToggle) return;
    onToggle(id, add);
    }

    return(
    <div className={`${styles.card} ${caught ? styles.Caught : ""}`} ref={ref}  
    onMouseEnter={()=>setIsHovering(true)}
    onMouseLeave={()=>setIsHovering(false)}
    >
        <div className={styles.sprite} style={{ backgroundImage: `url(${isHovering? hoverBgUrl: spriteUrl})` }}></div>
        <div className={styles.cardTitle}>
            <p style={{ color: `${pokemonTypeColors[type]} ` }} >{name}</p>
        </div>
        
        {caught === true ? (
            <div className={styles.cardButton} style={{ backgroundColor: `${pokemonTypeColors[type]} ` }} onClick={()=>HandlePokedexChange(false)}>
                <div className={styles.buttonCenter}>
                    <Minus/>
                </div>
            </div>
        ):(
            <div className={styles.cardButton} style={{ backgroundColor: `${pokemonTypeColors[type]} ` }} onClick={()=>HandlePokedexChange(true)}>
                <div className={styles.buttonCenter}>
                    <Plus/>
                </div>
            </div>
        )}
        


    </div>
    )
})
 
export default Card;


