import { useEffect, forwardRef  } from 'react';
import styles from "./index.module.css"
import { pokemonTypeColors } from '../../../../constants/types';
interface SuggestCardProps{
    name: string,
    id: number,
    type: string,
    onSelect: () => void,
    onClose: ()=>void
}

const Card = forwardRef<HTMLDivElement, SuggestCardProps>(({ name, id, type, onSelect, onClose }, ref)=>{
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    // Make sure the hover url exists
    useEffect(() => {
        const testUrl = `https://play.pokemonshowdown.com/sprites/gen5ani/${name.toLowerCase()}.gif`;
        const img = new Image();
        // Set listeners
        // Test
        img.src = testUrl;
    }, [name, spriteUrl]);


    return(
    <div className={`${styles.card}`} ref={ref}  onClick={()=>{onSelect(); onClose()}}>
        <div className={styles.sprite} style={{ backgroundImage: `url(${spriteUrl})` }}></div>
        <div className={styles.cardTitle}>
            <p style={{ color: `${pokemonTypeColors[type]} ` }} >{name}</p>
        </div>
    </div>
    )
})
export default Card;