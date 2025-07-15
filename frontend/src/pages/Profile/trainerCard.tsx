import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { Pokemon } from "../../types/pokemon";
import { getSprite } from "../../utils/sprites";
import { checkAllBadges } from "../../utils/badges";
import { loadFavourite, updateFavourite, loadPokemon, loadUsersPokemon, fetchAllPokemonInBatches } from "../../utils/fetch";


type TrainerCardProps = {
    cardRef: React.Ref<HTMLDivElement>;
};
export default function TrainerCard( { cardRef }: TrainerCardProps){
    const { user, isLoaded } = useUser(); // User context
    const [page, setPage] = useState<number>(0); // Page for infinity scroll
    const [typesOpen, setTypesOpen] = useState<boolean>(false); // Favourite type modal flag
    const [pokeOpen, setPokeOpen] = useState<boolean>(false); // Favourite pokemon modal flag
    const [items, setItems] = useState<Pokemon[]>([]); // Fetched pokemon
    const lastRef = useRef<HTMLDivElement | null>(null); // Last pokemon for infinity scroll
    const [userPokemon, setUserPokemon] = useState<number[]>(); // Users pokemon
    const [favourite, setFavourite] = useState({
        Type: "",
        Pokemon:"",
        Region:"",
        Trainer:"",
        Background:""
    })
    const favoriteId = Number(favourite.Pokemon); // Favourite pokemons id
    const [favPoke, setFavPoke] = useState<Pokemon | undefined>();
    const favouritePokeSprite = getSprite(favoriteId); // Favourite pokemons sprite
    const [allPoke, setAllPoke] = useState<Pokemon[]>(); // All pokemon
    // Load users pokemon
    useEffect(()=>{
        if(userPokemon && userPokemon?.length > 0 ) return
        const loadUsersData = async () => {
            if(!user) return
            const userPoke = await loadUsersPokemon(user.id);
            setUserPokemon(userPoke);
        }
        loadUsersData();
    },[user])
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
            const [type, pokemon, region, trainer, background] = await Promise.all([
                loadFavourite(user.id, "Type"),
                loadFavourite(user.id, "Pokemon"),
                loadFavourite(user.id, "Region"),
                loadFavourite(user.id, "Trainer"),
                loadFavourite(user.id, "Background"),
            ]);
            setFavourite({ Type: type, Pokemon: pokemon, Region: region, Trainer: trainer, Background: background });
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
        <div className={styles.TrainerExpCard} ref={cardRef} style={{ backgroundImage: `${favourite.Background !== undefined ? `url(/assets/bgs/${favourite.Background}.jpg` : `url(/assets/bgs/12.jpg` }` }}>
            <div className={styles.TrainerExpCardMain}>
                <div className={styles.TrainerExpCardName}>{user?.username}</div>
                <div className={styles.TrainerExpCardAvatar}>
                {favouritePokeSprite ? (<div className={`${styles.TrainerExpCardPokemon}`} style={{backgroundImage: `url(${favouritePokeSprite})`}}></div>):(<div className={`${styles.TrainerExpCardPokemon}`} ></div>)}
                    {favourite.Trainer !== undefined ? (
                        <div className={`${styles.TrainerExpCardTrainer}`} style={{ backgroundImage: `url(/assets/trainers/${favourite.Trainer}.png` }}></div>
                    ):(
                        <div className={`${styles.TrainerExpCardTrainer}`}></div>
                    )}
                </div>
            </div>
            <div className={styles.TrainerExpCardBadges} >
                {userPokemon !== undefined && userPokemon.length >0 && (
                    <>
                    {
                        checkAllBadges(userPokemon).map((gen, ind)=>{
                            if(gen === true){
                                return(
                                    <>
                                    <div className={styles.TrainerExpCardBadge} style={{ backgroundImage: `url(/assets/badges/${ind+1}.png` }}></div>
                                    </>
                                )
                            } 
                        })
                    }
                    </>
                )}
            </div>
        </div>   
        
        </>
    )
}


