import styles from "./index.module.css"
import Card from '../Card';
import { ItemListProps } from "../../../../types/items";

export default function List({ data, lastCardRef }: ItemListProps){
    // Load the cards
    const cardList = data.map((item, index)=>(
        <Card 
        key={item.name} 
        name={item.name}   
        ref={index === data.length - 1 ? lastCardRef : null} 
        id={item.id} 
        attributes={item.attributes}
        effect_entries={item.effect_entries}
        flavor_text_entries={item.flavor_text_entries}
        category={item.category}
        cost={item.cost}
        sprite={item.sprite}
        />
    ))

    return (
        <div className={styles.itemList}>
            {cardList}
        </div>
    )
}