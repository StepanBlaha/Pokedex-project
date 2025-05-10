import styles from "./index.module.css"
import { Link } from "react-router-dom"

export default function Header(){
    return(
        <div className={styles.mainHeader}>
                <div className={styles.headerLogoPart}>

                    <div className={styles.headerLogo}>
                      <h1>PokeLog</h1>
                    </div>


                    <div className={styles.headerSwampert}></div>
                    <div className={styles.headerVenusaur}></div>
                    <div className={styles.headerCharizard}></div>
                    <div className={styles.headerBlastoise}></div>





                    <div className={styles.headerGyarados}></div>
                    <div className={styles.headerSnorlax}></div>
                    <div className={styles.headerTyranitar}></div>
                    <div className={styles.headerLucario}></div>
                    <div className={styles.headerBidoof}></div>
                    <div className={styles.headerEmpoleon}></div>
                    <div className={styles.headerEevee}></div>
                    <div className={styles.headerElectivire}></div>
                    <div className={styles.headerZacian}></div>
                    <div className={styles.headerConkeldurr}></div>
                    <div className={styles.headerMimikyu}></div>
                    <div className={styles.headerMeltan}></div>
                    <div className={styles.headerPansage}></div>
                    <div className={styles.headerHaxorus}></div>
                    <div className={styles.headerRayquaza}></div>
                    <div className={styles.headerRotom}></div>
                    <div className={styles.headerRegirock}></div>
                    <div className={styles.headerArticuno}></div>
                    <div className={styles.headerHooh}></div>
                    <div className={styles.headerBreloom}></div>

                    <div className={styles.headerDitto}></div>
                    <div className={styles.headerButterfree}></div>
                    <div className={styles.headerCombee}></div>
                    <div className={styles.headerGengar}></div>


                </div>

                <div className={styles.headerContentPart}>
                  <div className={styles.linkPart}>
                    <div className={styles.link}>
                      <div className={`${styles.mapItem} ${styles.item}`}></div>
                      <div className={`${styles.bikeItem} ${styles.item}`}></div>
                      <Link to="/">Home</Link>
                    </div>
                    <div className={styles.link}>
                      <div className={`${styles.pokeradarItem} ${styles.item}`}></div>
                      <div className={`${styles.pikachuItem} ${styles.item}`}></div>
                      <Link to="/">Pokedex</Link>
                    </div>
                    <div className={styles.link}>
                      <div className={`${styles.pokeballItem} ${styles.item}`}></div>
                      <div className={`${styles.potionItem} ${styles.item}`}></div>
                      <Link to="/">Items</Link>
                    </div>
                    <div className={styles.link}>
                      <div className={`${styles.tmWaterItem} ${styles.item}`}></div>
                      <div className={`${styles.tmGrassItem} ${styles.item}`}></div>
                      <Link to="/">Moves</Link>
                    </div>

                  </div>
                  <div className={styles.accountPart}>
                    <div className={styles.pokeball}></div>
                  </div>


                </div>
              </div>
    )
}