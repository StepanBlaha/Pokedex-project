import styles from "./index.module.css"
import Card from '../Card';
import { PokemonListProps } from '../../../../types/pokemon';

export default function List({ data, lastCardRef, userData, onToggle }: PokemonListProps){
    // Load the cards
    const cardList = data
    .filter(item => item.id <= 1025)
    .map((item, index) => {
        return (
            <Card key={item.name} name={item.name}   ref={index === data.length - 1 ? lastCardRef : null} id={item.id} type={item.types[0]} caught={userData?.includes(item.id)} entries={userData} onToggle={onToggle}/>
        );
    });

    return (
        <div className={styles.pokedexList}>
            {cardList}
        </div>
    )
}
