import { EvoChainLink } from "../types/evolutionTypes";


// Get names of evolution line mons
export function traverseChain(chain: EvoChainLink, evoList: string[]=[]): string[]{
    evoList.push(chain.species.name)
    for(const next of chain.evolves_to){
        traverseChain(next, evoList)
    }
    return evoList
}