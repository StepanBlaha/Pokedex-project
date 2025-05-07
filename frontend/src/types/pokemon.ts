


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