
import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from "./index.module.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';

interface CardProps{
    name: string
}


export default function Card({name}: CardProps){
    return(
    <div className={styles.card}>
        <p>{name}</p>
    </div>
    )
}