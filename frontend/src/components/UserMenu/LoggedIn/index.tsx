import styles from "./index.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"


type LoggedInMenuProps = {
    logout: () => void;
};

export default function LoggedInMenu({ logout }: LoggedInMenuProps) {
    const pathname = window.location.pathname;
    const [isOpen, setIsOpen] = useState(false)
    return(

        <>
        <div className={styles.link}>
            <Link to="/profile" >Profile</Link>
            <div className={`${styles.trainerItem} ${styles.item}`}></div>
        </div>
        <div className={styles.link} onClick={logout}>
            <p>Logout</p>
        </div>
        </>
    )
}