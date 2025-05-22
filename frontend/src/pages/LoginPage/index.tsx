import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import { registerFormData, loginFormData, User } from "../../types/user";
import { useForm } from "react-hook-form";
import { hashPassword,comparePasswords } from "../../utils/hash";
import { useAuth } from "../../hooks/useAuth";
// Register user
const loginUser = async(data: any) => {
    try {
        const res = await axios.post("http://localhost:5000/api/login", {
            email: data.email,
        });
        return res.data;
    } catch (error: any) {
        if (error.response && error.response.data?.error) {
            throw new Error(error.response.data.error);
        }
    }
}  

export default function LoginPage(){
    const {isLoggedIn, login, logout} = useAuth();
    const {register, handleSubmit, formState: {errors, isSubmitting}, setError,} = useForm<loginFormData>();

    const onSubmit = async(data: loginFormData)=>{
    try {
        // Get the user by email
        const user = await loginUser(data) as User;
        // Compare passwords
        const correctPassword = await comparePasswords(data.password, user.password)
        console.log(correctPassword)
        if(correctPassword){
            login();
            console.log(isLoggedIn)
            alert("User logged in!")
        }else{
            setError("password",{
                type: "manual",
                message: "Incorrect Password",
            })
        }
    } catch (err: any) {
        alert(err.message);
    }
    }
    return(
        <>
        <div className={styles.App}>
            <div className={styles.center}>



            <div className={styles.formBlock}>
                <div className={styles.formTitle}>
                <p>Login</p>
                
                </div>
                <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>


                    <div className={styles.formSection}>
                    <label htmlFor="email">Email</label>
                    <div className={styles.inputContainer}>
                        <i className={`fa-solid fa-envelope ${styles.icon}`}></i>
                        <input type="email" id="email" placeholder="Your email..."  {...register("email", { required: "Email is required" })}/>
                    </div>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div className={styles.formSection}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.inputContainer}>
                        <i className={`fa-solid fa-lock ${styles.icon}`}></i>
                        <input type="password" id="password" placeholder="Your password..." {...register("password", { required: "Password is required" })}/>
                    </div>
                    {errors.password && <span>{errors.password.message}</span>}
                    </div>


                    <button className={styles.submitButton} type="submit">Submit</button>   
                </form>

                <div className={styles.actionSection}>
                    <p>Don`t have an account? <Link to="/register">Register</Link></p>
                </div>

            </div>

            <div className={styles.backHome}>
                <Link to="/">
                    <div className={styles.backHomeCenter}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"></path><path d="M2 12H22"></path></svg>
                        <p>Home</p>
                    </div>
                </Link>
            </div>
                    
            </div>
        </div>
        </>
    )
}


