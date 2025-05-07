


export interface Pokemon {
    name: string;
    url: string;
  }
  

export interface PokemonListResult {
    data:{
        results: Pokemon[];
      };
      page: number
  }
  
  export interface PokemonListProps{
    data: Pokemon[];
    lastCardRef: React.RefObject<HTMLDivElement | null>; 
}