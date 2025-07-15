import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ItemProps } from "../../types/items";
import { loadItems, loadSearchItems } from "../../utils/fetch";

export default function ItemPage(){
  // States and refs
  const [inputValue, setInputValue] = useState("")
  const [items, setItems] = useState<ItemProps[]>([]);
  const [page, setPage] = useState<number>(0)
  const lastRef = useRef<HTMLDivElement | null>(null); 
  const [ sort, setSort ] = useState<"asc" | "desc" | null>(null); // Sort state

  const {data, refetch, isFetching, error} = useQuery({
    queryKey: ["items", page],
    queryFn:()=> loadItems(page),
    enabled: false,
  })

  const {data: searchedItems, refetch: searchItems, isFetching: isSearching, error: searchError} = useQuery({
    queryKey: ["itemSearch", inputValue],
    queryFn:()=> loadSearchItems(inputValue),
    enabled: false,
  })
  
  // Update state when data changes
  useEffect(() => {
    if (data?.results) {
      // Update Items - only add the not existing ones
      setItems((prev) => [...prev, ...data.results.filter(p => !prev.some(existing => existing.id === p.id))]);
    }
    if(searchedItems?.searchedItems){
      setItems(searchedItems.searchedItems);
    }
  }, [data, searchedItems]);

  // Effect for the infinity scroll - maybe create custom hook
  useEffect(() => {
    if (!lastRef.current) return;
    if (data?.results) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          console.log('Fetching more data...');
          setPage((prev) => prev + 1); 
        }
      },
      {
        threshold: 0.5, 
      });

      // Set observer
      const current = lastRef.current;
      observer.observe(current);

      // Cleanup observer when the component unmounts or updates
      return () => {
        if (current) observer.unobserve(current);
      };
    }
  }, [items, isFetching]); 

  // Load more posts when page is updated
  useEffect(() => {
    if (inputValue === "") {
      refetch();
    }
  }, [page]);


  // This is for the search ----------------------------------------------------------
    useEffect(() => {
      if (inputValue !== "") {
        searchItems();
        // For searching purposes
        setPage(1);   
      } else {
        // Reset the search
        if(page !== 0){
          setItems([]);    
          setPage(0);        
        }
      }
    }, [inputValue]);
  // This is for the search ----------------------------------------------------------
  // Handle sorting items
  /*
  const sortedItems = (() => {
    if (sort === "asc") {
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "desc") {
      return [...items].sort((a, b) => b.name.localeCompare(a.name));
    }
    return items; // untouched
  })();
  */

    return(
        <>
        <div className={styles.App}>
          <div className={styles.center}>
              <Header/>

              <div className={styles.mainBlock}>
                
                  <div className={styles.sideContent}>
                    <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e)=> setInputValue(e.target.value)}
                    className={styles.searchInput}
                    placeholder="Poke-Ball..."
                    />
                    {/*
                    <div className={styles.Sort} onClick={() => {
                        if (sort === "desc") {
                          setSort(null);
                        } else if (sort === "asc") {
                          setSort("desc");
                        } else {
                          setSort("asc");
                        }
                      }}>
                        A
                        {sort === 'asc' && <ChevronUp/>}
                        {sort === 'desc' && <ChevronDown/>}
                        {sort === null && <Minus/>}
                      </div>
                    */}
                  </div>

                  <div className={styles.mainContent}>
                    <List data={items} lastCardRef={lastRef}/>
                    {isFetching && (
                      <div className={styles.Loader}>
                        <p>Loading more...</p>
                      </div>
                    )}
                  </div>   

              </div>
              <Footer/>
          </div>
        </div>
        </>
    )
}