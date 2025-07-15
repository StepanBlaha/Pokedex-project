import {PokemonDetailCardProps} from "../../../../types/pokemon"
import styles from "./index.module.css"
import React, { useEffect, useState, Suspense, lazy, FormEvent, useRef } from 'react';
import { useUser } from "@clerk/clerk-react";
import { ChevronRight, RefreshCcw  } from 'lucide-react';
import { GetUserLevel, UpdateUserLevel, loadSearch } from "../../../../utils/fetch";
import { usePokemon } from "../../../../context/pokemonContext";
import { Pokemon } from "../../../../types/pokemon";
import { useQuery } from "@tanstack/react-query";
import List from "../SuggestedList";

interface GuessCardProps extends PokemonDetailCardProps{
    newId: ()=>void
}
export default function Card({data, backData, id, newId}: GuessCardProps){
    const { user, isLoaded } = useUser(); // User auth data
    const [ guessed, setGuessed ] = useState<boolean>(false); // Correct guess flag
    const [ guess, setGuess ] = useState<string>(""); // Current guess
    const [ guesses, setGuesses ] =useState<string[]>([]); // All the guesses
    const [ gameoverOpen, setGameoverOpen ] = useState<boolean>(false); // Game over flag
    const [ tries, setTries] = useState<number>(0); // Number of tries
    const [ hint, setHint ] = useState<number>(0); // Number of hints
    const { pokemon, loading } = usePokemon(); // Pokemon context
    const [items, setItems] = useState<Pokemon[]>([]); // Search result
    const [ suggestOpen, setSuggestOpen ] = useState<boolean>(false); // Suggest list open flag
    // Start new game
    const handlePlayAgain = () => {
        newId();
    }
    // Search pokemon data
    const {data: searchedPokemon, refetch: searchPokemon, isFetching: isSearching, error: searchError} = useQuery({
        queryKey: ["pokemonSearch", guess],
        queryFn:()=> loadSearch(guess),
        enabled: false,
    })

    const handleGuess = async(e?: FormEvent, guessedName?: string) => {
        setSuggestOpen(false); // Close suggest list
        if (e) e.preventDefault();
        const currentGuess = guessedName ?? guess;
        if (!currentGuess) return;

        setTries(tries+1); // Increment try counter
        setGuesses(prev=> [...prev, currentGuess]) // Add to guessed words
        if(currentGuess.toLowerCase() === data.name.toLowerCase()){
            setGuessed(true); // Set win state
            setGameoverOpen(true); // Open gameover screen
            // Handle updating users level
            if(user){
                const userData = await GetUserLevel(user.id); // Get user xp
                const userXp = userData.xp;
                const xpToAdd = 100 / (hint+1);
                const updatedData = await UpdateUserLevel(user.id, userXp + xpToAdd); // Update user xp
            }
        }else{
            setGuess("")
        }
    }

    // Update state when data changes
    useEffect(() => {
        if(searchedPokemon?.searchedPokemon){
            setItems(searchedPokemon.searchedPokemon);
        }
    }, [searchedPokemon]);

    // Perform search when guess changes
    useEffect(() => {
        if (guess !== "") { 
            if(suggestOpen === false && guessed===false) setSuggestOpen(true)
            searchPokemon();
        }
    }, [guess]);

    // Handle closing on suggest list click outside
    const InputRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (InputRef.current && !InputRef.current.contains(event.target as Node)) {
                setSuggestOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return(
        <>
            
            <div className={`${styles.card}`}>
                {!gameoverOpen && guessed === true && (
                    <button className={styles.PlayAgainButton} onClick={()=>handlePlayAgain()}>
                        Again
                        <ChevronRight/>
                    </button>
                )}
                {!gameoverOpen && guessed === false && (
                    <button className={styles.PlayAgainButtonSecond} onClick={()=>setGuessed(true)}>
                        Give up
                    </button>
                )}
                {!gameoverOpen && guessed === false && (
                    <button className={styles.PlayAgainButtonRefresh} onClick={()=>handlePlayAgain()}>
                        <RefreshCcw/>
                    </button>
                )}
                
                {gameoverOpen && (
                    <div className={styles.GameOver}>
                        <div className={styles.GameOverBlur}></div>
                        <div className={styles.GameOverAction}>
                            <p>Game won</p>
                            <div className={styles.GameOverButtons}>
                                <button className={styles.PlayAgain} onClick={()=>setGameoverOpen(false)}>See the pokemon</button>
                                <button className={styles.PlayAgain} onClick={()=>handlePlayAgain()}>Play again</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.CardHeader}>
                    <div className={styles.HiddenInfo}>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoContent}>
                                <p>Name: </p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{guessed === true ? `${data.name}` : "?"}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoContent}>
                                <p>Height: </p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{hint >= 1 || guessed === true ? `${data.height} cm` : "?"}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoContent}>
                                <p>Weight: </p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{hint >= 2 || guessed === true ? `${data.weight} kg` : "?"}</p>
                            </div>
                        </div>

                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoContent}>
                                <p>Category: </p>
                            </div>
                            <div className={styles.cardInfoContent}>
                                <p>{hint >= 3 || guessed === true ? `${data.category}` : "?"}</p>
                            </div>
                        </div>

                        <div className={styles.cardType}>
                            <p>Type:</p>
                            {hint >= 4 || guessed === true ? (
                                <div className={styles.typeImage}  style={{ backgroundImage: `url(/assets/typeBanners/${data.type}.png` }}></div>
                            ) : (
                                <div className={styles.typeImage}  style={{ backgroundImage: `url(/assets/typeBanners/${data.type}.png`, filter: `brightness(0)` }}></div>
                            )}
                            
                        </div>

                    </div>
                
                    {guessed === true ? (
                        <div className={styles.HiddenPokemon} style={{ backgroundImage: `url(${data.image})` }}></div>
                    ) : (
                        <div className={styles.HiddenPokemon} style={{ backgroundImage: `url(${data.image})`, filter: `brightness(0)` }}></div>
                    )}
                    
                </div>
                <div className={styles.CardContent}>
                    <div className={styles.Tries}>
                        <p>Tries: {tries}</p>
                        <button onClick={()=>setHint(hint+1)} className={styles.Hint} disabled={hint === 4 || guessed === true}>Hint?</button>
                    </div>
                    <div className={styles.Form}>
                        <form action="" onSubmit={(e)=>handleGuess(e)}>
                            <div className={styles.GuessInputWrapper}>
                                <input type="text" className={styles.GuessInput} value={guess} onChange={(e)=>setGuess(e.target.value)} disabled={guessed === true}/>
                                {suggestOpen === true && (
                                    <div className={styles.Suggestions} ref={InputRef}>
                                        <List data={items} onSelect={(val)=>{ setGuess(val); setSuggestOpen(false); handleGuess(undefined, val);}} onClose={()=>setSuggestOpen(false)}/>
                                    </div>
                                )}
                            </div>
                            <button className={styles.GuessSubmit} onClick={()=>{}} disabled={guessed === true}>Guess</button>
                        </form>
                    
                    </div>

                    <div className={styles.Guessed}>
                        {guesses.map((g,i)=>(
                            <p className={g.toLowerCase() === data.name.toLowerCase() ? styles.CorrectGuess : ""}>{g}{g.toLowerCase() === data.name.toLowerCase() ? "✅" : ""}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}