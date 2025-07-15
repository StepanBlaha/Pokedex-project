import styles from "./index.module.css"
import { Link } from "react-router-dom"

export default function LoggedOutMenu( ){
    return(
        <>
        <div className={styles.link}>
            <Link to="/register">Register</Link>
        </div>
        <div className={styles.link}>
            <Link to="/login">Login</Link>
        </div>
        </>
    )
}