import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import Header from "../../components/Header";
import { ItemResult, Item, ItemProps,SearchedItemList } from "../../types/items";

// Function for fetching all moves
const loadItems = async (page: number) =>{
    const items = await axios.get<ItemResult>// Type for the items
    (`http://localhost:5000/api/items?page=${page}&limit=10`)// Route endpoint
    return items.data
}

 

export default function InfinityScrollExample(){
  const [items, setItems] = useState<ItemProps[]>([]); // State containing the items (<ItemProps[]> = datatype for fetched items)
  const [page, setPage] = useState<number>(0) // State for the current page
  const lastRef = useRef<HTMLDivElement | null>(null);  // State for the last card of the page
  // React query for fetching items
  const {data, refetch, isFetching, error} = useQuery({
    queryKey: ["items", page], 
    queryFn:()=> loadItems(page),
    enabled: false,
  })
  // Update items when data changes
  useEffect(() => {
    if (data?.results) {
      // Update Items - only add the not existing ones
      setItems((prev) => [...prev, ...data.results.filter(p => !prev.some(existing => existing.id === p.id))]);
    }
  }, [data]);

  // Effect for the infinity scroll 
  useEffect(() => {
    // Return if the last ref isnt set
    if (!lastRef.current) return;
    if (data?.results) {
        // Check the set observer
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetching) {
                console.log('Fetching more data...');
                setPage((prev) => prev + 1); 
            }
        },
        {
            threshold: 0.5, 
        });

        // Set observer on the last element
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
      refetch();
  }, [page]);


    return(
        <>
        <div className={styles.App}>
          <div className={styles.center}>
              <Header/>

              <div className={styles.mainBlock}>

                  <div className={styles.mainContent}>
                       {/* List fo loading the data
                    <List data={items} lastCardRef={lastRef}/>*/}
                  </div>   

              </div>
          </div>
        </div>
        </>
    )
}


