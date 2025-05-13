
interface EvolutionProps{
    evolutions: string[]
}


export default function EvolutionList({ evolutions} : EvolutionProps ){
    const evolutionList = evolutions.map(evolution => {
        return <li key={evolution}>{evolution}</li>;
    });

    return(
        <ul>{evolutionList}</ul>
    )
}