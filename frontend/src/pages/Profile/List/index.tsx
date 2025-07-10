import styles from "./index.module.css"
import Card from '../Card';
import { PokemonListProps } from '../../../types/pokemon';
interface FavListProps extends PokemonListProps{
    onClick: (key: string, value: string | number) =>void,
    onClose: ()=>void,
    favourite?: number
}
export default function List({ data, lastCardRef, onClick, favourite, onClose}: FavListProps){
    // Load the cards
    const cardList = data.map((item, index)=>(
        <Card key={item.name} name={item.name}  ref={index === data.length - 1 ? lastCardRef : null} id={item.id} type={item.types[0]} onClick={onClick} favourite={favourite === item.id ? true : false} onClose={onClose}/>
    ))

    return (
        <div className={styles.pokedexList}>
            {cardList}
        </div>
    )
}
