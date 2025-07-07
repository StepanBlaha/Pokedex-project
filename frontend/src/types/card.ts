import { UserPokedexRecord } from "./pokemon";
export interface CardProps{
    name: string,
    id: number,
    type: string,
    caught?: boolean,
    entries?: number[],
    onToggle?: (id: number, add: boolean) => void
}
export interface MoveCardprops{
    id: number;
    name: string;
    accuracy: number;
    class_name: string;
    category: string;
    power: number;
    pp: number;
    type: string
}
