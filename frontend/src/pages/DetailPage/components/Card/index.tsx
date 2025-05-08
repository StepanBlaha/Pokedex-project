import {PokemonDetailCardProps} from "../../../../types/pokemon"

  
export default function Card({data}: PokemonDetailCardProps){
 
    const pokemonTypeColors : { [key: string]: string } = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
      };
      
    console.log(`url(../../../assets/typeBanners/${data.type}.png` )
    return(
        <div className="card">

        <div className="cardTitle">
                <h2>{data.name}</h2>
            <div className="cardType">
                <div className="typeImage"  style={{ backgroundImage: `url(/assets/typeBanners/${data.type}.png` }}></div>
                <div className="typeName">
                    <p>{data.type}</p>
                </div>
            </div>
                <div className="cardImage" style={{ backgroundImage: `url(${data.image})` }}></div>
        </div>

        <div className="cardInformations">

            <div className="cardInfo">
                <div className="cardInfoTitle"  style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                    <p>Height</p>
                </div>
                <div className="cardInfoContent">
                    <p>{data.height} cm</p>
                </div>
            </div>

            <div className="cardInfo">
                <div className="cardInfoTitle" style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                    <p>Weight</p>
                </div>
                <div className="cardInfoContent">
                    <p>{data.weight} kg</p>
                </div>
            </div>

            <div className="cardInfo">
                <div className="cardInfoTitle" style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                    <p>Category</p>
                </div>
                <div className="cardInfoContent">
                    <p>{data.category}</p>
                </div>
            </div>

            <div className="cardInfo">
                <div className="cardInfoTitle" style={{ color: `${pokemonTypeColors[data.type]} ` }}>
                    <p>Ability</p>
                </div>
                <div className="cardInfoContent">
                    <p>{data.ability}</p>
                </div>
            </div>
        </div>

        <div className="cardDescription">
            <p>{data.description}</p>
        </div>

        <div className="cardStats">
            <div className="statGraph"></div>
        </div>

    </div>
    )
}