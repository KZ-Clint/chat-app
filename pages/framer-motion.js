import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Framermotion.module.css'
import AddHomeIcon from '@mui/icons-material/AddHome'
import {motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { duration } from '@mui/material'


const containerVariants = {
    hidden: {
      opacity: 0,
      x: '100vw'
    },
    visible:{
      opacity:1,
      x:0,
      transition: {
         type: "spring",
         delay:2
      }
    },
}

const buttonVariants = {
 
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      repeat: Infinity,
      duration: 0.3
    }
  }
}

export default function Framer () {
  
   const [ move, setMove ] = useState(false)
   const [ show, setShow ] = useState(true)
  //  const router = useRouter()

  return (
    <>
        <motion.div className={styles.gendiv} variants={containerVariants} initial="hidden" animate="visible" >

        {/* <motion.div className={styles.gendiv} animate={{ opacity: 1, paddingTop:200}} initial={{opacity:0.2}} transition={{duration:1}} > */}

           {/* <motion.div className={styles.div2} animate={{ x: move ? 200 : -200 }} 
           transition={{type: "inertia", velocity:400 }}
           onClick={ ( ) => { setMove(!move) } } /> */}
         
         {/* <motion.div drag="x" dragConstraints={{left: 50}} className={styles.div2}  /> */}
         
         {/* <motion.div  animate={{ rotate: [0, 200, 200, 0], x:[0, 200, 200, 0]   }} transition={{ repeat:move? Infinity : 1 , duration:  1 }} className={styles.div2}
         /> */}

         {/* <motion.h2 className={styles.text} animate={{ scale: 1 }} initial={{ scale:0 }} transition={{ duration:1 }} >
           Comon Boys
         </motion.h2> */}

         {/* <motion.h2 className={styles.text} animate={{ scale:2, color: '#ff2994', x:[0, 200 , 0, -200], rotate: [0, 360, 0, -360] }} transition={{ duration: 1 }}  >
           Comon Boys
         </motion.h2> */}
         <AnimatePresence>
            {  show && 
            <motion.h2 className={styles.text} 
             exit={{ y: -1000 }} >
              Welcome to Pizza Joint
            </motion.h2> }
         </AnimatePresence>
         <motion.button className={styles.button} variants={buttonVariants} whileHover="hover" >
            Create Your Pizza
         </motion.button>
         <svg className={styles.pizzasvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" >
            <path 
             fill="none"
             d="M40 40 L80 C80 40 80 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
            />
            <path 
             fill="none"
             d="M50 30 L50 -10 C50 -10 C50 -10 90 -10 90 30 Z"
            />
         </svg>
         <motion.div className={styles.row1} initial={{x:'100vw'}} animate={{ x:0 }} transition={{ type:"spring", delay:0.5 }} >
            <svg className={styles.pizzasvg2}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10.92L19.26 9.33C21.9 7.08 19.25 2.88 16.08 4.31L15.21 4.68L15.1 3.72C15 2.64 14.44 1.87 13.7 1.42C12.06 0.467002 9.56 1.12 9.16 3.5L6.41 1.92C5.45 1.36 4.23 1.69 3.68 2.65L2.68 4.38C2.4 4.86 2.57 5.47 3.05 5.75L10.84 10.25L12.34 7.65L14.07 8.65L12.57 11.25L20.36 15.75C20.84 16 21.46 15.86 21.73 15.38L22.73 13.65C23.28 12.69 22.96 11.47 22 10.92ZM12.37 5C11.5 5.25 10.8 4.32 11.24 3.55C11.5 3.07 12.13 2.91 12.61 3.18C13.38 3.63 13.23 4.79 12.37 5ZM17.56 8C16.7 8.25 16 7.32 16.44 6.55C16.71 6.07 17.33 5.91 17.8 6.18C18.57 6.63 18.42 7.79 17.56 8ZM20.87 16.88C21.28 16.88 21.67 16.74 22 16.5V20C22 21.11 21.11 22 20 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V11H10.15L11 11.5V20H13V12.65L19.87 16.61C20.17 16.79 20.5 16.88 20.87 16.88Z" fill="#FF0303"/>
            </svg>
            {/* <motion.div className={styles.text} animate={{ y: 10 }} initial={{ y: -550 }} transition={{ delay: 2, duration:2, type:"spring", stiffness:120 }} >
              Pizza Joint
            </motion.div> */}

            <motion.div className={styles.text} whileHover={{ scale: 1.3, originX:0, color:"#f8e112" }}  >
              Pizza Joint
            </motion.div>
         </motion.div>


        </motion.div>    
    </>
  )
}