type GenRange = { start: number; end: number };
const genMap : { [key: number]: GenRange }= {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 905 },
    9: { start: 906, end: 1025 }
};
export function checkBadge(badgeNum: number, pokemon: number[]){
    const gen = genMap[badgeNum] // Get each generations starting and ending index
    for (let index = gen.start; index <= gen.end; index++) {
        if(!pokemon.includes(index)) return false // Return false if even one is missing
    }
    return true
}
export function checkAllBadges(pokemon: number[]){
    const badges = []
    for (let index = 1; index <= 9; index++) {
        const badge = checkBadge(index, pokemon)
        badges.push(badge)
    }
    return badges
}