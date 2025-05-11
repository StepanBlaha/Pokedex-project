import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import styles from "./index.module.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import Card from '../Card';

import { MoveListProps } from '../../../../types/moves';



export default function List({ data, lastCardRef }: MoveListProps){
    // Load the cards
    const cardList = data.map((item, index)=>(
        <Card 
        key={item.name} 
        name={item.name}   
        ref={index === data.length - 1 ? lastCardRef : null} 
        id={item.id} 
        type={item.type}
        accuracy={item.accuracy}
        pp={item.pp}
        power={item.power}
        class_name={item.class}
        category={item.category}
        />
    ))

    return (
        <div className={styles.pokedexList}>
            {cardList}
        </div>
    )
}