import styles from "./index.module.css"
interface EvolutionProps{
    evolutions: string[],
    title_color: string
}

export default function EvolutionList({ evolutions, title_color} : EvolutionProps ){
    return(
        <>
        <div className={styles.Title}>
            <p style={{ color: title_color }}>Evolution Line</p>
        </div>
        <ul className={styles.List}>
            {evolutions.map((evolution) => (
            <li key={evolution} className={styles.Item}>
                {evolution}
            </li>
            ))}
        </ul>
        </>
    )
}