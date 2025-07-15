import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, ChevronDown } from "lucide-react";
import { titleCaseWord } from "../../utils/text";

interface SelectProps{
    onChange:(val:string | number | null)=>void,
    data: any[],
    defaultText?:string,
    selected?: string | null
}
export default function Select({onChange, data, defaultText =  "All", selected = null}: SelectProps){
    const [ open, setOpen ] = useState<boolean>(false); 
    const [ val, setVal ] = useState<string | null>(selected)
    // Handle closing on click outside
    const InputRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (InputRef.current && !InputRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // Set onchange
    useEffect(()=>{
        onChange(val);
    },[val])
    return(
        <div className={styles.SelectWrapper} ref={InputRef}>
            <div className={styles.Select} onClick={()=>setOpen(!open)}>
                <p>{val !== null ? titleCaseWord(val.toString()) : defaultText}</p>
                <div className={styles.Open} >
                    {open ? <ChevronDown/> : <ChevronRight/>}
                </div>
            </div>
                {open && (
                    <div className={styles.Options}>
                        <div onClick={()=>{setVal(null); setOpen(false)}} className={styles.Option}>All</div>
                        {data.map((entry, i)=>(
                            <div onClick={()=>{setVal(entry); setOpen(false)}} className={styles.Option}>{titleCaseWord(entry.toString())}</div>
                        ))}
                    </div>
                )}
        </div>
    )
}


