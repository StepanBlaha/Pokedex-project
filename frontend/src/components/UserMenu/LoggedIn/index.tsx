import styles from "./index.module.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { loadFavourite } from "../../../utils/fetch"

type LoggedInMenuProps = {
    logout: () => void;
};

export default function LoggedInMenu({ logout }: LoggedInMenuProps) {
    const { user } = useUser(); // User context
    const [favourite, setFavourite] = useState({
        Trainer:""
    })
    // Set default favourite
    useEffect(()=>{
        if(!user) return
        const fetchFavs = async () => {
            try {
                const [trainer,] = await Promise.all([
                    loadFavourite(user.id, "Trainer")
                ]);
                setFavourite({ Trainer: trainer, });
            } catch (err) {
                console.error("Chyba při načítání oblíbeného:", err);
            }
        };
        fetchFavs();
    },[user])

    return(
        <>
        <div className={styles.link}>
            <Link to="/profile" >Profile</Link>
            {/* Show fav trainer if selected */}
            {favourite.Trainer !== undefined ? (
                <div className={`${styles.trainerItem} ${styles.item}`} style={{ backgroundImage: `url(/assets/trainers/${favourite.Trainer}.png` }}></div>
            ):(
                <div className={`${styles.trainerItem} ${styles.item}`}></div>
            )}
        </div>
        <div className={styles.link}>
            <Link to="/pokedex" >Pokedex</Link>
        </div>
        <div className={styles.link} onClick={logout}>
            <p>Logout</p>
        </div>
        </>
    )
}