import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Pokemon, PokemonListResult, SearchedPokemon, SearchedPokemonList } from "../../types/pokemon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { usePokemon } from "../../context/pokemonContext";
import { pokemonTypes } from "../../constants/types";
import { ChevronRight, ChevronDown } from "lucide-react";

interface SelectProps{
    onChange:(val:string)=>void
}
export default function Select({onChange}: SelectProps){
    const [ open, setOpen ] = useState<boolean>(false); 
    const [ val, setVal ] = useState<string>("")

    useEffect(()=>{
        onChange(val);
    },[val])
    return(
        <>
        <div className={styles.Select}>
            <p>{val !== "" ? val : "Type"}</p>
            <div className={styles.Open} onClick={()=>setOpen(!open)}>
                {open ? <ChevronDown/> : <ChevronRight/>}
            </div>
            {open && (
                <div className={styles.Options}>
                    <div onClick={()=>{setVal(""); setOpen(false)}} className={styles.Option}>all</div>
                    {pokemonTypes.map((type, i)=>(
                    <div onClick={()=>{setVal(type); setOpen(false)}} className={styles.Option}>{type}</div>
                    ))}
                </div>
            )}

        </div>
        </>
    )
}


