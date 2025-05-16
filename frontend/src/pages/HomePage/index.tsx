


import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import Header from "../../components/Header";


  

export default function HomePage(){


    return(
        <>
        <div className={styles.App}>
          <div className={styles.center}>
              <Header/>


              <div className={styles.mainBlock}>
                  <div className={styles.mainContent}>
                      
                    <div className={styles.Hero}>
                        <div className={styles.HeroTitle}>
                            <h2>Welcome to PokeLog</h2>
                            <p>Fan made multipurpose pokedex</p>
                        </div>
                        <div className={styles.HeroText}>
                            <p>Pokelog is a fan made passion project. It aims to help group all the data together for better orientation. Need to find a pokemons stats? No worries simply search for him and open his card! Need to find moves accuracy or pp, easily open move page and search for it. The idea for the project came from my own experience. With this i can easily find what pokemon im missing from my pokedex, find what number pokemon is in the pokedex,r what his base stats are and much more...</p>
                        </div>
                    </div>

                    <div className={styles.Pages}>
                        <div className={styles.PageTitle}>
                            <p>Quickly explore all our dexes!</p>
                        </div>
                        <div className={styles.PageButtons}>

                            <div className={styles.link} id={styles.PokedexLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-right-icon lucide-arrow-big-right"><path d="M6 9h6V5l7 7-7 7v-4H6V9z"/></svg>
                                <Link to="/pokedex">Pokedex</Link>
                            </div>

                            <div className={styles.link} id={styles.ItemLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-right-icon lucide-arrow-big-right"><path d="M6 9h6V5l7 7-7 7v-4H6V9z"/></svg>
                                <Link to="/items">Items</Link>
                            </div>

                            <div className={styles.link} id={styles.MoveLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-right-icon lucide-arrow-big-right"><path d="M6 9h6V5l7 7-7 7v-4H6V9z"/></svg>                
                                <Link to="/moves">Moves</Link>
                            </div>

                        </div>
                    </div>
                    
                    <div className={styles.Future}>
                        <div className={styles.FutureTitle}>
                            <h2>Future changes</h2>
                            <p>Here’s what we’re working on next!</p>
                        </div>
                        <div className={styles.FutureText}>
                            <ul>
                                <li>User account system</li>
                                <li>Filter option for pokemons, moves and items</li>
                                <li>Personal pokedex system</li>
                                <li>Shiny checklist</li>
                                <li>Ai-powered chatbot</li>
                                <li>And much more!!</li>
                            </ul>
                        </div>

                    </div>

                  </div>
              </div>
          </div>
        </div>
        </>
    )
}


