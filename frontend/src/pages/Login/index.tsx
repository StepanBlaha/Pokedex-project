import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { loginFormData } from "../../types/user";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/clerk-react";

export default function LoginPage(){
    const { signIn, setActive, isLoaded } = useSignIn();
    const {register, handleSubmit, formState: {errors, isSubmitting}, setError,} = useForm<loginFormData>();
    const [ email, setEmail] = useState<string>("");
    const [ password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Handle login
    const onSubmit = async()=>{
        // Make sure signin exists
        if (!signIn) {
            alert("Sign in is not available. Please try again later.");
            return;
        }
        // Set loading state
        setLoading(true)
        try {
            // Try logging in
            const result = await signIn.create({ identifier: email, password });
            // Check if result was success
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                // Redirect to home page
                window.location.href = '/home';
            } else {
                console.log(result.status)
            }
        } catch (error) {
            console.error(error)
        }finally{
            // Stop loading
            setLoading(false)
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
                        <input type="email" id="email" placeholder="Your email..."  {...register("email", { required: "Email is required" })} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className={styles.formSection}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.inputContainer}>
                        <i className={`fa-solid fa-lock ${styles.icon}`}></i>
                        <input type="password" id="password" placeholder="Your password..." {...register("password", { required: "Password is required" })} value={password} onChange={(e)=>setPassword(e.target.value)}/>
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