import React, { useEffect, useState, forwardRef  } from 'react';
import styles from "./index.module.css"
import { Item, ItemProps } from '../../../../types/items';


const Card = forwardRef<HTMLDivElement, ItemProps>(({ name, id, attributes, category, cost, effect_entries, flavor_text_entries, sprite}, ref)=>{

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