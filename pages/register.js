import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useRef, useContext } from 'react'
import styles from '../styles/Register.module.css'
import AddHomeIcon from '@mui/icons-material/AddHome'
import Topbar from '../components/Topbar'
import axios from 'axios'
import baseUrl from '../components/base/baseUrl'
import {useRouter} from 'next/router'

export default function Register () {
 
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const router = useRouter()

  const handleClick = async (e) => {
    e.preventDefault()
    if(confirmPassword.current.value !== password.current.value ){
       password.current.setCustomValidity("Passwords do not match")
    } else {
       const user = {
         username: username.current.value,         
         email: email.current.value,         
         password: password.current.value, 
         termsAndConditions: true        
       }
       try{
        await axios.post(`${baseUrl}/api/auth/register`, user )
        router.push("/login")
       } catch (err){
         console.log(err)
       }
      
    }
  }

  return (
    <>
      <Head>
        <title> Register </title>
      </Head>
        <div className={styles.login} >
          <div className={styles.loginwrapper} >
             <div className={styles.loginleft} > 
                <h3 className={styles.loginlogo} > Facesocial </h3>
                <span className={styles.logindesc} > Connect with friends and with the world around you on Clintsocial  </span>
              </div>
             <div className={styles.loginright} > 
                 <form className={styles.loginbox} onSubmit={handleClick} >
                     <input placeholder='Username' className={styles.logininput} ref={username} required /> 
                     <input placeholder='Email' className={styles.logininput} ref={email} required type="email" />
                     <input placeholder='Password' className={styles.logininput} ref={password} required type="password" /> 
                     <input placeholder='Confirm Password' className={styles.logininput} ref={confirmPassword} required type="password" />
                     <button className={styles.loginbutton} type="submit" > Sign Up </button>
                     <button className={styles.loginregisterbutton} >
                       log into your account
                     </button>
                 </form>
             </div>
          </div>
        </div>    

    </>
  )
}

Register.getLayout = function PageLayout(page) {
    return (
      <>
     
       {page}
      </>
    )
 }

 export async function getServerSideProps ({req,res}) {
  let tokenReq= {}
  if(req.cookies.token){
      tokenReq=JSON.parse(req.cookies.token)
      return {
        redirect:{
          permanent:false,
          destination: "/"
        }
      }  
  }

  return {
      props: {
        token: tokenReq 
      }
  }
}