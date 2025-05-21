import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';


  

export default function AuthPage(){


// This is for the search ----------------------------------------------------------
    return(
        <>
        <div className={styles.App}>
          <div className={styles.center}>



            <div className={styles.formBlock}>
                <form>
                    <input type="text" name="name" id="name" />
                    <input type="email" name="email" id="email" />
                    <input type="password" name="password" id="password" />
                    <input type="password" name="confirmPassword" id="confirmPassword" />        
                </form>

            </div>
                    
          </div>
        </div>
        </>
    )
}


