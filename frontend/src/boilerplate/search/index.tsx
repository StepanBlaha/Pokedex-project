import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import Header from "../../components/Header";
import { ItemResult, Item, ItemProps,SearchedItemList } from "../../types/items";


  // Function for fetching searched moves
  const loadSearch = async(search: string) => {
    try {
        
      const res = await axios.post<SearchedItemList>/*type for searched items*/
      ("http://localhost:5000/api/searchItems", {/*route for fetch searched */
        search: search
      });;
      return res.data;
    } catch (error) {
      console.error('Error in loadSearch:', error);
    }
  }
  
 

export default function ItemPage(){
  const [inputValue, setInputValue] = useState("") // state for input value
  const [items, setItems] = useState<ItemProps[]>([]); // state for the items

  // react query for handling the search fetch
   const {data: searchedItems, refetch: searchItems, isFetching: isSearching, error: searchError} = useQuery({
      queryKey: ["itemSearch", inputValue],
      queryFn:()=> loadSearch(inputValue),
      enabled: false,
    })
  


  // Update state when data changes
  useEffect(() => {
    if(searchedItems?.searchedItems){
      setItems(searchedItems.searchedItems);
    }
  }, [ searchedItems]);

 


  // Get new items when input value changes
    useEffect(() => {
      if (inputValue !== "") {
        searchItems();
      } 
    }, [inputValue]);

    return(
        <>
        <div className={styles.App}>
          <div className={styles.center}>

              <div className={styles.mainBlock}>
                
                  <div className={styles.sideContent}>
                    {/*
                    Input fo search
                    <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e)=> setInputValue(e.target.value)}
                    className={styles.searchInput}
                    placeholder="Placeholder..."
                    />
                    */}
                  </div>

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


