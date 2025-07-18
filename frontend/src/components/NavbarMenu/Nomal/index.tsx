import { Link } from "react-router-dom"
import styles from "./index.module.css"
export default function NormalMenu(){
    const pathname = window.location.pathname;
    return(
        <>
        <div className={styles.linkPart}>
            <div className={styles.link}>
                <div className={`${styles.mapItem} ${styles.item}`}></div>
                <div className={`${styles.bikeItem} ${styles.item}`}></div>
                <Link to="/" className={pathname === "/" ? styles.active : ""}>Home</Link>
            </div>
            <div className={styles.link}>
                <div className={`${styles.pokeradarItem} ${styles.item}`}></div>
                <div className={`${styles.pikachuItem} ${styles.item}`}></div>
                <Link to="/pokemon" className={pathname === "/pokemon" ? styles.active : ""}>Pokemon</Link>
            </div>
            <div className={styles.link}>
                <div className={`${styles.pokeballItem} ${styles.item}`}></div>
                <div className={`${styles.potionItem} ${styles.item}`}></div>
                <Link to="/items" className={pathname === "/items" ? styles.active : ""}>Items</Link>
            </div>
            <div className={styles.link}>
                <div className={`${styles.tmWaterItem} ${styles.item}`}></div>
                <div className={`${styles.tmGrassItem} ${styles.item}`}></div>
                <Link to="/moves" className={pathname === "/moves" ? styles.active : ""}>Moves</Link>
            </div>
            <div className={styles.link}>
                <div className={`${styles.expShareItem} ${styles.item}`}></div>
                <Link to="/guesser" className={pathname === "/guesser" ? styles.active : ""}>Guesser</Link>
            </div>
        </div>
        </>
    )
}