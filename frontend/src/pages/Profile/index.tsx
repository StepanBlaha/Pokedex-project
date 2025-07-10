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
import { PokemonListResult, Pokemon } from "../../types/pokemon";
import List from "./List";
import { pokemonTypeColors } from "../../constants/types";
import { getSprite } from "../../utils/sprites";
import { getCachedData } from "../../utils/cache";
// Load favourite data
const loadFavourite = async(id: string, key: string) => {
    const items = await axios.post<FavouriteRecord>(`http://localhost:5000/api/favourite/get`, {
    userId: id,
    key: key
    });
    return items.data.value
}
// Update favourite data
const updateFavourite = async(id: string, key: string, value: string | number ) => {
    const items = await axios.post<FavouriteRecord>(`http://localhost:5000/api/favourite/create`, {
    userId: id,
    key: key,
    value: value
    });
    return items.data.value
}
// Load all pokemon
const loadPokemon = async (page: number) =>{
    const res = await axios.get<PokemonListResult>(`http://localhost:5000/api/pokedex?page=${page}&limit=10`)
    return res.data
}
// Load all pokemon
const fetchAllPokemonInBatches = async () => {
    const cache = getCachedData("sb_pokemon");
    if(cache !== null) return JSON.parse(cache);
    const limit = 100;
    let page = 0;
    let allResults: Pokemon[] = [];
    let hasMore = true;

    while (hasMore) {
        try {
        const res = await axios.get<PokemonListResult>(`http://localhost:5000/api/pokedex?page=${page}&limit=${limit}`);
        allResults = [...allResults, ...res.data.results];
        if (res.data.results.length < limit) {
            hasMore = false; // no more pages
        } else {
            page++;
        }
        } catch (error) {
        console.error("Error fetching batch:", error);
        hasMore = false;
        }
    }
    localStorage.setItem("sb_pokemon", JSON.stringify(allResults))
    return allResults;
}

export default function Profile(){
    const { height, width } = useWindowDimensions(); // Window size
    const { user, isLoaded } = useUser(); // User context
    const [page, setPage] = useState<number>(0); // Page for infinity scroll
    const [typesOpen, setTypesOpen] = useState<boolean>(false); // Favourite type modal flag
    const [pokeOpen, setPokeOpen] = useState<boolean>(false); // Favourite pokemon modal flag
    const [items, setItems] = useState<Pokemon[]>([]); // Fetched pokemon
    const lastRef = useRef<HTMLDivElement | null>(null); // Last pokemon for infinity scroll
    const [favourite, setFavourite] = useState({
        Type: "",
        Pokemon:"",
        Region:""
    })
    const favoriteId = Number(favourite.Pokemon); // Favourite pokemons id
    const [favPoke, setFavPoke] = useState<Pokemon | undefined>();
    const favouritePokeSprite = getSprite(favoriteId); // Favourite pokemons sprite
    const [allPoke, setAllPoke] = useState<Pokemon[]>(); // All pokemon

    // Set favourite pokemon
    useEffect(()=>{
        if (!allPoke || allPoke.length === 0) return;
        const favouritePoke = allPoke.find(item => Number(item.id) === Number(favoriteId)); // Favourite pokemons data
        setFavPoke(favouritePoke)
    }, [allPoke, favoriteId])

    // Load all pokemon
    useEffect(() => {
        const loadAll = async () => {
            const allPokemon = await fetchAllPokemonInBatches();
            setAllPoke(allPokemon);
        }
        loadAll();
    }, []);
    
    // Handle fetching pokemon
    const {data, refetch, isFetching, error} = useQuery({
        queryKey: ["pokemon", page],
        queryFn:()=> loadPokemon(page),
        enabled: false,
    })

    // Handle changing favourite
    const handleFavourite = (key: string, value: string | number) => {
        if(!user) return
        console.log(value)
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

    // Update items when data changes
    useEffect(() => {
        if (data?.results) {
            setItems((prev) => [...prev, ...data.results.filter(p => !prev.some(existing => existing.id === p.id))]);
        }
    }, [data]);

    // Infinity scroll logic
    useEffect(() => {
        if (!pokeOpen || !lastRef.current || isFetching) return;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetching) {
            setPage(prev => prev + 1);
            }
        }, { threshold: 0.5 });
        const current = lastRef.current;
        observer.observe(current);
        return () => observer.unobserve(current);
    }, [pokeOpen, lastRef.current, isFetching]);
    // Refetch on page change
    useEffect(() => {
        refetch();
    }, [page]);

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
                                    {pokeOpen && (
                                        <div className={styles.PokemonSelect}>
                                            <List data={items} lastCardRef={lastRef} onClick={handleFavourite} favourite={Number(favourite.Pokemon)} onClose={()=>setPokeOpen(false)}/>
                                        </div>
                                    )}
                                    <div className={styles.FavGroup}>
                                        {favouritePokeSprite ? (<div className={`${styles.pokeballItem}`} style={{backgroundImage: `url(${favouritePokeSprite})`, imageRendering: "unset"}}></div>):(<div className={`${styles.pokeballItem}`} ></div>)}
                                        {width > 100 && (
                                            <>
                                                <p>Favourite Pokémon: {favPoke ? titleCaseWord(favPoke.name) : "Unknown"}</p>
                                            </>
                                        )}
                                    </div>

                                    <div className={styles.FavGroup}>
                                        <div className={styles.FavEdit} onClick={()=>setPokeOpen(!pokeOpen)}>
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
                                        {favourite.Type !== undefined ? (
                                            <div className={`${styles.tmItem}`} style={{ backgroundImage: `url(/assets/tms/${favourite.Type}.png` }}></div>
                                        ):(
                                            <div className={`${styles.tmItem}`} ></div>
                                        )}
                                        {width > 100 && (
                                            user && 
                                            <>
                                                <p>Favourite Type: </p>
                                                <div className={styles.typeImageSelected}  style={{ backgroundImage: `url(/assets/typeBanners/${favourite.Type}.png` }}></div>
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


