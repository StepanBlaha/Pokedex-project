import React, { useEffect, useState, forwardRef  } from 'react';
import styles from "./index.module.css"
import { CardProps } from '../../../types/card';
import { Star } from 'lucide-react';
import { pokemonTypeColors } from '../../../constants/types';
interface FavPokemonProps extends CardProps{
    onClick: (key: string, value: string | number) =>void,
    onClose: ()=>void,
    favourite?: boolean
}

const Card = forwardRef<HTMLDivElement, FavPokemonProps>(({ name, id, type, onClick, favourite, onClose }, ref)=>{
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    // Make sure the hover url exists

    return(
    <div className={styles.card} ref={ref} >
        <div className={styles.sprite} style={{ backgroundImage: `url(${spriteUrl})` }}></div>
        <div className={styles.cardTitle}>
            <p style={{ color: `${pokemonTypeColors[type]} ` }} >{name}</p>
        </div>
        <div className={styles.cardButton} style={{ backgroundColor: `${pokemonTypeColors[type]} ` }} onClick={()=>{onClick("Pokemon",id); onClose()}}>
            <div className={styles.buttonCenter}>
                <Star fill={favourite === true ? "black" : "none"}/>
            </div>
        </div>
    </div>
    )
})

export default Card;