export interface filterTypes {
    gen: number | null,
    type: string | null
}
export type HandleFilterType = <K extends keyof filterTypes>(
    key: K,
    value: filterTypes[K] 
) => void;