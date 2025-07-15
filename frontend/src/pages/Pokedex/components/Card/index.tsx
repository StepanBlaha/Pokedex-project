import React, { useEffect, useState, forwardRef  } from 'react';
import styles from "./index.module.css"
import { CardProps } from '../../../../types/card';
import { Plus, Minus } from 'lucide-react';
import { pokemonTypeColors } from '../../../../constants/types';
import { useUser } from '@clerk/clerk-react';


const Card = forwardRef<HTMLDivElement, CardProps>(({ name, id, type, caught = true, entries, onToggle }, ref)=>{
    const [localEntries, setLocalEntries] = useState<number[]>(entries ?? []);
    useEffect(() => {
        setLocalEntries(entries ?? []);
    }, [entries])
    const { user, isLoaded } = useUser(); // User auth data
    const [isHovering, setIsHovering] = useState(false)
    const [hoverBgUrl, setHoverBgUrl] = useState("")

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