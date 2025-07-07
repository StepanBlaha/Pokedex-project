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




export default function Profile(){
    const { height, width } = useWindowDimensions(); // Window size
    const { user, isLoaded } = useUser();
    useEffect(()=>{
        console.log(user?.id);            // Clerk user ID
        console.log(user?.emailAddresses); // Array of email objects
        console.log(user?.username); // Your custom username, etc.
    },[isLoaded, user])

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
                                            <p>Favourite Pokemon:</p>
                                        )}
                                    </div>

                                    <div className={styles.FavGroup}>
                                        <div className={styles.FavEdit}>
                                            <PencilLine />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.Favourite}>
                                    <div className={styles.FavGroup}>
                                        <div className={`${styles.tmItem}`}></div>
                                        {width > 100 && (
                                            <p>Favourite Type:</p>
                                        )}
                                    </div>

                                    <div className={styles.FavGroup}>
                                        <div className={styles.FavEdit}>
                                            <PencilLine />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.Favourite}>
                                    <div className={styles.FavGroup}>
                                        <div className={`${styles.mapItem}`}></div>
                                        {width > 100 && (
                                            <p>Favourite Region:</p>
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


