
import React, { useEffect, useState, forwardRef  } from 'react';
import axios from "axios";
import styles from "./index.module.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import { CardProps } from '../../../../types/card';


const Card = forwardRef<HTMLDivElement, CardProps>(({ name }, ref)=>{
    return(
    <div className={styles.card} ref={ref}>
        <div className={styles.cardTitle}>
            <p>{name}</p>
        </div>
        <div className={styles.cardButton}></div>
    </div>
    )
})
 
export default Card;