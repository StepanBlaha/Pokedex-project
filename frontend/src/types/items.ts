export interface ItemResult{
    page: number;
    results: ItemProps[];
}
export interface ItemListProps{
    data: ItemProps[];
    lastCardRef: React.RefObject<HTMLDivElement | null>; 
}
export interface SearchedItem{
    _id: string,
    category: string;
    cost: number;
    effect_entries: EffectEntry[] | [];
    name: string;
    id: number;
    sprite: string;
}
export interface SearchedItemList{
    searchedItems: SearchedItem[]
}
export interface ItemProps{
    category: string;
    cost: number;
    effect_entries: EffectEntry[];
    name: string;
    id: number;
    sprite: string;
}
export interface Item{
    category: NamedResource;
    cost: number;
    effect_entries: EffectEntry[];
    name: string;
    id: number;
    sprites: Sprite;
}
interface FlavorTextEntry{
    language: NamedResource;
    text: string;
    version_group: NamedResource;
}
interface EffectEntry{
    effect: string;
    language: NamedResource;
    short_effect: string;
}
// Sprite type
interface Sprite{
    default: string | null
}
// Base type for named data
interface NamedResource{
    name: string;
    url: string;
}