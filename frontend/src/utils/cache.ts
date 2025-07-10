

export function getCachedData(key:string){
    const cached = localStorage.getItem(key)
    return cached
}