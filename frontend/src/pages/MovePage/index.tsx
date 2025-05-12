import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import Header from "../../components/Header";
import { Moves, MoveListResult, SearchedMoveList } from "../../types/moves";



  const loadMoves = async (page: number) =>{
    const res = await axios.get<MoveListResult>(`http://localhost:5000/api/moves?page=${page}&limit=10`)
    console.log(res.data)
    return res.data
    }

  // Function for fetching searched moves
  const loadSearch = async(search: string) => {
    try {
      const res = await axios.post<SearchedMoveList>("http://localhost:5000/api/searchMoves", {
        search: search
      });;
      return res.data;
    } catch (error) {
      console.error('Error in loadSearch:', error);
    }
  }
  




export default function MovePage(){
  // States and refs
  const [inputValue, setInputValue] = useState("")
  const [items, setItems] = useState<Moves[]>([]);
  const [page, setPage] = useState<number>(0)
  const lastRef = useRef<HTMLDivElement | null>(null); 

  const {data, refetch, isFetching, error} = useQuery({
    queryKey: ["moves", page],
    queryFn:()=> loadMoves(page),
    enabled: false,
  })

  const {data: searchedMoves, refetch: searchMoves, isFetching: isSearching, error: searchError} = useQuery({
    queryKey: ["moveSearch", inputValue],
    queryFn:()=> loadSearch(inputValue),
    enabled: false,
  })

  // Update state when data changes
  useEffect(() => {
    if (data?.results) {
      // Update Items - only add the not existing ones
      setItems((prev) => [...prev, ...data.results.filter(p => !prev.some(existing => existing.id === p.id))]);
    }
    if(searchedMoves?.searchedMoves){
      setItems(searchedMoves.searchedMoves);
    }
  }, [data, searchedMoves]);

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
      searchMoves();
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
                    placeholder="Tackle..."
                    />

                  </div>
                  <div className={styles.mainContent}>
                    <List data={items} lastCardRef={lastRef}/>
                  </div>   
              </div>


          </div>
        </div>



        </>
    )
}


