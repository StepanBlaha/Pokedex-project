import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useUser } from '@clerk/clerk-react';
import { PencilLine  } from 'lucide-react';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FavouriteRecord } from "../../types/favourite";
import { titleCaseWord } from "../../utils/text";

const loadFavourite = async(id: string, key: string) => {
    const items = await axios.post<FavouriteRecord>(`http://localhost:5000/api/favourite/get`, {
    userId: id,
    key: key
    });
    
    return items.data.value

}
const updateFavourite = async(id: string, key: string, value: string | number ) => {
    const items = await axios.post<FavouriteRecord>(`http://localhost:5000/api/favourite/create`, {
    userId: id,
    key: key,
    value: value
    });
    return items.data.value

}


export default function Profile(){
    const { height, width } = useWindowDimensions(); // Window size
    const { user, isLoaded } = useUser();
    useEffect(()=>{
        console.log(user?.id);            // Clerk user ID
        console.log(user?.emailAddresses); // Array of email objects
        console.log(user?.username); // Your custom username, etc.
    },[isLoaded, user])

    // Pokemon collects
    const pokemonTypeColors : { [key: string]: string } = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
    };
    const [typesOpen, setTypesOpen] = useState<boolean>(false);
    const [favourite, setFavourite] = useState({
        Type: "",
        Pokemon:"",
        Region:""
    })
    // Handle changin favourite
    const handleFavourite = (key: string, value: string | number) => {
        if(!user) return
        updateFavourite(user?.id, key, value)
        setFavourite(prev => ({
            ...prev,
            [key]: value
        }));
    }
    // Set default favourite
    useEffect(()=>{
        if(!user) return
        const fetchFavs = async () => {
        try {
            const [type, pokemon, region] = await Promise.all([
                loadFavourite(user.id, "Type"),
                loadFavourite(user.id, "Pokemon"),
                loadFavourite(user.id, "Region"),
            ]);
            setFavourite({ Type: type, Pokemon: pokemon, Region: region });
        } catch (err) {
            console.error("Chyba při načítání oblíbeného:", err);
        }
    };

    fetchFavs();
    },[user])

    return(
        <>
        <div className={styles.App}>
            <div className={styles.center}>
                <Header/>


                <div className={styles.mainBlock}>
                    <div className={styles.mainContent}>
                    
                        <div className={styles.ProfileBlock}>

                            <div className={styles.ProfileHeader}>
                                <p className={styles.ProfileName}>{user?.username}</p>
                                <div className={`${styles.trainerItem} ${styles.item}`}></div>
                                <div className={styles.TrainerLevel}>
                                    <p>lvl 34</p>
                                    <div className={styles.TrainerLevelBar}></div>
                                </div>
                            </div>

                            <div className={styles.ProfileContent}>

                                <div className={styles.Favourite}>
                                    <div className={styles.FavGroup}>
                                        <div className={`${styles.pokeballItem}`}></div>
                                        {width > 100 && (
                                            <>
                                                <p>Favourite Pokemon: {titleCaseWord(favourite.Pokemon)}</p>
                                            </>
                                        )}
                                    </div>

                                    <div className={styles.FavGroup}>
                                        <div className={styles.FavEdit}>
                                            <PencilLine />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.Favourite}>
                                    {typesOpen && (
                                        <div className={styles.TypeSelect}>
                                            {(Object.entries(pokemonTypeColors) as [keyof typeof pokemonTypeColors, string][])
                                                .map(([key, color], i) => (
                                                    user &&
                                                    <div className={styles.Type} onClick={()=>{handleFavourite("Type", key); setTypesOpen(false)}}>
                                                        <div className={styles.typeImage}  style={{ backgroundImage: `url(/assets/typeBanners/${key}.png` }}></div>
                                                    </div>
                                            ))}
                                            
                                        </div>
                                    )}
                                    <div className={styles.FavGroup}>
                                        <div className={`${styles.tmItem}`}></div>
                                        {width > 100 && (
                                            user && 
                                            <>
                                                <p>Favourite Type: </p>
                                                <div className={styles.typeImage}  style={{ backgroundImage: `url(/assets/typeBanners/${favourite.Type}.png` }}></div>
                                            </>
                                        )}
                                    </div>

                                    <div className={styles.FavGroup}>
                                        <div className={styles.FavEdit} onClick={()=>setTypesOpen(!typesOpen)}>
                                            <PencilLine />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.Favourite}>
                                    <div className={styles.FavGroup}>
                                        <div className={`${styles.mapItem}`}></div>
                                        {width > 100 && (
                                            <p>Favourite Region: {titleCaseWord(favourite.Region)}</p>
                                        )}
                                    </div>

                                    <div className={styles.FavGroup}>
                                        <div className={styles.FavEdit}>
                                            <PencilLine />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={styles.PokedexLink}>
                                    <div className={`${styles.pokedexItem}`}></div>
                                        <div className={styles.link}>
                                            <Link to={"/pokedex"}>Pokedex</Link>
                                        </div>
                                </div>


                            </div>
                        </div>
                    
                    

                    </div>
                </div>

                <Footer/>
            </div>
        </div>
        </>
    )
}


