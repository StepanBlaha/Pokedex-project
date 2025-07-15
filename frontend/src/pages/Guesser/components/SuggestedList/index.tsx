import styles from "./index.module.css"
import Card from '../SuggestedCard';
import { Pokemon } from "../../../../types/pokemon";
export interface GuessListProps{
    data: Pokemon[];
    onSelect: (name: string) => void,
    onClose: ()=>void
}

export default function List({ data, onSelect, onClose }: GuessListProps){
    // Load the cards
    const cardList = data
    .filter(item => item.id <= 1025)
    .map((item, index) => {
        return (
            <Card key={item.name} name={item.name} id={item.id} type={item.types[0]}  onSelect={()=>onSelect(item.name)} onClose={onClose}/>
        );
    });

    return (
        <div className={styles.pokedexList}>
            {cardList}
        </div>
    )
}
