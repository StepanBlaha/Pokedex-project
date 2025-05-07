import React, { useEffect, useState } from 'react';
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
    data: Pokemon[]
}

export default function List({data}: ListProps){
    // Load the cards
    const cardList = data.map((item)=>(
        <Card key={item.name} name={item.name}/>
    ))

    return (
        <div className='pokedexList'>
            {cardList}
        </div>
    )
}