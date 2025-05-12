


export interface Moves {
    id: number;
    name: string;
    accuracy: number;
    class: string;
    category: string;
    power: number;
    pp: number;
    type: string
}
export interface MoveListResult {
  page: number;
  results: Moves[];
  }

  
  export interface MoveListProps{
    data: Moves[];
    lastCardRef: React.RefObject<HTMLDivElement | null>; 
}


export interface SearchedMove{
  _id: string,
  id: number;
  name: string;
  accuracy: number;
  class: string;
  category: string;
  power: number;
  pp: number;
  type: string
}
export interface SearchedMoveList{
  searchedMoves: SearchedMove[]
}