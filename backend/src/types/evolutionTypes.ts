export interface EvoDetails{
    gender: number | null;
    held_item: any | null;
    item: any | null;
    known_move: any | null;
    known_move_type: any | null;
    location: any | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: any | null;
    party_type: any | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: any | null;
    trigger: EvoTrigger;
    turn_upside_down: boolean;
}
export interface EvoTrigger{
    name: string;
    url: string
}
export interface EvoSpecies{
    name: string;
    url: string;
}
export interface EvoChainLink{
    evolution_details: EvoDetails[];
    evolves_to: EvoChainLink[];
    is_baby: boolean;
    species: EvoSpecies
}


export interface EvoChain{
    baby_trigger_item: any | null;
    chain: EvoChainLink;
    id: number;

}