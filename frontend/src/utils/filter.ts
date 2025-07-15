import { Pokemon } from "../types/pokemon";
import { filterTypes } from "../types/filter";
import { genMap } from "../constants/gens";

// Check if pokemon matches filters
export const matchesFilters = (pokemon: Pokemon, filterData: filterTypes):boolean => {
    // Check generation
    if (filterData.gen !== null ) {
        const min = genMap[filterData.gen].start;
        const max = genMap[filterData.gen].end;
        if(pokemon.id < min || pokemon.id > max){
            return false;
        }
    }

    // Check type (at least one matching type)
    if (filterData.type !== null && !pokemon.types.includes(filterData.type)) {
        return false;
    }
    return true;
}
export const isEqualFilters = (a: filterTypes, b: filterTypes): boolean => {
    return a.gen === b.gen && a.type === b.type;
};