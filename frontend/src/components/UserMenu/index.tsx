import styles from "./index.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth";
import LoggedInMenu from "./LoggedIn";
import LoggedOutMenu from "./LoggedOut";
export default function UserMenu(){
    const {isLoggedIn, login, logout} = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    return(

        <>
        <div className={styles.Menu}>
            <div className={styles.pokeball} onClick={()=>setIsOpen(!isOpen)}></div>
            <div className={`${styles.linkPart} ${ isOpen  ? styles.Open : ""}`} >
                {isLoggedIn ? <LoggedInMenu logout={() => logout()} /> : <LoggedOutMenu />}
            </div>
        </div>
        </>
    )
}