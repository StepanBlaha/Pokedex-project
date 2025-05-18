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
                {/*absolutne jeste nefunguje
                <Link to="/" className={pathname==="/" ? `${styles.link} ${styles.active}`: styles.link}>Pokedex</Link>
                */}
                <Link to="/pokedex" className={pathname === "/pokedex" ? styles.active : ""}>Pokedex</Link>
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
        </div>
        
        </>
    )
}