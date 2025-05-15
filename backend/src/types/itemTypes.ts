export interface Item{
    attributes: NamedResource[] | null;
    category: NamedResource;
    cost: number;
    effect_entries: EffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
    name: string;
    id: number;
    sprites: Sprite;
}
interface FlavorTextEntry{
    language: NamedResource;
    text: string;
    version_group: NamedResource;

}
export interface EffectEntry{
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