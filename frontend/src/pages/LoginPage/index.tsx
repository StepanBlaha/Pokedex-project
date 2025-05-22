import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import { registerFormData } from "../../types/user";
import { useForm } from "react-hook-form";
import { hashPassword } from "../../utils/hash";

// Register user
const registerUser = async(data: any) => {
    try {
    const res = await axios.post("http://localhost:5000/api/register", {
        email: data.email,
        name: data.name,
        password: data.password,
        });;
        return res.data;
    } catch (error) {
    throw new Error('Email is already registered');

    }
}  

export default function LoginPage(){
    const {register, handleSubmit, formState: {errors, isSubmitting}, setError,} = useForm<registerFormData>();

    const onSubmit = async(data: registerFormData)=>{
    // Validation logic
    if(!data.email.includes("@")){
        setError("email", {
        type: "manual",
        message: "Email must include @",
        });
        return;
    }
    if(data.password != data.confirmPassword){
        setError("confirmPassword", {
        type: "manual",
        message: "Passwords must match",
        });
        return;
    }

    // Password strength check
    if(data.password.length < 8){
        setError("password", {
        type: "manual",
        message: "Password must be at least 8 characters",
        });
        return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
        setError("password", {
        type: "manual",
        message: "Password must include at least one special character",
        });
        return;
    }
    if (!/\d/.test(data.password)) {
        setError("password", {
        type: "manual",
        message: "Password must include at least one number",
        });
        return;
    }

    try {
        // Hash the password
        data.password = await hashPassword(data.password, 10);
        // Register user
        const res = await registerUser(data);
        alert("User registered!")
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
                <p>Register</p>
                </div>
                <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>

                    <div className={styles.formSection}>
                    <label htmlFor="name">Name</label>
                    <div className={styles.inputContainer}>
                        <i className={`fa fa-user ${styles.icon}`}></i>
                        <input type="text" id="name" placeholder="Your name..." {...register("name", { required: "Name is required" })}/>
                    </div>
                    {errors.name && <span>{errors.name.message}</span>}
                    </div>

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

                    <div className={styles.formSection}>
                    <label htmlFor="confirmPassword"> Confirm Password</label>
                    <div className={styles.inputContainer}>
                        <i className={`fa-solid fa-lock ${styles.icon}`}></i>
                        <input type="password"  id="confirmPassword" placeholder="Confirm password..."  {...register("confirmPassword", { required: "Password is required" })}/>     
                    </div>
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    </div>

                    <button className={styles.submitButton} type="submit">Submit</button>   
                </form>

                <div className={styles.actionSection}>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>

            </div>
                    
            </div>
        </div>
        </>
    )
}


