import React, { createContext, useState, useEffect, useContext } from "react";
import { defaultFilters } from "../constants/filters";
import { filterTypes, HandleFilterType } from "../types/filter";

interface FilterContextType {
    filters: filterTypes,
    loading: boolean
    handleFilter: HandleFilterType;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);


export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [ filters, setFilters ]= useState<filterTypes>(() => {
        const saved = sessionStorage.getItem("PokelogFilterData");
        return saved ? JSON.parse(saved) : defaultFilters;
    });
    const [loading, setLoading] = useState<boolean>(true); 

    const handleFilter: HandleFilterType = (key, value) =>{
        setFilters((prev) => {
            const updated = { ...prev, [key]: value };
            sessionStorage.setItem("PokelogFilterData", JSON.stringify(updated));
            return updated;
        });
    }



    return(
        <FilterContext.Provider value={{filters, loading, handleFilter}}>
            {children}
        </FilterContext.Provider>
    )
}
// Hook to get Filters
export const useFilter = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};