import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import AddHomeIcon from '@mui/icons-material/AddHome'
import Topbar from '../components/Topbar'
import { useState, useEffect, useRef, useContext } from 'react'
import { loginCall } from '../components/hooks/apiCalls'
import { AuthContext } from '../components/context/Authcontext'
import { CircularProgress } from '@mui/material'
import {useRouter} from 'next/router'

export default function Login () {

  const { user,isFetching, error, dispatch} = useContext(AuthContext)
  const router = useRouter()

  const email = useRef()
  const password = useRef()

  const handleClick = (e) => {
     e.preventDefault()
     loginCall({email:email.current.value, password:password.current.value }, dispatch, router )
     
  }


  return (
    <>
      <Head>
        <title> Login </title>
      </Head>
        <div className={styles.login} >
          <div className={styles.loginwrapper} >
             <div className={styles.loginleft} > 
                <h3 className={styles.loginlogo} > Facesocial </h3>
                <span className={styles.logindesc} > Connect with friends and with the world around you on Clintsocial  </span>
              </div>
             <div className={styles.loginright} > 
                 <form className={styles.loginbox} onSubmit={handleClick} >
                     <input placeholder='Email' type="email" className={styles.logininput} ref={email} required /> 
                     <input placeholder='Password' type="password" className={styles.logininput} ref={password} required />
                     <button className={styles.loginbutton} disabled={isFetching} > { isFetching ? <CircularProgress color="inherit"/> : "Log In" }  </button>
                     <span className={styles.loginforgot} > Forgot Password </span>
                     <button className={styles.loginregisterbutton} onClick={ () => { router.push("/register") } } >
                        Create a New Account
                     </button>
                 </form>
             </div>
          </div>
        </div>    

    </>
  )
}

Login.getLayout = function PageLayout(page) {
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
          destination:"/"
        }
      }  
  }

  return {
      props: {
        token: tokenReq 
      }
  }
}