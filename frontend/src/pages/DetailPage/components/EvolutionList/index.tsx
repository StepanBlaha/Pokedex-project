import styles from "./index.module.css"
interface EvolutionProps{
    evolutions: string[],
    title_color: string
}


export default function EvolutionList({ evolutions, title_color} : EvolutionProps ){
    const evolutionList = evolutions.map(evolution => {
        return <div key={evolution} className={styles.Item}><p>{evolution}</p></div>;
    });

    return(
        <>
        <div className={styles.Title}>
            <p style={{ color: `${title_color} ` }}>Evolution Line</p>
        </div>
        {evolutionList}
        </>
    )
}