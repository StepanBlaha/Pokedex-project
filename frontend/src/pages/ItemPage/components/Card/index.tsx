import React, { useEffect, useState, forwardRef  } from 'react';
import styles from "./index.module.css"
import { Item, ItemProps } from '../../../../types/items';


const Card = forwardRef<HTMLDivElement, ItemProps>(({ name, id, attributes, category, cost, effect_entries, flavor_text_entries, sprite}, ref)=>{
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
    <div className={styles.card} ref={ref}  >
        
        <div className={styles.typeImage}  style={{ backgroundImage: `url(${sprite})` }}></div>
        <div className={styles.cardTitle}>
            <p  >{name}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.cardCategory}>
            <p>Category</p>
            <p >{category}</p>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.cardPower}>
            <p>cost</p>
            <p >{cost ? cost : 0}</p>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.cardAccuracy}>
            <p>Accuracy</p>
            <p >{32}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.cardPP}>
            <p>PP</p>
            <p >{88}</p>
        </div>

    </div>
    )
})
 
export default Card;