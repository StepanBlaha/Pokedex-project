import styles from "./index.module.css"
import { useState } from "react"
import LoggedInMenu from "./LoggedIn";
import LoggedOutMenu from "./LoggedOut";
import { useUser } from "@clerk/clerk-react";
import { useClerk } from '@clerk/clerk-react';

export default function UserMenu(){
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = async () => {
        await signOut();
        // Optionally redirect
        window.location.href = '/login';
    };

    return(
        <>
        <div className={styles.Menu}>
            <div className={styles.pokeball} onClick={()=>setIsOpen(!isOpen)}></div>
            <div className={`${styles.linkPart} ${ isOpen  ? styles.Open : ""}`} >
                {user ? <LoggedInMenu logout={() => handleLogout()} /> : <LoggedOutMenu />}
            </div>
        </div>
        </>
    )
}