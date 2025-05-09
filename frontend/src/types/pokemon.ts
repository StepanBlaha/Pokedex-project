


export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}


export interface PokemonListResult {
  page: number;
  results: Pokemon[];
  }
  
  export interface PokemonListProps{
    data: Pokemon[];
    lastCardRef: React.RefObject<HTMLDivElement | null>; 
}


export interface PokemonDetailData {
  name: string;
  type: string;
  description: string;
  category: string;
  image: string;
  height: number;
  weight: number;
  ability: string;
  stats?: PokemonStat[]; 
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: StatInfo;
}
interface StatInfo {
  name: string;
  url: string;
}
export interface PokemonDetailCardProps {
  data: PokemonDetailData;
}






export interface SearchedPokemon{
  types: string[],
  _id: string,
  id: number,
  name: string,
  sprite: string
}
export interface SearchedPokemonList{
  searchedPokemon: SearchedPokemon[]
}