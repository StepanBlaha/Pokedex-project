import React, { useEffect, useState, forwardRef  } from 'react';
import styles from "./index.module.css"
import { Item, ItemProps } from '../../../../types/items';


const Card = forwardRef<HTMLDivElement, ItemProps>(({ name, id, attributes, category, cost, effect_entries, flavor_text_entries, sprite}, ref)=>{
    const [desc, setDesc]= useState("")
    useEffect(()=>{
        effect_entries.forEach((item) => {
            console.log(item)
            if(item.language.name === 'en'){
                setDesc(item.effect)
                return;
            }
        });
    },[])
    return(
    <div className={styles.card} ref={ref}  >
        
        <div className={styles.itemImage}  style={{ backgroundImage: `url(${sprite})` }}></div>
        <div className={styles.cardTitle}>
            <p  >{name}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.cardCategory}>
            <p>Category</p>
            <p >{category}</p>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.cardCost}>
            <p>cost</p>
            <p >{cost ? cost : 0}</p>
        </div>

        <div className={styles.tooltipContainer}>
            <span className={styles.text}>
            <span className={styles.tooltip}>{desc}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </span>
        </div>
        

    </div>
    )
})
 
export default Card;