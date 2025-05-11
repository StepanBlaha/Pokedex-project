import Button from "../../components/Button";
import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { url } from "inspector";
import { useQuery } from '@tanstack/react-query';
import List from "./components/List";
import Header from "../../components/Header";
import { Moves, MoveListResult } from "../../types/moves";



  const loadMoves = async (page: number) =>{
      const res = await axios.get<MoveListResult>(`http://localhost:5000/api/moves?page=${page}&limit=10`)
      console.log(res.data)
      return res.data
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
 // Load more posts when page is updated
  useEffect(() => {
    if (inputValue === "") {
      refetch();
    }
  }, [page]);


  // Update state when data changes
  useEffect(() => {
    if (data?.results) {
      setItems((prev) => [...prev, ...data.results.filter(p => !prev.some(existing => existing.id === p.id))]);
    }
  }, [data]);

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


