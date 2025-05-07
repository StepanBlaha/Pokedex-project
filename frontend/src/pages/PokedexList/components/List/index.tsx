import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import styles from "./index.module.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import Card from '../Card';
import { PokemonListProps } from '../../../../types/pokemon';



export default function List({ data, lastCardRef }: PokemonListProps){
    // Load the cards
    const cardList = data.map((item, index)=>(
        <Card key={item.name} name={item.name}   ref={index === data.length - 1 ? lastCardRef : null} id={item.id} type={item.types[0]}/>
    ))

    return (
        <div className={styles.pokedexList}>
            {cardList}
        </div>
    )
}