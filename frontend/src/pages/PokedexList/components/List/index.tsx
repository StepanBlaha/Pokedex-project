import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import styles from "./index.module.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import Card from '../Card';

interface Pokemon {
    name: string;
    url: string;
  }
interface ListProps{
    data: Pokemon[];
    lastCardRef: React.RefObject<HTMLDivElement | null>; 
}

export default function List({ data, lastCardRef }: ListProps){
    // Load the cards
    const cardList = data.map((item, index)=>(
        <Card key={item.name} name={item.name}   ref={index === data.length - 1 ? lastCardRef : null} />
    ))

    return (
        <div className='pokedexList'>
            {cardList}
        </div>
    )
}