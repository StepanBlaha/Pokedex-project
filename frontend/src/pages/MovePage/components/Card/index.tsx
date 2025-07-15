import React, { useEffect, useState, forwardRef  } from 'react';
import styles from "./index.module.css"
import { MoveCardprops } from '../../../../types/card';
import { pokemonTypeColors } from '../../../../constants/types';

const Card = forwardRef<HTMLDivElement, MoveCardprops>(({ name, id, type, accuracy, pp, class_name, category, power }, ref)=>{

    return(
    <div className={styles.card} ref={ref}  >
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
            <p style={{ color: `${pokemonTypeColors[type]} ` }}>{power ? power : 0}</p>
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