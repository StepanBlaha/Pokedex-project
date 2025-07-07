import styles from "./index.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function HamburgerMenu(){
    const pathname = window.location.pathname;
    const [isOpen, setIsOpen] = useState(false)
    return(

        <>
        <div className={styles.Menu}>
            <div className={styles.BurgerButton} onClick={()=>setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>
            </div>
            <div className={`${styles.linkPart} ${ isOpen  ? styles.Open : ""}`} >
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
            </div>
        </div>
        </>
    )
}