import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { registerFormData } from "../../types/user";
import { useForm } from "react-hook-form";
import { useClerk } from '@clerk/clerk-react';
import { useSignUp } from "@clerk/clerk-react";

export default function RegisterPage(){
  const {register, handleSubmit, formState: {errors, isSubmitting}, setError,} = useForm<registerFormData>();
  const clerk = useClerk();
  const { signUp, isLoaded } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleSignUp = async () => {
    if (!isLoaded || !signUp) {
      console.error("Clerk is not loaded or signUp is unavailable.");
      return;
    }
    // Make sure email contains @
    if(!email.includes("@")){
      setError("email", { type: "manual", message: "Email must include @", });
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("email", { type: "manual", message: "Invalid email format" });
      return;
    }
    // Password checks
    if(password != confirmPassword){
      setError("confirmPassword", { type: "manual", message: "Passwords must match",});
      return;
    }
    if (password.length < 8) {
      setError("password", { type: "manual", message: "Password must be at least 8 characters" });
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("password", { type: "manual", message: "Password must contain at least one uppercase letter" });
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("password", { type: "manual", message: "Password must contain at least one lowercase letter" });
      return;
    }
    if (!/\d/.test(password)) {
      setError("password", { type: "manual", message: "Password must contain at least one number" });
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("password", { type: "manual", message: "Password must contain at least one special character" });
      return;
    }

    try {
      // Create sign up with required fields
      const result = await signUp.create({
        emailAddress: email,
        password: password,
        username: username,
      });
      // Prepare email verification
      await signUp.prepareEmailAddressVerification();
      // Ask user for verification code
      const code = prompt('Enter the verification code sent to your email:');
      if (!code) {
        alert('Verification code is required.');
        setLoading(false);
        return;
      }
      // Attempt email verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === 'complete') {
        // Set active session - automatically signs in
        await clerk.setActive({ session: completeSignUp.createdSessionId });
        alert('User registered and signed in! Redirecting to home page ...');
        window.location.href = '/';
      } else {
        alert('Please complete the verification process.');
        console.log(completeSignUp.status)
      }
    } catch (err) {
      alert('An error occurred during sign-up.');
    } finally {
      setLoading(false);
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
                <form className={styles.registerForm} onSubmit={handleSubmit(handleSignUp)}>

                  <div className={styles.formSection}>
                    <label htmlFor="name">Name</label>
                    <div className={styles.inputContainer}>
                      <i className={`fa fa-user ${styles.icon}`}></i>
                      <input type="text" id="name" placeholder="Your name..." {...register("name", { required: "Name is required" })} value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    {errors.name && <span>{errors.name.message}</span>}
                  </div>

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

                  <div className={styles.formSection}>
                    <label htmlFor="confirmPassword"> Confirm Password</label>
                    <div className={styles.inputContainer}>
                      <i className={`fa-solid fa-lock ${styles.icon}`}></i>
                      <input type="password"  id="confirmPassword" placeholder="Confirm password..."  {...register("confirmPassword", { required: "Password is required" })} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>     
                    </div>
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                  </div>
                    <div id="clerk-captcha"></div>
                    <button className={styles.submitButton} type="submit">Submit</button>   
                </form>

                <div className={styles.actionSection}>
                  <p>Already have an account? <Link to="/login">Login</Link></p>
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


