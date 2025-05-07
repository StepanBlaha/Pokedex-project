
import React, { useEffect, useState, forwardRef  } from 'react';
import axios from "axios";
import styles from "./index.module.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';

interface CardProps{
    name: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ name }, ref)=>{
    return(
    <div className={styles.card} ref={ref}>
        <p>{name}</p>
    </div>
    )
})

export default Card;