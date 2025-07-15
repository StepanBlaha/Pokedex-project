import React, { useEffect, useState, forwardRef  } from 'react';
import styles from "./index.module.css"
import { CardProps } from '../../../../types/card';
import { Link } from 'react-router-dom';
import { pokemonTypeColors } from '../../../../constants/types';

const Card = forwardRef<HTMLDivElement, CardProps>(({ name, id, type }, ref)=>{
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


    return(
    <div className={styles.card} ref={ref}  
    onMouseEnter={()=>setIsHovering(true)}
    onMouseLeave={()=>setIsHovering(false)}
    >
        <div className={styles.sprite} style={{ backgroundImage: `url(${isHovering? hoverBgUrl: spriteUrl})` }}></div>
        <div className={styles.cardTitle}>
            <p style={{ color: `${pokemonTypeColors[type]} ` }} >{name}</p>
        </div>
        
        <Link to={`/pokemon/${id}`}>
            <div className={styles.cardButton} style={{ backgroundColor: `${pokemonTypeColors[type]} ` }}>
                <div className={styles.buttonCenter}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-right-icon lucide-arrow-big-right"><path d="M6 9h6V5l7 7-7 7v-4H6V9z"/></svg>                
                </div>
            </div>
        </Link>

    </div>
    )
})
export default Card;