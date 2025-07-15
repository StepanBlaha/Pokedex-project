import { genMap } from "../constants/gens"
// Check if user has a badge
export function checkBadge(badgeNum: number, pokemon: number[]){
    const gen = genMap[badgeNum] // Get each generations starting and ending index
    for (let index = gen.start; index <= gen.end; index++) {
        if(!pokemon.includes(index)) return false // Return false if even one is missing
    }
    return true
}
// Check all badges
export function checkAllBadges(pokemon: number[]){
    const badges = []
    for (let index = 1; index <= 9; index++) {
        const badge = checkBadge(index, pokemon)
        badges.push(badge)
    }
    return badges
}