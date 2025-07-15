import {PokemonDetailCardProps} from "../../../../types/pokemon"
import styles from "./index.module.css"
import React, { useEffect, useState, Suspense, lazy, FormEvent } from 'react';
import { useUser } from "@clerk/clerk-react";
import { ChevronRight, RefreshCcw  } from 'lucide-react';
import { GetUserLevel, UpdateUserLevel } from "../../../../utils/fetch";

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

    // Start new game
    const handlePlayAgain = () => {
        newId();
    }

    const handleGuess = async(e: FormEvent) => {
        e.preventDefault();
        setTries(tries+1); // Increment try counter
        setGuesses(prev=> [...prev, guess]) // Add to guessed words
        if(guess.toLowerCase() === data.name.toLowerCase()){
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
                            <input type="text" className={styles.GuessInput} value={guess} onChange={(e)=>setGuess(e.target.value)} disabled={guessed === true}/>
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