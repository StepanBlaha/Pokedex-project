import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState } from 'react';
import "./index.css"
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';




export default function PokedexList(){
    useEffect(()=>{
        fetch("http://localhost:5000/api/pokedex?page=2&limit=10")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    },[])


    return(
        <>
        
        <div className="center">
            <div className="mainBlock">
                <div className="mainHeader"></div>
                <div className="mainContent">

                    <div className="card">
                        <p>sds</p>
                    </div>



                </div>
            </div>
        </div>



        </>
    )
}


